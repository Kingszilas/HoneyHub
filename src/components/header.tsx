"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Menu, Globe, Facebook, Instagram, ShoppingCart, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useLanguage } from "@/contexts/language-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabaseClient";
import { PrimaryButton } from "@/components/PrimaryButton";

export function Header() {
  const { t, setLanguage, language } = useLanguage();
  const { items } = useCart();
  const { user } = useAuth();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  const navLinks = [
    { href: "/products", label: t("header.products") },
    { href: "/#recipes", label: t("header.recipes") },
    { href: "/about", label: t("header.aboutUs") },
    { href: "/blog", label: t("header.blog") },
    { href: "/contact", label: t("header.contact") },
  ];

  const iconClass = "h-6 w-6 text-gray-600 transition-colors duration-200 hover:text-primary";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
        {/* Logo + Brand */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="VitézMéz"
            width={64}
            height={64}
            className="object-contain"
          />
          <span className="font-headline text-2xl font-extrabold tracking-tight">
            VitézMéz
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-5">
          {navLinks.map((link) => (
            <PrimaryButton key={link.href} href={link.href} variant="primary">
              {link.label}
            </PrimaryButton>
          ))}
        </nav>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-3">
          {/* Socials */}
          <Link href="https://www.facebook.com/vitez.tibor.7" className={iconClass}>
            <Facebook />
          </Link>
          <Link href="https://www.instagram.com/viteztibor07/" className={iconClass}>
            <Instagram />
          </Link>

          {/* Cart */}
          <Link href="/cart" className="relative">
            <ShoppingCart className={iconClass} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Language Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage("en")} disabled={language === "en"}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("hu")} disabled={language === "hu"}>
                Magyar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Account Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="flex flex-col gap-2 p-2">
              {user ? (
                <>
                  <DropdownMenuItem asChild>
                    <PrimaryButton href="/account" variant="primary" className="w-full text-left py-2 px-4 text-sm">
                      Fiókom
                    </PrimaryButton>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <PrimaryButton onClick={handleLogout} variant="secondary" className="w-full text-left py-2 px-4 text-sm">
                      Kijelentkezés
                    </PrimaryButton>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <PrimaryButton href="/auth/login" variant="primary" className="w-full text-left py-2 px-4 text-sm">
                      Bejelentkezés
                    </PrimaryButton>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <PrimaryButton href="/auth/register" variant="secondary" className="w-full text-left py-2 px-4 text-sm">
                      Regisztráció
                    </PrimaryButton>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-3">
          <Link href="/cart" className="relative">
            <ShoppingCart className={iconClass} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 pt-12">
                {navLinks.map((link) => (
                  <PrimaryButton key={link.href} href={link.href} variant="primary">
                    {link.label}
                  </PrimaryButton>
                ))}

                <div className="pt-4 flex flex-col gap-2">
                  {user ? (
                    <>
                      <PrimaryButton href="/account" variant="primary" className="py-2 px-4 text-sm">
                        Fiókom
                      </PrimaryButton>
                      <PrimaryButton onClick={handleLogout} variant="secondary" className="py-2 px-4 text-sm">
                        Kijelentkezés
                      </PrimaryButton>
                    </>
                  ) : (
                    <>
                      <PrimaryButton href="/auth/login" variant="primary" className="py-2 px-4 text-sm">
                        Bejelentkezés
                      </PrimaryButton>
                      <PrimaryButton href="/auth/register" variant="secondary" className="py-2 px-4 text-sm">
                        Regisztráció
                      </PrimaryButton>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
