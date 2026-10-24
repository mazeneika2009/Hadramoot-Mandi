import type { MenuFilters, MenuItemDto, MenuItemInput } from '@shared/api';
import { request } from './client';

const buildQuery = (filters: MenuFilters): string => {
  const params = new URLSearchParams();
  if (filters.category) params.set('category', filters.category);
  if (filters.search) params.set('search', filters.search);
  if (typeof filters.available === 'boolean') {
    params.set('available', filters.available ? 'true' : 'false');
  }
  const query = params.toString();
  return query ? `?${query}` : '';
};

export const menuApi = {
  async list(filters: MenuFilters = {}): Promise<MenuItemDto[]> {
    const data = await request<{ items: MenuItemDto[] }>(
      `/menu${buildQuery(filters)}`,
    );
    return data.items;
  },

  async listAllForAdmin(): Promise<MenuItemDto[]> {
    const data = await request<{ items: MenuItemDto[] }>(
      '/menu?available=all',
    );
    return data.items;
  },

  async create(input: MenuItemInput): Promise<MenuItemDto> {
    const data = await request<{ item: MenuItemDto }>('/menu', {
      method: 'POST',
      body: JSON.stringify(input),
    });
    return data.item;
  },

  async update(id: number, input: MenuItemInput): Promise<MenuItemDto> {
    const data = await request<{ item: MenuItemDto }>(`/menu/${id}`, {
      method: 'PUT',
      body: JSON.stringify(input),
    });
    return data.item;
  },

  delete(id: number): Promise<{ id: number }> {
    return request<{ id: number }>(`/menu/${id}`, { method: 'DELETE' });
  },
};
