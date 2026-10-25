import type { PoolConnection, RowDataPacket } from 'mysql2/promise';
import { pool } from './pool';
import { queryRows } from './query';

const statements: readonly string[] = [
  `CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NULL,
    role ENUM('customer', 'admin', 'kitchen', 'cashier') NOT NULL DEFAULT 'customer',
    is_approved BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uq_users_email (email)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS menu_items (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    name_en VARCHAR(255) NULL,
    description TEXT NULL,
    description_en TEXT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    image_url VARCHAR(500) NULL,
    is_available BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_menu_category (category),
    KEY idx_menu_available (is_available)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS orders (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    delivery_address TEXT NOT NULL,
    payment_status ENUM('PENDING', 'PAID', 'FAILED', 'REFUNDED') NOT NULL DEFAULT 'PENDING',
    order_status ENUM('PENDING', 'PREPARING', 'READY', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    payment_id VARCHAR(100) NULL,
    payment_url VARCHAR(1000) NULL,
    payment_method ENUM('ONLINE','CASH') NOT NULL DEFAULT 'ONLINE',
    notes TEXT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_orders_user (user_id),
    KEY idx_orders_payment_status (payment_status),
    KEY idx_orders_status (order_status),
    KEY idx_orders_payment_id (payment_id),
    KEY idx_orders_created (created_at),
    CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS order_items (
    id INT NOT NULL AUTO_INCREMENT,
    order_id INT NOT NULL,
    menu_item_id INT NOT NULL,
    quantity INT NOT NULL DEFAULT 1,
    price_at_purchase DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_order_items_order (order_id),
    KEY idx_order_items_menu (menu_item_id),
    CONSTRAINT fk_order_items_order FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE CASCADE,
    CONSTRAINT fk_order_items_menu FOREIGN KEY (menu_item_id) REFERENCES menu_items (id) ON DELETE RESTRICT
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
  `CREATE TABLE IF NOT EXISTS reservations (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NULL,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    guests INT NOT NULL DEFAULT 1,
    status ENUM('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED') NOT NULL DEFAULT 'PENDING',
    notes TEXT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_reservations_date (date),
    KEY idx_reservations_status (status),
    KEY idx_reservations_user (user_id),
    CONSTRAINT fk_reservations_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci`,
];

/**
 * Columns that were added after the initial release. MySQL does not support
 * `ADD COLUMN IF NOT EXISTS` (that is MariaDB-only), so each column is checked
 * against information_schema before the ALTER runs. This keeps startup
 * idempotent on both MySQL and MariaDB.
 */
const columnMigrations: ReadonlyArray<{
  table: string;
  column: string;
  definition: string;
  after?: string;
}> = [
  {
    table: 'users',
    column: 'is_approved',
    definition: 'BOOLEAN NOT NULL DEFAULT FALSE',
    after: 'role',
  },
  {
    table: 'orders',
    column: 'payment_method',
    definition: "ENUM('ONLINE','CASH') NOT NULL DEFAULT 'ONLINE'",
    after: 'payment_url',
  },
];

interface ColumnRow extends RowDataPacket {
  COLUMN_NAME: string;
}

const columnExists = async (
  connection: PoolConnection,
  table: string,
  column: string,
): Promise<boolean> => {
  const rows = await queryRows<ColumnRow>(
    connection,
    `SELECT COLUMN_NAME
       FROM information_schema.COLUMNS
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = ?
        AND COLUMN_NAME = ?
      LIMIT 1`,
    [table, column],
  );
  return rows.length > 0;
};

const runSchemaStatement = async (
  connection: PoolConnection,
  sql: string,
): Promise<boolean> => {
  try {
    await connection.query(sql);
    return true;
  } catch (err) {
    console.warn('Schema init note:', (err as Error).message);
    return false;
  }
};

export const initializeSchema = async (): Promise<void> => {
  const connection = await pool.getConnection();
  try {
    for (const statement of statements) {
      await runSchemaStatement(connection, statement);
    }

    for (const migration of columnMigrations) {
      if (await columnExists(connection, migration.table, migration.column)) {
        continue;
      }
      const after = migration.after ? ` AFTER \`${migration.after}\`` : '';
      const added = await runSchemaStatement(
        connection,
        `ALTER TABLE \`${migration.table}\` ADD COLUMN \`${migration.column}\` ${migration.definition}${after}`,
      );
      if (added) {
        console.info(
          `Schema init: added column ${migration.table}.${migration.column}`,
        );
      }
    }

    // Keep enums in sync for databases created before staff roles and the
    // READY kitchen status existed.
    await runSchemaStatement(
      connection,
      `ALTER TABLE users MODIFY COLUMN role ENUM('admin','kitchen','cashier','customer') NOT NULL DEFAULT 'customer'`,
    );
    await runSchemaStatement(
      connection,
      `ALTER TABLE orders MODIFY COLUMN order_status ENUM('PENDING','PREPARING','READY','OUT_FOR_DELIVERY','DELIVERED','CANCELLED') NOT NULL DEFAULT 'PENDING'`,
    );
    // Approval only applies to staff; normalise legacy rows so existing
    // customers and administrators are not locked out.
    await runSchemaStatement(
      connection,
      `UPDATE users SET is_approved = TRUE WHERE role IN ('admin','customer') AND is_approved = FALSE`,
    );
  } finally {
    connection.release();
  }
};
