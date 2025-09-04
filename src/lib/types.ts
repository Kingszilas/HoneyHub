export interface Product {
  id: number;
  name: string | { [key: string]: string };
  description: string | { [key: string]: string };
  price: number | { [key: string]: number };
  image: string;
  rating: number;
  reviewCount: number;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
}

export interface Recipe {
  name: string;
  ingredients: string;
  instructions: string;
}
