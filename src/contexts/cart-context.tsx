"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Termék típus
export type CartItem = {
  id: string | number;
  name: string;
  price: number;
  image?: string;
  quantity: number;

};

type CartContextType = {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string | number) => void;
  clearCart: () => void;
  updateQuantity: (id: string | number, quantity: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // hozzáadás
  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // törlés
  const removeFromCart = (id: string | number) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  // kosár ürítése
  const clearCart = () => setItems([]);

// módosítás
const updateQuantity = (id: string | number, quantity: number) => {
  setItems((prev) =>
    prev.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    )
  );
};
  

  return (
    <CartContext.Provider 
      value={{ items, addToCart, removeFromCart, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );

  
}

// hook a könnyű használathoz
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
