export type ProductCategory =
  | "Audio"
  | "Wearables"
  | "Workspace"
  | "Photography"
  | "Travel";

export type ProductColor = {
  name: string;
  value: string;
};

export type Product = {
  id: string;
  sku: string;
  slug: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  specs: Record<string, string>;
  colors: ProductColor[];
  images: string[];
  badge?: string;
  stock: number;
  accent: string;
};

export type Category = {
  name: ProductCategory;
  slug: string;
  description: string;
  image: string;
};
