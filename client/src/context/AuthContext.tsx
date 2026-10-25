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
  isKitchen: boolean;
  isCashier: boolean;
  isDelivery: boolean;
  isApproved: boolean;
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
      !(
        parsed.role === 'customer' ||
        parsed.role === 'admin' ||
        parsed.role === 'kitchen' ||
        parsed.role === 'cashier' ||
        parsed.role === 'delivery'
      )
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
        if (localStorage.getItem(appConfig.storageKeys.token) !== storedToken) {
          return;
        }
        setUser(profile);
        localStorage.setItem(
          appConfig.storageKeys.user,
          JSON.stringify(profile),
        );
      })
      .catch((error: unknown) => {
        if (!active) return;
        if (error instanceof ApiClientError && error.status === 401) {
          // If the token changed while this request was in flight (for example
          // the user logged in again), do not destroy the new session.
          const currentToken = localStorage.getItem(appConfig.storageKeys.token);
          if (currentToken === storedToken) {
            clearSession();
          }
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
      // persistSession writes the token to localStorage synchronously, so any
      // request issued after this resolves already carries the new token.
      // Navigation happens in an effect once the auth state has rendered.
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
      isKitchen: user?.role === 'kitchen',
      isCashier: user?.role === 'cashier',
      isDelivery: user?.role === 'delivery',
      isApproved: user?.isApproved ?? false,
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
