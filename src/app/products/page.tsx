"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data";
import { useLanguage } from "@/contexts/language-context";

export default function ProductsPage() {
  const { t, language } = useLanguage();

  const getProductLocale = (
    product: (typeof products)[0],
    field: "name" | "description" | "price"
  ) => {
    const value = product[field];
    if (typeof value === "object") {
      return value[language] ?? value["en"];
    }
    return value;
  };

  const formatPrice = (price: number) => {
    if (language === "hu") {
      return `${price.toLocaleString("hu-HU")} Ft`;
    }
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-honeycomb-realistic">
        <div className="container mx-auto px-4 py-16">
            <h1 className="font-headline text-4xl font-bold text-center mb-12 text-black drop-shadow">
        {t("Termékek")}
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Card
            key={product.id}
            className="flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <CardHeader className="p-0 relative w-full h-64">
              <Image
                src={product.image}
                alt={getProductLocale(product, "name") as string}
                fill
                className="object-cover"
              />
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <CardTitle className="font-headline text-xl">
                {getProductLocale(product, "name")}
              </CardTitle>
              <CardDescription className="mt-2">
                {getProductLocale(product, "description")}
              </CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0 flex justify-between items-center">
              <p className="text-2xl font-bold text-foreground">
                {formatPrice(getProductLocale(product, "price") as number)}
              </p>
              <Button>{t("home.featuredProducts.addToCart")}</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
        </div>
    </div>
  );
}
