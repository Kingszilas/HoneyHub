"use client";

import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import Quote from "@/components/Quote";
import { useFormState } from 'react-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Leaf, Star, Sprout, Wind } from 'lucide-react';
import { RecipeSuggestions } from '@/components/recipe-suggestions';
import { blogPosts, products } from '@/lib/data';
import { getBlogPosts, BlogPost } from '@/lib/api';
import { useLanguage } from '@/contexts/language-context';

export default function Home() {
  const { t, language } = useLanguage();
  const featuredProducts = products.slice(0, 3);
  const featuredPosts = blogPosts.slice(0, 2);

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
      <section
        className="relative w-full h-[60vh] md:h-[80vh] bg-cover bg-center flex items-center justify-center"
         style={{
    backgroundImage: `url(${randomImg})`,
  }}
        data-ai-hint="honeycomb honey"
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
            <Link href="/#products">{t('home.hero.shopNow')}</Link>
          </Button>
        </div>
      </section>
      
      <section>
        <Quote lang={language} />
      </section>

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
                    //width={600}     // relative → kötelező, mert a fill absolute pozícióval működik, h-64 → fix magasság, így a kép látható lesz,w-full → teljes szélesség
                    //height={400}
                    className='object-cover'
                    //className="w-full h-48 object-cover"
                    //data-ai-hint="honey product"
                  />
                </CardHeader>
                <CardContent className="p-6 flex-grow">
                  <CardTitle className="font-headline text-xl">{getProductLocale(product, 'name')}</CardTitle>
                  <CardDescription className="mt-2">{getProductLocale(product, 'description')}</CardDescription>
                  <div className="flex items-center mt-4">
                  </div>
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

      <section id="recipes" className="relative py-16 md:py-24 bg-honeycomb-realistic2">
        <RecipeSuggestions />
      </section>

             <section className="py-16 md:py-24 bg-gradient-to-br from-yellow-100 to-amber-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-3xl md:text-4xl font-bold mb-8 text-amber-800">
            Hírek, nyeremények és érdekességek
          </h2>
          <p className="text-lg text-amber-900 max-w-2xl mx-auto mb-8">
            Fedezd fel blogunkat, ahol hasznos tippeket, különleges nyereményjátékokat 
            és friss híreket találsz a méhészet és a természet világából.
          </p>
          <Card className="max-w-3xl mx-auto border-2 border-amber-400 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <CardContent className="p-10">
              <div className="flex justify-center mb-4">
                <Star className="h-10 w-10 text-amber-500" />
              </div>
              <h3 className="font-headline text-2xl font-bold mb-4 text-amber-800">
                Tudj meg többet a blogunkon!
              </h3>
              <p className="text-amber-700 mb-6">
                Inspirációk, receptek és érdekességek egy helyen.
              </p>
              <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl">
                <Link href="/blog">
                  Látogass el a Blog oldalra
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

    </div>
  );
}
