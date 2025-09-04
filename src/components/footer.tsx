import Link from 'next/link';
import { BeeIcon } from './icons/bee-icon';
import { Twitter, Facebook, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-card text-foreground">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <BeeIcon className="h-8 w-8 text-primary" />
              <span className="font-headline text-2xl font-bold">HoneyHub</span>
            </Link>
            <p className="text-sm text-muted-foreground">Pure, Golden, Unforgettable.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 md:col-span-3 gap-8">
            <div>
              <h4 className="font-bold mb-4">Shop</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/#products" className="text-muted-foreground hover:text-primary">All Products</Link></li>
                <li><Link href="/#products" className="text-muted-foreground hover:text-primary">Wildflower Honey</Link></li>
                <li><Link href="/#products" className="text-muted-foreground hover:text-primary">Clover Honey</Link></li>
                <li><Link href="/#products" className="text-muted-foreground hover:text-primary">Manuka Honey</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Explore</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/blog" className="text-muted-foreground hover:text-primary">Blog</Link></li>
                <li><Link href="/#recipes" className="text-muted-foreground hover:text-primary">Recipes</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/contact" className="text-muted-foreground hover:text-primary">Contact Us</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">FAQs</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-primary">Shipping & Returns</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} HoneyHub. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter className="h-5 w-5" /></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook className="h-5 w-5" /></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram className="h-5 w-5" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
