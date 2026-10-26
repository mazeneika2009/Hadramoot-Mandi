import type { UserDto } from '../../../shared/api';
import { supabase } from '../db/client';
import { assertNoError, unwrap } from '../db/query';
import type { Role, UserRecord } from '../types/domain';
import { toIsoString } from '../utils/sanitize';

interface UserRow {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  phone: string | null;
  role: Role;
  created_at: string;
  is_approved: boolean;
}

const mapUser = (row: UserRow): UserRecord => ({
  id: Number(row.id),
  name: row.name,
  email: row.email,
  passwordHash: row.password_hash,
  phone: row.phone,
  role: row.role,
  createdAt: toIsoString(row.created_at),
  isApproved: Boolean(row.is_approved),
});

export const toUserDto = (user: UserRecord): UserDto => ({
  id: user.id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  role: user.role,
  createdAt: user.createdAt,
  isApproved: user.isApproved,
});

const selectColumns =
  'id, name, email, password_hash, phone, role, created_at, is_approved';

export const userRepository = {
  async findByEmail(email: string): Promise<UserRecord | null> {
    const result = await supabase
      .from('users')
      .select(selectColumns)
      .eq('email', email.toLowerCase())
      .maybeSingle();

    const row = unwrap(result, 'find user by email') as UserRow | null;
    return row ? mapUser(row) : null;
  },

  async findById(id: number): Promise<UserRecord | null> {
    const result = await supabase
      .from('users')
      .select(selectColumns)
      .eq('id', id)
      .maybeSingle();

    const row = unwrap(result, 'find user by id') as UserRow | null;
    return row ? mapUser(row) : null;
  },

  async listApprovedByRole(role: Role): Promise<UserRecord[]> {
    const result = await supabase
      .from('users')
      .select(selectColumns)
      .eq('role', role)
      .eq('is_approved', true)
      .order('name', { ascending: true })
      .order('id', { ascending: true });

    const rows = unwrap(result, 'list approved users') as UserRow[] | null;
    return (rows ?? []).map(mapUser);
  },

  async isApproved(id: number): Promise<boolean> {
    const result = await supabase
      .from('users')
      .select('is_approved')
      .eq('id', id)
      .maybeSingle();

    const row = unwrap(result, 'check user approval') as {
      is_approved: boolean;
    } | null;
    return Boolean(row?.is_approved ?? false);
  },

  async updateApproval(id: number, approved: boolean): Promise<void> {
    const { error } = await supabase
      .from('users')
      .update({ is_approved: approved })
      .eq('id', id);

    assertNoError(error, 'update user approval');
  },

  async create(data: {
    name: string;
    email: string;
    passwordHash: string;
    phone: string | null;
    role: Role;
    isApproved?: boolean;
  }): Promise<number> {
    // Customers and administrators are usable immediately; staff accounts are
    // created pending administrator approval unless explicitly approved.
    const isApproved =
      data.isApproved ??
      (data.role === 'customer' || data.role === 'admin');

    const result = await supabase
      .from('users')
      .insert({
        name: data.name,
        email: data.email.toLowerCase(),
        password_hash: data.passwordHash,
        phone: data.phone,
        role: data.role,
        is_approved: isApproved,
      })
      .select('id')
      .single();

    const row = unwrap(result, 'create user') as { id: number };
    return Number(row.id);
  },
};
