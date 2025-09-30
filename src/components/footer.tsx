"use client";

import Link from 'next/link';
import { BeeIcon } from './icons/bee-icon';
import { Twitter, Facebook, Instagram } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="bg-card text-foreground">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <img 
                src="/images/logo.png"     
                alt="VitézMéz" 
                width={62} 
                height={62} 
                className="object-contain" />
              <span className="font-headline text-2xl font-bold">VitézMéz</span>
            </Link>
            <p className="text-sm text-muted-foreground">{t('footer.subtitle')}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 md:col-span-3 gap-8">
            <div>
              <h4 className="font-bold mb-4">{t('footer.shop')}</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/products" className="text-muted-foreground hover:text-primary">{t('footer.allProducts')}</Link></li>
                {/*<li><Link href="/#products" className="text-muted-foreground hover:text-primary">{t('footer.wildflowerHoney')}</Link></li>
                <li><Link href="/#products" className="text-muted-foreground hover:text-primary">{t('footer.cloverHoney')}</Link></li>
                <li><Link href="/#products" className="text-muted-foreground hover:text-primary">{t('footer.manukaHoney')}</Link></li>*/}
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t('footer.explore')}</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/blog" className="text-muted-foreground hover:text-primary">{t('footer.blog')}</Link></li>
                <li><Link href="/#recipes" className="text-muted-foreground hover:text-primary">{t('footer.recipes')}</Link></li>
                <li><Link href="/about" className="text-muted-foreground hover:text-primary">{t('footer.aboutUs')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t('footer.support')}</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/contact" className="text-muted-foreground hover:text-primary">{t('footer.contactUs')}</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">{t('footer.faqs')}</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">{t('footer.shippingReturns')}</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} {t('footer.copyright')}</p>
           {/* 🔥 Új gomb a sütikhez */}
            <button
              onClick={() => (window as any).openCookieConsent()}
              className="text-sm underline text-muted-foreground hover:text-primary"
            >
              Süti beállítások
            </button>

          <div className="flex space-x-4 mt-4 md:mt-0">
            {/*<Link href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></Link>*/}
            <Link href="https://www.facebook.com/vitez.tibor.7" className="text-muted-foreground hover:text-primary"><Facebook className="h-5 w-5" /></Link>
            <Link href="https://www.instagram.com/viteztibor07/" className="text-muted-foreground hover:text-primary"><Instagram className="h-5 w-5" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
