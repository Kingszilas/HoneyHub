"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/data";
import { useLanguage } from "@/contexts/language-context";
import { Phone } from "lucide-react";

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

        {/* Vásárlási információ – kiemelt blokk */}
        <div className="mb-12">
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 bg-amber-100/80 backdrop-blur-md p-8 rounded-2xl shadow-xl overflow-hidden">

            {/* Animált ikon + szöveg */}
            <div className="flex flex-col items-center md:items-start gap-4 z-10">
              <div className="flex items-center justify-center h-20 w-20 rounded-full bg-amber-200 animate-pulse">
                <Phone className="h-10 w-10 text-amber-700" />
              </div>
              <h2 className="font-headline text-2xl font-bold text-gray-800">
                Hogyan tudsz rendelni?
              </h2>
              <p className="text-gray-900 max-w-md">
                Jelenleg a rendelés menete egyszerű: vedd fel velünk a kapcsolatot telefonon vagy e-mailben, és mi mindenben segítünk.
              </p>
              <p className="text-gray-900 font-semibold">
                <strong>Telefon:</strong> +36 30 123 4567 <br />
                <strong>E-mail:</strong> rendeles@vitezmez.hu
              </p>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-black font-semibold rounded-xl mt-4">
                <Link href="/contact">Rendelés leadása most</Link>
              </Button>
            </div>

            {/* Háttér dekoráció */}
            <div className="absolute inset-0 -z-10">
              <Image
                src="/images/pexels-pixabay-33260.jpg"
                alt="Rendelés"
                fill
                className="object-cover object-center rounded-2xl opacity-70"
              />
            </div>

          </div>
        </div>

        {/* Termék lista */}
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
