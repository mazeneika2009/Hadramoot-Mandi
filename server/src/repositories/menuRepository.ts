import type { MenuItemDto, MenuItemInput } from '../../../shared/api';
import { supabase } from '../db/client';
import { assertNoError, unwrap } from '../db/query';
import type { MenuItemRecord } from '../types/domain';
import { toPostgrestIlikePattern } from '../utils/request';
import { toIsoString, toNumber } from '../utils/sanitize';

interface MenuRow {
  id: number;
  name: string;
  name_en: string | null;
  description: string | null;
  description_en: string | null;
  price: string | number;
  category: string;
  image_url: string | null;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

const categoryOrder = [
  'mandi',
  'madhbi',
  'mathloutha',
  'appetizers',
  'drinks',
  'desserts',
] as const;

const categoryRank = new Map<string, number>(
  categoryOrder.map((category, index) => [category, index]),
);

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
  async list(filters: MenuFilters): Promise<MenuItemRecord[]> {
    let query = supabase.from('menu_items').select(selectColumns);

    if (filters.category) {
      query = query.eq('category', filters.category);
    }

    if (filters.search) {
      const pattern = toPostgrestIlikePattern(filters.search);
      if (pattern) {
        query = query.or(
          [
            `name.ilike.${pattern}`,
            `name_en.ilike.${pattern}`,
            `description.ilike.${pattern}`,
          ].join(','),
        );
      }
    }

    if (typeof filters.available === 'boolean') {
      query = query.eq('is_available', filters.available);
    }

    const result = await query
      .order('category', { ascending: true })
      .order('id', { ascending: true });

    const rows = unwrap(result, 'list menu items') as MenuRow[] | null;

    return (rows ?? [])
      .map(mapMenuItem)
      .sort((left, right) => {
        const leftRank =
          categoryRank.get(left.category) ?? categoryOrder.length;
        const rightRank =
          categoryRank.get(right.category) ?? categoryOrder.length;
        return leftRank - rightRank || left.id - right.id;
      });
  },

  async findById(id: number): Promise<MenuItemRecord | null> {
    const result = await supabase
      .from('menu_items')
      .select(selectColumns)
      .eq('id', id)
      .maybeSingle();

    const row = unwrap(result, 'find menu item') as MenuRow | null;
    return row ? mapMenuItem(row) : null;
  },

  async findByIds(ids: readonly number[]): Promise<MenuItemRecord[]> {
    if (ids.length === 0) return [];

    const result = await supabase
      .from('menu_items')
      .select(selectColumns)
      .in('id', [...ids]);

    const rows = unwrap(result, 'find menu items by ids') as MenuRow[] | null;
    return (rows ?? []).map(mapMenuItem);
  },

  async create(data: MenuItemInput): Promise<number> {
    const result = await supabase
      .from('menu_items')
      .insert({
        name: data.name,
        name_en: data.nameEn ?? null,
        description: data.description ?? null,
        description_en: data.descriptionEn ?? null,
        price: data.price,
        category: data.category,
        image_url: data.imageUrl ?? null,
        is_available: data.isAvailable ?? true,
      })
      .select('id')
      .single();

    const row = unwrap(result, 'create menu item') as { id: number };
    return Number(row.id);
  },

  async update(id: number, data: MenuItemInput): Promise<boolean> {
    const result = await supabase
      .from('menu_items')
      .update({
        name: data.name,
        name_en: data.nameEn ?? null,
        description: data.description ?? null,
        description_en: data.descriptionEn ?? null,
        price: data.price,
        category: data.category,
        image_url: data.imageUrl ?? null,
        is_available: data.isAvailable ?? true,
      })
      .eq('id', id)
      .select('id');

    const rows = unwrap(result, 'update menu item') as { id: number }[] | null;
    return (rows?.length ?? 0) > 0;
  },

  async delete(id: number): Promise<boolean> {
    const result = await supabase
      .from('menu_items')
      .delete()
      .eq('id', id)
      .select('id');

    const rows = unwrap(result, 'delete menu item') as { id: number }[] | null;
    return (rows?.length ?? 0) > 0;
  },

  async count(): Promise<number> {
    const { count, error } = await supabase
      .from('menu_items')
      .select('id', { count: 'exact', head: true });

    assertNoError(error, 'count menu items');
    return count ?? 0;
  },
};
