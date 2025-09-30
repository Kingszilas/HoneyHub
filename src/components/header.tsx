"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Menu, Globe, Facebook, Instagram, ShoppingCart } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useLanguage } from "@/contexts/language-context";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useCart } from "@/contexts/cart-context";
import { PrimaryButton } from "@/components/PrimaryButton";

export function Header() {
  const { t, setLanguage, language } = useLanguage();
  const { items } = useCart();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

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
            width={72}
            height={72}
            className="object-contain"
          />
          <span className="font-headline text-3xl font-extrabold tracking-tight">
            VitézMéz
          </span>
        </Link>

        {/* Navigation (desktop) */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <PrimaryButton key={link.href} href={link.href}>
              {link.label}
            </PrimaryButton>
          ))}
        </nav>

        {/* Right side: Socials + Language + Cart */}
        <div className="hidden md:flex items-center gap-4">
          {/* Social Icons */}
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
              <Button variant="ghost" size="icon">
                <Globe className="h-5 w-5" />
                <span className="sr-only">Change language</span>
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
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-4">
          {/* Mobile Cart */}
          <Link href="/cart" className="relative">
            <ShoppingCart className={iconClass} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Sheet Menu */}
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
                  <PrimaryButton key={link.href} href={link.href}>
                    {link.label}
                  </PrimaryButton>
                ))}

                {/* Social Icons */}
                <div className="flex gap-4 pt-4">
                  <Link href="https://www.facebook.com/vitez.tibor.7" className={iconClass}>
                    <Facebook />
                  </Link>
                  <Link href="https://www.instagram.com/viteztibor07/" className={iconClass}>
                    <Instagram />
                  </Link>
                </div>

                {/* Language */}
                <div className="flex gap-4 pt-4">
                  <Button variant={language === "en" ? "secondary" : "ghost"} onClick={() => setLanguage("en")}>
                    EN
                  </Button>
                  <Button variant={language === "hu" ? "secondary" : "ghost"} onClick={() => setLanguage("hu")}>
                    HU
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
