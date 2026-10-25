import { appConfig } from '@shared/config';
import type { ApiResponse } from '@shared/api';

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '/api';

export class ApiClientError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly errors?: string[],
    public readonly code?: string,
  ) {
    super(message);
    this.name = 'ApiClientError';
  }
}

export const getStoredToken = (): string | null =>
  localStorage.getItem(appConfig.storageKeys.token);

const notifyAuthExpired = (): void => {
  window.dispatchEvent(new Event('hadramout:auth-expired'));
};

export const request = async <T>(
  path: string,
  options: RequestInit = {},
): Promise<T> => {
  // جلب التوكن بالطريقة الموحدة للمشروع
  const token = getStoredToken();

  const headers = new Headers(options.headers);

  if (options.body && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }
  
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers,
    });
  } catch {
    throw new ApiClientError(0, 'تعذر الاتصال بالخادم، تحقق من الشبكة');
  }

  const text = await response.text();
  let payload: unknown;
  try {
    payload = text ? JSON.parse(text) : null;
  } catch {
    throw new ApiClientError(response.status, 'استجابة غير صالحة من الخادم');
  }

  const body = payload as ApiResponse<T> | null;

  if (!response.ok || !body || body.success === false) {
    const code = body && body.success === false ? body.code : undefined;
    const isAuthAttempt =
      path === '/auth/login' || path === '/auth/register';

    if (
      response.status === 401 &&
      token &&
      !isAuthAttempt &&
      getStoredToken() === token
    ) {
      localStorage.removeItem(appConfig.storageKeys.token);
      localStorage.removeItem(appConfig.storageKeys.user);
      notifyAuthExpired();
    }

    const message =
      body && body.success === false
        ? body.message
        : response.status === 401
          ? 'يجب تسجيل الدخول للمتابعة'
          : 'تعذر إتمام الطلب، حاول مرة أخرى';
          
    const errors =
      body && body.success === false && body.errors ? body.errors : undefined;
      
    throw new ApiClientError(response.status, message, errors, code);
  }

  return body.data;
};