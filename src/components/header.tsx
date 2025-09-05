
"use client";

import Link from 'next/link';
import { BeeIcon } from './icons/bee-icon';
import { Button } from './ui/button';
import { Menu, Globe } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useLanguage } from '@/contexts/language-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


export function Header() {
  const { t, setLanguage, language } = useLanguage();

  const navLinks = [
    { href: '/#products', label: t('header.products') },
    { href: '/#recipes', label: t('header.recipes') },
    { href: '/blog', label: t('header.blog') },
    { href: '/contact', label: t('header.contact') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <BeeIcon className="h-8 w-8 text-primary" />
          <span className="font-headline text-2xl font-bold">VitézMéz</span>
        </Link>
        <nav className="hidden md:flex items-center gap-4 text-sm font-medium">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-primary">
              {link.label}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Change language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage('en')} disabled={language === 'en'}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('hu')} disabled={language === 'hu'}>
                Magyar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 pt-12">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
                 <div className="flex gap-4 pt-4">
                  <Button variant={language === 'en' ? 'secondary' : 'ghost'} onClick={() => setLanguage('en')}>EN</Button>
                  <Button variant={language === 'hu' ? 'secondary' : 'ghost'} onClick={() => setLanguage('hu')}>HU</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
