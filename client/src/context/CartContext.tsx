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
import type { MenuItemDto } from '@shared/api';

export interface CartLine {
  item: MenuItemDto;
  quantity: number;
}

interface CartContextValue {
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: MenuItemDto, quantity?: number) => void;
  updateQuantity: (menuItemId: number, quantity: number) => void;
  removeItem: (menuItemId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const isCartLine = (value: unknown): value is CartLine => {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as { item?: Partial<MenuItemDto>; quantity?: unknown };
  return (
    typeof candidate.quantity === 'number' &&
    candidate.quantity > 0 &&
    typeof candidate.item === 'object' &&
    candidate.item !== null &&
    typeof candidate.item.id === 'number' &&
    typeof candidate.item.price === 'number' &&
    typeof candidate.item.name === 'string'
  );
};

const loadCart = (): CartLine[] => {
  const raw = localStorage.getItem(appConfig.storageKeys.cart);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isCartLine);
  } catch {
    return [];
  }
};

const round = (value: number): number =>
  Math.round((value + Number.EPSILON) * 100) / 100;

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [lines, setLines] = useState<CartLine[]>(loadCart);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(appConfig.storageKeys.cart, JSON.stringify(lines));
  }, [lines]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((item: MenuItemDto, quantity = 1) => {
    setLines((current) => {
      const existing = current.find((line) => line.item.id === item.id);
      if (existing) {
        return current.map((line) =>
          line.item.id === item.id
            ? {
                ...line,
                quantity: Math.min(line.quantity + quantity, 50),
                item,
              }
            : line,
        );
      }
      return [...current, { item, quantity: Math.min(quantity, 50) }];
    });
    setIsOpen(true);
  }, []);

  const updateQuantity = useCallback((menuItemId: number, quantity: number) => {
    setLines((current) =>
      current
        .map((line) =>
          line.item.id === menuItemId
            ? { ...line, quantity: Math.min(Math.max(quantity, 0), 50) }
            : line,
        )
        .filter((line) => line.quantity > 0),
    );
  }, []);

  const removeItem = useCallback((menuItemId: number) => {
    setLines((current) =>
      current.filter((line) => line.item.id !== menuItemId),
    );
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const itemCount = useMemo(
    () => lines.reduce((total, line) => total + line.quantity, 0),
    [lines],
  );

  const subtotal = useMemo(
    () =>
      round(
        lines.reduce(
          (total, line) => total + line.item.price * line.quantity,
          0,
        ),
      ),
    [lines],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      itemCount,
      subtotal,
      isOpen,
      openCart,
      closeCart,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [
      lines,
      itemCount,
      subtotal,
      isOpen,
      openCart,
      closeCart,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextValue => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside CartProvider');
  }
  return context;
};
