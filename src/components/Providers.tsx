"use client";

import { ReactNode } from "react";
import { CartProvider } from "@/contexts/cart-context";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
}
