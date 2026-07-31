import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import CartToast from '../components/CartToast';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [toastItem, setToastItem] = useState(null);

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('cartItems');
      return saved ? JSON.parse(saved) : [];
    } catch (err) {
      console.error('Failed to parse cart items from localStorage:', err);
      localStorage.removeItem('cartItems');
      return [];
    }
  });

  // Save cart items to localStorage on change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Clear cart when user explicitly logs out (user is null)
  useEffect(() => {
    if (user === null) {
      const savedUser = localStorage.getItem('userInfo');
      if (!savedUser) {
        setCartItems([]);
        localStorage.removeItem('cartItems');
      }
    }
  }, [user]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });

    // Trigger floating toast notification
    setToastItem(product);
  };

  useEffect(() => {
    if (toastItem) {
      const timer = setTimeout(() => setToastItem(null), 3800);
      return () => clearTimeout(timer);
    }
  }, [toastItem]);

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item._id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
      <CartToast item={toastItem} onClose={() => setToastItem(null)} />
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}