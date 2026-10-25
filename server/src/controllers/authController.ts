import type { Request, Response } from 'express';
import { authService, type LoginInput, type RegisterInput } from '../services/authService';
import bcrypt from 'bcryptjs';
import { env } from '../config/env';
import { requireAuthUser } from '../utils/request';
import { userRepository } from '../repositories/userRepository';
import { ApiError } from '../utils/ApiError';

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

  async approveUser(req: Request, res: Response): Promise<void> {
    const targetId = Number(req.params.id);
    const myUser = requireAuthUser(req);
    if (myUser.role !== 'admin') {
      res.status(403).json({
        success: false,
        message: 'غير مصرح لك بالوصول',
      });
      return;
    }
    const currentlyApproved = await userRepository.isApproved(targetId);
    await userRepository.updateApproval(targetId, !currentlyApproved);
    const updatedUser = await userRepository.findById(targetId);
    res.json({
      success: true,
      message: updatedUser?.isApproved ? 'تم اعتماد المستخدم' : 'تم رفض المستخدم',
      data: { isApproved: updatedUser?.isApproved ?? false },
    });
  },

  async createStaff(req: Request, res: Response): Promise<void> {
    const { email, password, role } = req.body as { email: string; password: string; role: 'kitchen' | 'cashier' };
    const myUser = requireAuthUser(req);
    if (myUser.role !== 'admin') {
      res.status(403).json({
        success: false,
        message: 'غير مصرح لك بالوصول',
      });
      return;
    }
    const existing = await userRepository.findByEmail(email);
    if (existing) {
      res.status(400).json({
        success: false,
        message: 'هذا البريد الإلكتروني مسجل بالفعل',
      });
      return;
    }
    const passwordHash = await bcrypt.hash(password, env.bcryptRounds);
    const userId = await userRepository.create({
      name: email.split('@')[0] ?? 'موظف',
      email: email.toLowerCase(),
      passwordHash,
      phone: null,
      role,
    });
    const user = await userRepository.findById(userId);
    if (!user) {
      throw ApiError.notFound('تعذر إنشاء حساب الموظف');
    }
    res.json({
      success: true,
      message: 'تم إنشاء حساب الموظف بانتظار الموافقة',
      data: { id: user.id, email: user.email, role: user.role, isApproved: user.isApproved },
    });
  },
};
