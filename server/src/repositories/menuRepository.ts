import type { RowDataPacket } from 'mysql2/promise';
import type { MenuItemDto, MenuItemInput } from '../../../shared/api';
import { pool } from '../db/pool';
import { executeStatement, queryRows, type DbClient } from '../db/query';
import type { MenuItemRecord } from '../types/domain';
import { escapeLike } from '../utils/request';
import { toIsoString, toNumber } from '../utils/sanitize';

interface MenuRow extends RowDataPacket {
  id: number;
  name: string;
  name_en: string | null;
  description: string | null;
  description_en: string | null;
  price: string | number;
  category: string;
  image_url: string | null;
  is_available: number | boolean;
  created_at: Date | string;
  updated_at: Date | string;
}

const mapMenuItem = (row: MenuRow): MenuItemRecord => ({
  id: Number(row.id),
  name: row.name,
  nameEn: row.name_en,
  description: row.description,
  descriptionEn: row.description_en,
  price: toNumber(row.price),
  category: row.category,
  imageUrl: row.image_url,
  isAvailable: Boolean(row.is_available),
  createdAt: toIsoString(row.created_at),
  updatedAt: toIsoString(row.updated_at),
});

export const toMenuItemDto = (item: MenuItemRecord): MenuItemDto => ({
  id: item.id,
  name: item.name,
  nameEn: item.nameEn,
  description: item.description,
  descriptionEn: item.descriptionEn,
  price: item.price,
  category: item.category,
  imageUrl: item.imageUrl,
  isAvailable: item.isAvailable,
  createdAt: item.createdAt,
  updatedAt: item.updatedAt,
});

const selectColumns = `id, name, name_en, description, description_en, price,
  category, image_url, is_available, created_at, updated_at`;

export interface MenuFilters {
  category?: string;
  search?: string;
  available?: boolean;
}

export const menuRepository = {
  async list(filters: MenuFilters, client: DbClient = pool): Promise<MenuItemRecord[]> {
    const conditions: string[] = [];
    const params: unknown[] = [];

    if (filters.category) {
      conditions.push('category = ?');
      params.push(filters.category);
    }

    if (filters.search) {
      const pattern = `%${escapeLike(filters.search)}%`;
      conditions.push(
        '(name LIKE ? ESCAPE \'\\\\\' OR name_en LIKE ? ESCAPE \'\\\\\' OR description LIKE ? ESCAPE \'\\\\\')',
      );
      params.push(pattern, pattern, pattern);
    }

    if (typeof filters.available === 'boolean') {
      conditions.push('is_available = ?');
      params.push(filters.available ? 1 : 0);
    }

    const where = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    const rows = await queryRows<MenuRow>(
      client,
      `SELECT ${selectColumns} FROM menu_items ${where}
       ORDER BY FIELD(category, 'mandi', 'madhbi', 'mathloutha', 'appetizers', 'drinks', 'desserts'), id`,
      params,
    );
    return rows.map(mapMenuItem);
  },

  async findById(id: number, client: DbClient = pool): Promise<MenuItemRecord | null> {
    const rows = await queryRows<MenuRow>(
      client,
      `SELECT ${selectColumns} FROM menu_items WHERE id = ? LIMIT 1`,
      [id],
    );
    return rows[0] ? mapMenuItem(rows[0]) : null;
  },

  async findByIds(ids: readonly number[], client: DbClient = pool): Promise<MenuItemRecord[]> {
    if (ids.length === 0) return [];
    const placeholders = ids.map(() => '?').join(', ');
    const rows = await queryRows<MenuRow>(
      client,
      `SELECT ${selectColumns} FROM menu_items WHERE id IN (${placeholders})`,
      ids,
    );
    return rows.map(mapMenuItem);
  },

  async create(data: MenuItemInput, client: DbClient = pool): Promise<number> {
    const result = await executeStatement(
      client,
      `INSERT INTO menu_items
         (name, name_en, description, description_en, price, category, image_url, is_available)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.name,
        data.nameEn ?? null,
        data.description ?? null,
        data.descriptionEn ?? null,
        data.price,
        data.category,
        data.imageUrl ?? null,
        data.isAvailable ?? true,
      ],
    );
    return Number(result.insertId);
  },

  async update(
    id: number,
    data: MenuItemInput,
    client: DbClient = pool,
  ): Promise<boolean> {
    const result = await executeStatement(
      client,
      `UPDATE menu_items
       SET name = ?, name_en = ?, description = ?, description_en = ?,
           price = ?, category = ?, image_url = ?, is_available = ?
       WHERE id = ?`,
      [
        data.name,
        data.nameEn ?? null,
        data.description ?? null,
        data.descriptionEn ?? null,
        data.price,
        data.category,
        data.imageUrl ?? null,
        data.isAvailable ?? true,
        id,
      ],
    );
    return result.affectedRows > 0;
  },

  async delete(id: number, client: DbClient = pool): Promise<boolean> {
    const result = await executeStatement(
      client,
      'DELETE FROM menu_items WHERE id = ?',
      [id],
    );
    return result.affectedRows > 0;
  },

  async count(client: DbClient = pool): Promise<number> {
    const rows = await queryRows<RowDataPacket & { total: number }>(
      client,
      'SELECT COUNT(*) AS total FROM menu_items',
    );
    return Number(rows[0]?.total ?? 0);
  },
};
