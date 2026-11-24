import { atom, map } from 'nanostores';

export interface CartItem {
  productId: number;
  quantity: number;
}

const cart = atom<CartItem[]>([]);

const listeners = new Set<(cart: CartItem[]) => void>();

cart.onChange.subscribe((items) => {
  for (const listener of listeners) {
    listener(items);
  }
});

export function getCart() {
  return cart.get();
}

export function addToCart(productId: number, quantity = 1) {
  const items = cart.get();
  const existing = items.find((i) => i.productId === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    items.push({ productId, quantity });
  }
  cart.set(items);
  persistToLocalStorage(items);
}

export function removeFromCart(productId: number) {
  cart.set(cart.get().filter((i) => i.productId !== productId));
  persistToLocalStorage(cart.get());
}

export function updateCartQuantity(productId: number, quantity: number) {
  const items = cart.get().map((i) => (i.productId === productId ? { ...i, quantity } : i));
  cart.set(items);
  persistToLocalStorage(items);
}

export function clearCart() {
  cart.set([]);
  persistToLocalStorage([]);
}

function persistToLocalStorage(items: CartItem[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('ecommerce-poc-cart', JSON.stringify(items));
  } catch {
    // Storage full or unavailable - ignore for PoC
  }
}

const STORAGE_KEY = 'ecommerce-poc-cart';

export function initCart() {
  if (typeof window === 'undefined') return;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as CartItem[];
      if (Array.isArray(parsed)) {
        cart.set(parsed);
      }
    }
  } catch {
    // Invalid JSON or missing storage - start empty
  }
}

// Simple pub/sub for UI updates
const unsubscribeListeners = new Set<() => void>();
cart.onChange.subscribe(() => {
  for (const fn of unsubscribeListeners) fn();
});
export function subscribeToCart(fn: () => void) {
  unsubscribeListeners.add(fn);
  return () => unsubscribeListeners.delete(fn);
}
