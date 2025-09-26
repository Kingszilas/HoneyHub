
"use client";

import Link from "next/link";
import Image from "next/image";
import { BeeIcon } from "./icons/bee-icon";
import { Button } from "./ui/button";
import { Menu, Globe, Facebook, Instagram } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useLanguage } from "@/contexts/language-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const { t, setLanguage, language } = useLanguage();

  const navLinks = [
    { href: "/#products", label: t("header.products") },
    { href: "/#recipes", label: t("header.recipes") },
    { href: "/about", label: t("header.aboutUs") },
    { href: "/blog", label: t("header.blog") },
    { href: "/contact", label: t("header.contact") },
    
  ];

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

        {/* Navigation (középen) */}
   <nav className="hidden md:flex items-center gap-6">
  {navLinks.map((link) => (
    <Button
      key={link.href}
      asChild
      variant="ghost"
      className="
        text-base font-semibold tracking-wide text-gray-800
        px-4 py-2 rounded-lg border border-transparent
        transition-all duration-300
        hover:border-primary hover:shadow-lg hover:scale-105
      "
    >
      <Link href={link.href}>{link.label}</Link>
    </Button>
  ))}
</nav>

        {/* Right side: Socials + Language */}
        <div className="hidden md:flex items-center gap-4">
          {/* Social Icons */}
          <Link
            href="https://www.facebook.com/vitez.tibor.7"
            className="text-muted-foreground hover:text-primary transition"
          >
            <Facebook className="h-5 w-5" />
          </Link>
          <Link
            href="https://www.instagram.com/viteztibor07/"
            className="text-muted-foreground hover:text-primary transition"
          >
            <Instagram className="h-5 w-5" />
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
              <DropdownMenuItem
                onClick={() => setLanguage("en")}
                disabled={language === "en"}
              >
                English
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setLanguage("hu")}
                disabled={language === "hu"}
              >
                Magyar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu */}
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
                {/* Social + Language in mobile */}
                <div className="flex gap-4 pt-4">
                  <Link
                    href="https://www.facebook.com/vitez.tibor.7"
                    className="text-muted-foreground hover:text-primary"
                  >
                    <Facebook className="h-6 w-6" />
                  </Link>
                  <Link
                    href="https://www.instagram.com/viteztibor07/"
                    className="text-muted-foreground hover:text-primary"
                  >
                    <Instagram className="h-6 w-6" />
                  </Link>
                </div>
                <div className="flex gap-4 pt-4">
                  <Button
                    variant={language === "en" ? "secondary" : "ghost"}
                    onClick={() => setLanguage("en")}
                  >
                    EN
                  </Button>
                  <Button
                    variant={language === "hu" ? "secondary" : "ghost"}
                    onClick={() => setLanguage("hu")}
                  >
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
