"use client";

import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import Quote from "@/components/Quote";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Leaf, Star, Sprout, Wind, Phone, Mail } from 'lucide-react';
import { RecipeSuggestions } from '@/components/recipe-suggestions';
import { blogPosts, products } from '@/lib/data';
import { useLanguage } from '@/contexts/language-context';

export default function Home() {
  const { t, language } = useLanguage();
  const featuredProducts = products.slice(0, 3);

  const myImages = [
    "/images/pexels-pixabay-57398.jpg",
    "/images/pexels-eva-al-1617171197-27907488.jpg",
    "/images/pexels-katlovessteve-551619.jpg",
    "/images/pexels-umsiedlungen-1035224.jpg",
    "/images/pexels-rajsteven-2949743.jpg",
    "/images/pexels-karolina-grabowska-5478144.jpg",
  ];

  const [randomImg, setRandomImg] = React.useState(myImages[0]);

  React.useEffect(() => {
    const img = myImages[Math.floor(Math.random() * myImages.length)];
    setRandomImg(img);
  }, []);

  const getProductLocale = (product: (typeof products)[0], field: 'name' | 'description' | 'price') => {
    const value = product[field];
    if (typeof value === 'object') {
      return value[language] ?? value['en'];
    }
    return value;
  };
  
  const formatPrice = (price: number) => {
    if (language === 'hu') {
      return `${price.toLocaleString('hu-HU')} Ft`;
    }
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero Section */}
      <section
        className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center bg-center bg-cover bg-fixed"
        style={{ backgroundImage: `url(${randomImg})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-headline text-4xl md:text-7xl font-bold drop-shadow-lg">
            {t('home.hero.title')}
          </h1>
          <p className="mt-4 text-lg md:text-2xl max-w-2xl mx-auto">
            {t('home.hero.subtitle')}
          </p>
          <Button asChild size="lg" className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
            <Link href="/products">{t('home.hero.shopNow')}</Link>
          </Button>
        </div>
      </section>

      {/* Quote Section */}
      <section>
        <Quote lang={language} />
      </section>

      {/* Featured Products */}
      <section id="products" className="relative py-16 md:py-24 bg-honeycomb-realistic">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">
            {t('home.featuredProducts.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <CardHeader className="p-0 relative w-full h-64">
                  <Image
                    src={product.image}
                    alt={getProductLocale(product, 'name') as string}
                    fill
                    className='object-cover'
                  />
                </CardHeader>
                <CardContent className="p-6 flex-grow">
                  <CardTitle className="font-headline text-xl">{getProductLocale(product, 'name')}</CardTitle>
                  <CardDescription className="mt-2">{getProductLocale(product, 'description')}</CardDescription>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex justify-between items-center">
                  <p className="text-2xl font-bold text-foreground">{formatPrice(getProductLocale(product, 'price') as number)}</p>
                  <Button>{t('home.featuredProducts.addToCart')}</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/products">{t('home.featuredProducts.viewAll')} <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">
            {t('home.whyChoose.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-4">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/20 mx-auto mb-4">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-headline text-xl font-bold mb-2">{t('home.whyChoose.naturalTitle')}</h3>
              <p className="text-muted-foreground">{t('home.whyChoose.naturalText')}</p>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/20 mx-auto mb-4">
                <Sprout className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-headline text-xl font-bold mb-2">{t('home.whyChoose.sustainableTitle')}</h3>
              <p className="text-muted-foreground">{t('home.whyChoose.sustainableText')}</p>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/20 mx-auto mb-4">
                <Wind className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-headline text-xl font-bold mb-2">{t('home.whyChoose.flavorsTitle')}</h3>
              <p className="text-muted-foreground">{t('home.whyChoose.flavorsText')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recipe Suggestions */}
      <section id="recipes" className="relative py-16 md:py-24 bg-honeycomb-realistic2">
        <RecipeSuggestions />
      </section>

     {/* Blog + Rendelés felhívás */}
<section className="py-16 md:py-24 bg-gradient-to-br from-yellow-100 to-amber-200">
  <div className="container mx-auto px-4 flex flex-col md:flex-row gap-12">

    {/* Blog felhívás */}
    <div className="flex-1 max-w-3xl mx-auto text-center md:text-left">
      <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4 text-amber-800">
        Hírek, tippek és szolgáltatásaink
      </h2>
      <p className="text-lg text-amber-900 mb-6">
        Fedezd fel blogunkat, ahol további információkat, inspirációkat és friss híreket találsz a méhészet és a természet világából.
      </p>
      <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl">
        <Link href="/blog">
          Látogass el a Blog oldalra
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </Button>
    </div>

    {/* Rendelés leadása */}
    <div 
      className="flex-1 max-w-3xl mx-auto border-2 border-amber-400 shadow-lg rounded-xl p-10 bg-white/30 backdrop-blur-md relative overflow-hidden"
      style={{ 
        backgroundImage: `url('/images/contactfoto3.jpg')`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      }}
    >
      <div className="absolute inset-0 bg-black/25 rounded-xl"></div> {/* overlay a kontraszthoz */}
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-6 text-white">
  {/* Telefon */}
  <div className="flex flex-col items-center gap-2 relative overflow-hidden">
    <Phone className="h-10 w-10 text-amber-200" />
    <p className="font-semibold text-xl relative z-10 overflow-hidden">
      <span className="relative z-10">Telefonon várjuk rendelésed</span>
      <span className="absolute inset-0 bg-white/20 transform -translate-x-full animate-slide"></span>
    </p>
    <p className="text-lg relative z-10">+36 30 123 4567</p>
  </div>

  {/* Email */}
  <div className="flex flex-col items-center gap-2 relative overflow-hidden">
    <Mail className="h-10 w-10 text-amber-200" />
    <p className="font-semibold text-xl relative z-10 overflow-hidden">
      <span className="relative z-10">E-mailben is leadhatod</span>
      <span className="absolute inset-0 bg-white/20 transform -translate-x-full animate-slide"></span>
    </p>
    <p className="text-lg relative z-10">rendeles@vitezmez.hu</p>
        </div>
      </div>
      <div className="mt-6 text-center relative z-10">
        <Button asChild size="lg" className="bg-primary text-white font-semibold rounded-xl px-6 py-3">
          <Link href="/contact">Rendelés leadása most</Link>
        </Button>
      </div>
    </div>

  </div>
</section>

    </div>
  );
}
