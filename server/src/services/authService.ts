import bcrypt from 'bcryptjs';
import type { AuthResponse } from '../../../shared/api';
import { env } from '../config/env';
import { userRepository, toUserDto } from '../repositories/userRepository';
import type { UserRecord } from '../types/domain';
import { ApiError } from '../utils/ApiError';
import { signToken } from '../utils/jwt';

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

const buildAuthResponse = (user: UserRecord): AuthResponse => ({
  token: signToken({ id: user.id, email: user.email, role: user.role }),
  user: toUserDto(user),
});

export const authService = {
  async register(input: RegisterInput): Promise<AuthResponse> {
    const existing = await userRepository.findByEmail(input.email);
    if (existing) {
      throw ApiError.conflict('هذا البريد الإلكتروني مسجل بالفعل');
    }

    const passwordHash = await bcrypt.hash(input.password, env.bcryptRounds);
    const userId = await userRepository.create({
      name: input.name,
      email: input.email,
      passwordHash,
      phone: input.phone?.trim() || null,
      role: 'customer',
    });

    const user = await userRepository.findById(userId);
    if (!user) throw new ApiError(500, 'تعذر إنشاء الحساب');
    return buildAuthResponse(user);
  },

  async login(input: LoginInput): Promise<AuthResponse> {
    const user = await userRepository.findByEmail(input.email);
    if (!user) {
      throw ApiError.unauthorized('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }

    const valid = await bcrypt.compare(input.password, user.passwordHash);
    if (!valid) {
      throw ApiError.unauthorized('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }

    return buildAuthResponse(user);
  },

  async getProfile(userId: number): Promise<AuthResponse['user']> {
    const user = await userRepository.findById(userId);
    if (!user) throw ApiError.unauthorized('الحساب غير موجود');
    return toUserDto(user);
  },
};
