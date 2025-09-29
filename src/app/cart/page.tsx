"use client";

import React from "react";
import Link from "next/link";
import { useCart } from "@/contexts/cart-context";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, ArrowLeft, Minus, Plus } from "lucide-react";
import Image from "next/image";

export default function CartPage() {
  const { items, removeFromCart, clearCart, updateQuantity } = useCart();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero section egyszerű háttérrel */}
      <section className="relative w-full h-48 flex items-center justify-center bg-amber-100">
        <h1 className="font-headline text-4xl md:text-6xl font-bold text-amber-900">
          Kosár
        </h1>
      </section>

      {/* Cart Content */}
      <section className="flex-grow container mx-auto px-4 py-12">
        {items.length === 0 ? (
          <div className="text-center">
            <p className="text-lg mb-6">A kosarad üres.</p>
            <Button asChild>
              <Link href="/products">
                <ArrowLeft className="mr-2 h-4 w-4" /> Vissza a termékekhez
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Terméklista */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
                <Card key={item.id} className="flex flex-col md:flex-row overflow-hidden">
                  <div className="relative w-full md:w-48 h-48">
                    <Image
                      src={item.image ?? "/placeholder.png"}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardContent className="flex-1 p-6 flex flex-col justify-between">
                    <div>
                      <CardTitle className="text-xl">{item.name}</CardTitle>
                      {/* Mennyiség állító gombok */}
                      <div className="flex items-center gap-3 mt-3">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-lg font-semibold w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <p className="mt-3 font-semibold">
                        {item.price} Ft / db
                      </p>
                      <p className="text-muted-foreground">
                        Összesen:{" "}
                        {(item.price * item.quantity).toLocaleString("hu-HU")} Ft
                      </p>
                    </div>

                    <Button
                      onClick={() => removeFromCart(item.id)}
                      variant="destructive"
                      className="mt-4 self-start"
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Törlés
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Összegzés */}
            <div>
              <Card className="p-6">
                <CardHeader>
                  <CardTitle>Összegzés</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-bold mb-4">
                    Összesen: {total.toLocaleString("hu-HU")} Ft
                  </p>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                  <Button asChild className="w-full">
                    <Link href="/checkout">Tovább a megrendeléshez</Link>
                  </Button>
                  <Button
                    onClick={clearCart}
                    variant="outline"
                    className="w-full"
                  >
                    Kosár ürítése
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
