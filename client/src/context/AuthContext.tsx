import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { appConfig } from '@shared/config';
import type { AuthResponse, UserDto } from '@shared/api';
import { authApi, type LoginPayload, type RegisterPayload } from '../api/auth';
import { ApiClientError } from '../api/client';

interface AuthContextValue {
  user: UserDto | null;
  token: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (payload: LoginPayload) => Promise<UserDto>;
  register: (payload: RegisterPayload) => Promise<UserDto>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const readStoredUser = (): UserDto | null => {
  const raw = localStorage.getItem(appConfig.storageKeys.user);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<UserDto>;
    if (
      typeof parsed.id !== 'number' ||
      typeof parsed.name !== 'string' ||
      typeof parsed.email !== 'string' ||
      (parsed.role !== 'customer' && parsed.role !== 'admin')
    ) {
      return null;
    }
    return parsed as UserDto;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(appConfig.storageKeys.token),
  );
  const [user, setUser] = useState<UserDto | null>(() => readStoredUser());
  const [loading, setLoading] = useState<boolean>(() =>
    Boolean(localStorage.getItem(appConfig.storageKeys.token)),
  );

  const clearSession = useCallback(() => {
    localStorage.removeItem(appConfig.storageKeys.token);
    localStorage.removeItem(appConfig.storageKeys.user);
    setToken(null);
    setUser(null);
    setLoading(false);
  }, []);

  const persistSession = useCallback((response: AuthResponse) => {
    localStorage.setItem(appConfig.storageKeys.token, response.token);
    localStorage.setItem(
      appConfig.storageKeys.user,
      JSON.stringify(response.user),
    );
    setToken(response.token);
    setUser(response.user);
    setLoading(false);
  }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem(appConfig.storageKeys.token);
    if (!storedToken) {
      setLoading(false);
      return;
    }

    let active = true;
    authApi
      .me()
      .then((profile) => {
        if (!active) return;
        setUser(profile);
        localStorage.setItem(
          appConfig.storageKeys.user,
          JSON.stringify(profile),
        );
      })
      .catch((error: unknown) => {
        if (!active) return;
        if (error instanceof ApiClientError && error.status === 401) {
          clearSession();
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [clearSession]);

  useEffect(() => {
    const onAuthExpired = () => clearSession();
    window.addEventListener('hadramout:auth-expired', onAuthExpired);
    return () =>
      window.removeEventListener('hadramout:auth-expired', onAuthExpired);
  }, [clearSession]);

  const login = useCallback(
    async (payload: LoginPayload): Promise<UserDto> => {
      const response = await authApi.login(payload);
      persistSession(response);
      return response.user;
    },
    [persistSession],
  );

  const register = useCallback(
    async (payload: RegisterPayload): Promise<UserDto> => {
      const response = await authApi.register(payload);
      persistSession(response);
      return response.user;
    },
    [persistSession],
  );

  const logout = useCallback(() => {
    clearSession();
  }, [clearSession]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(user && token),
      isAdmin: user?.role === 'admin',
      login,
      register,
      logout,
    }),
    [user, token, loading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
};
