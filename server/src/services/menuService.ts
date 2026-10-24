import type { MenuItemDto, MenuItemInput } from '../../../shared/api';
import {
  menuRepository,
  toMenuItemDto,
  type MenuFilters,
} from '../repositories/menuRepository';
import { ApiError } from '../utils/ApiError';

const normalizeInput = (input: MenuItemInput): MenuItemInput => ({
  name: input.name,
  nameEn: input.nameEn?.trim() || undefined,
  description: input.description?.trim() || undefined,
  descriptionEn: input.descriptionEn?.trim() || undefined,
  price: Number(input.price),
  category: input.category,
  imageUrl: input.imageUrl?.trim() || undefined,
  isAvailable: input.isAvailable ?? true,
});

export const menuService = {
  async list(filters: MenuFilters): Promise<MenuItemDto[]> {
    const items = await menuRepository.list(filters);
    return items.map(toMenuItemDto);
  },

  async getById(id: number): Promise<MenuItemDto> {
    const item = await menuRepository.findById(id);
    if (!item) throw ApiError.notFound('الطبق غير موجود');
    return toMenuItemDto(item);
  },

  async create(input: MenuItemInput): Promise<MenuItemDto> {
    const id = await menuRepository.create(normalizeInput(input));
    const item = await menuRepository.findById(id);
    if (!item) throw new ApiError(500, 'تعذر إنشاء الطبق');
    return toMenuItemDto(item);
  },

  async update(id: number, input: MenuItemInput): Promise<MenuItemDto> {
    const existing = await menuRepository.findById(id);
    if (!existing) throw ApiError.notFound('الطبق غير موجود');

    const normalized = normalizeInput({
      ...input,
      isAvailable: input.isAvailable ?? existing.isAvailable,
    });

    const updated = await menuRepository.update(id, normalized);
    if (!updated) throw ApiError.notFound('الطبق غير موجود');

    const item = await menuRepository.findById(id);
    if (!item) throw new ApiError(500, 'تعذر تحديث الطبق');
    return toMenuItemDto(item);
  },

  async delete(id: number): Promise<void> {
    const existing = await menuRepository.findById(id);
    if (!existing) throw ApiError.notFound('الطبق غير موجود');
    await menuRepository.delete(id);
  },
};
