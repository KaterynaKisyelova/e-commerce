export type Product = {
  category: string;
  colors: string[];
  company: string;
  description: string;
  id: string;
  name: string;
  price: number;
  shipping?: boolean;
  featured: boolean;
  image: string;
};

export type SingleProduct = {
  category: string;
  colors: string[];
  company: string;
  description: string;
  featured: boolean;
  id: string;
  images: Required<{ url: string; filename: string }>[];
  name: string;
  price: number;
  reviews: number;
  stars: number;
  stock: number;
};

export type SingleCartItem = {
  id: string;
  image: string;
  name: string;
  color: string;
  price: number;
  amount: number;
  max: number;
};

export type ProductKeys = "company" | "category" | "colors";
