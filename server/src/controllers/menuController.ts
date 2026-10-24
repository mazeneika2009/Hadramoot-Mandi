import type { Request, Response } from 'express';
import type { MenuItemInput } from '../../../shared/api';
import { menuService } from '../services/menuService';
import { parseId } from '../utils/request';

export const menuController = {
  async list(req: Request, res: Response): Promise<void> {
    const category =
      typeof req.query.category === 'string' ? req.query.category : undefined;
    const search =
      typeof req.query.search === 'string' ? req.query.search : undefined;
    const availableQuery =
      typeof req.query.available === 'string' ? req.query.available : undefined;

    let available: boolean | undefined = true;
    if (availableQuery === 'all') {
      available = req.user?.role === 'admin' ? undefined : true;
    } else if (availableQuery === 'false') {
      available = req.user?.role === 'admin' ? false : true;
    }

    const items = await menuService.list({ category, search, available });
    res.json({ success: true, data: { items } });
  },

  async getById(req: Request, res: Response): Promise<void> {
    const id = parseId(String(req.params.id), 'معرّف الطبق');
    const item = await menuService.getById(id);
    res.json({ success: true, data: { item } });
  },

  async create(req: Request, res: Response): Promise<void> {
    const item = await menuService.create(req.body as MenuItemInput);
    res.status(201).json({
      success: true,
      message: 'تم إضافة الطبق بنجاح',
      data: { item },
    });
  },

  async update(req: Request, res: Response): Promise<void> {
    const id = parseId(String(req.params.id), 'معرّف الطبق');
    const item = await menuService.update(id, req.body as MenuItemInput);
    res.json({
      success: true,
      message: 'تم تحديث الطبق بنجاح',
      data: { item },
    });
  },

  async remove(req: Request, res: Response): Promise<void> {
    const id = parseId(String(req.params.id), 'معرّف الطبق');
    await menuService.delete(id);
    res.json({ success: true, message: 'تم حذف الطبق بنجاح', data: { id } });
  },
};
