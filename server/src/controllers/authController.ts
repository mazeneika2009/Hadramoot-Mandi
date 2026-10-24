import type { Request, Response } from 'express';
import { authService, type LoginInput, type RegisterInput } from '../services/authService';
import { requireAuthUser } from '../utils/request';

export const authController = {
  async register(req: Request, res: Response): Promise<void> {
    const body = req.body as RegisterInput;
    const result = await authService.register(body);
    res.status(201).json({
      success: true,
      message: 'تم إنشاء الحساب بنجاح',
      data: result,
    });
  },

  async login(req: Request, res: Response): Promise<void> {
    const body = req.body as LoginInput;
    const result = await authService.login(body);
    res.json({
      success: true,
      message: 'تم تسجيل الدخول بنجاح',
      data: result,
    });
  },

  async me(req: Request, res: Response): Promise<void> {
    const user = requireAuthUser(req);
    const profile = await authService.getProfile(user.id);
    res.json({ success: true, data: { user: profile } });
  },
};
