"use client";

import Image from 'next/image';
import Link from 'next/link';
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
import { useLanguage } from '@/contexts/language-context';

export default function Home() {
  const { t, language } = useLanguage();
  const featuredProducts = products.slice(0, 3);
  const featuredPosts = blogPosts.slice(0, 2);

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
        style={{ backgroundImage: "url('https://picsum.photos/1600/900')" }}
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

      <section id="products" className="py-16 md:py-24 bg-background hexagon-bg">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">
            {t('home.featuredProducts.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <CardHeader className="p-0">
                  <Image
                    src={product.image}
                    alt={getProductLocale(product, 'name') as string}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover"
                    data-ai-hint="honey product"
                  />
                </CardHeader>
                <CardContent className="p-6 flex-grow">
                  <CardTitle className="font-headline text-xl">{getProductLocale(product, 'name')}</CardTitle>
                  <CardDescription className="mt-2">{getProductLocale(product, 'description')}</CardDescription>
                  <div className="flex items-center mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-5 w-5 ${i < product.rating ? 'text-primary' : 'text-muted'}`} fill="currentColor" />
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">({product.reviewCount} {t('home.featuredProducts.reviews')})</span>
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

      <section id="recipes" className="py-16 md:py-24 bg-background hexagon-bg">
        <RecipeSuggestions />
      </section>

      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-center mb-12">
            {t('home.fromTheBlog.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {featuredPosts.map((post) => (
              <div key={post.id} className="group">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={800}
                  height={500}
                  className="w-full h-64 object-cover rounded-lg shadow-lg group-hover:opacity-90 transition-opacity"
                  data-ai-hint="honey blog post"
                />
                <h3 className="font-headline text-2xl font-bold mt-6 mb-2">{post.title}</h3>
                <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                <Button asChild variant="link" className="p-0 text-primary">
                  <Link href={`/blog#${post.id}`}>{t('home.fromTheBlog.readMore')} <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </div>
            ))}
          </div>
           <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/blog">{t('home.fromTheBlog.visitBlog')} <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
