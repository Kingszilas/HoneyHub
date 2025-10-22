export interface Product {
  id: number;  // most már incrementált szám
  name: string | { [key: string]: string };
  description: string | { [key: string]: string };
  price: number | { [key: string]: number };
  image: string;
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

// NEW SUPABASE TYPES
// =========================
export type Profile = {
  id: string;
  full_name: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  postal_code: string | null;
  street: string | null;
  house_number: string | null;
};

export type Order = {
  id: string;
  user_id: string;
  product_id: string | null;
  quantity: number;
  amount: number;
  status: "pending" | "paid" | "processing" | "shipped" | "completed" | "cancelled";
  shipping: Record<string, any>;
  created_when: string;
  updated_when: string;
};