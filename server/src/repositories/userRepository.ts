import type { RowDataPacket } from 'mysql2/promise';
import type { UserDto } from '../../../shared/api';
import { pool } from '../db/pool';
import { executeStatement, queryRows, type DbClient } from '../db/query';
import type { Role, UserRecord } from '../types/domain';
import { toIsoString } from '../utils/sanitize';

interface UserRow extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  phone: string | null;
  role: Role;
  created_at: Date | string;
}

const mapUser = (row: UserRow): UserRecord => ({
  id: Number(row.id),
  name: row.name,
  email: row.email,
  passwordHash: row.password_hash,
  phone: row.phone,
  role: row.role,
  createdAt: toIsoString(row.created_at),
});

export const toUserDto = (user: UserRecord): UserDto => ({
  id: user.id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  role: user.role,
  createdAt: user.createdAt,
});

const selectColumns =
  'id, name, email, password_hash, phone, role, created_at';

export const userRepository = {
  async findByEmail(email: string, client: DbClient = pool): Promise<UserRecord | null> {
    const rows = await queryRows<UserRow>(
      client,
      `SELECT ${selectColumns} FROM users WHERE email = ? LIMIT 1`,
      [email.toLowerCase()],
    );
    return rows[0] ? mapUser(rows[0]) : null;
  },

  async findById(id: number, client: DbClient = pool): Promise<UserRecord | null> {
    const rows = await queryRows<UserRow>(
      client,
      `SELECT ${selectColumns} FROM users WHERE id = ? LIMIT 1`,
      [id],
    );
    return rows[0] ? mapUser(rows[0]) : null;
  },

  async create(
    data: {
      name: string;
      email: string;
      passwordHash: string;
      phone: string | null;
      role: Role;
    },
    client: DbClient = pool,
  ): Promise<number> {
    const result = await executeStatement(
      client,
      `INSERT INTO users (name, email, password_hash, phone, role)
       VALUES (?, ?, ?, ?, ?)`,
      [
        data.name,
        data.email.toLowerCase(),
        data.passwordHash,
        data.phone,
        data.role,
      ],
    );
    return Number(result.insertId);
  },
};
