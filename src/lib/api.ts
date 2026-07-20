import type { Category, Product, ProductCategory, ProductColor } from "@/types/product";

/**
 * Thin typed client for the Elevate Spring Boot backend (see /backend).
 * Every function here talks to a real REST endpoint; nothing in this file
 * fabricates data. Pages that read the catalog fall back to the bundled
 * static catalog (src/lib/products.ts) if the API is unreachable, so the
 * storefront still renders even when the backend isn't running.
 */

const LOCAL_API_URL = "http://localhost:8080";
const PRODUCTION_API_URL = "https://elevate-api-os6w.onrender.com";

const configuredApiUrl = process.env.NEXT_PUBLIC_API_URL;

export const API_BASE_URL = (
  configuredApiUrl ||
  (process.env.NODE_ENV === "production" && PRODUCTION_API_URL) ||
  LOCAL_API_URL
).replace(/\/$/, "");

const productImageOverrides: Record<string, string> = {
  "/products/vanta-studio-primary.png": "/products/vanta-studio-primary-zoomed.png",
  "/products/vertex-smart-glasses-primary.png": "/products/vertex-smart-glasses-primary-zoomed.png",
  "/products/echo-earbuds-primary-v2.png": "/products/echo-earbuds-primary-v3.png"
};

function normalizeProductImage(image: string | null): string | null {
  return image ? productImageOverrides[image] ?? image : null;
}

function normalizeProductImages(images: string[]): string[] {
  return images.map((image) => productImageOverrides[image] ?? image);
}

export class ApiError extends Error {
  status: number;
  fieldErrors?: Array<{ field: string; message: string }>;

  constructor(status: number, message: string, fieldErrors?: Array<{ field: string; message: string }>) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

type FetchOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  token?: string | null;
};

async function apiFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const { body, token, headers, ...rest } = options;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    cache: "no-store"
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const isJson = response.headers.get("content-type")?.includes("application/json");
  const payload = isJson ? await response.json() : undefined;

  if (!response.ok) {
    const message = payload?.message ?? `Request failed with status ${response.status}`;
    throw new ApiError(response.status, message, payload?.fieldErrors);
  }

  return payload as T;
}

// ---------------------------------------------------------------------------
// Shared response shapes (mirrors the backend DTOs in com.elevate.backend.dto)
// ---------------------------------------------------------------------------

export type PageResponse<T> = {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
};

export type ApiUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: "USER" | "ADMIN";
};

export type ApiAccountSummary = {
  verified: boolean;
  memberSince: string;
  orderCount: number;
  reviewCount: number;
};

export type AuthResponse = {
  accessToken: string;
  tokenType: string;
  expiresInMillis: number;
  user: ApiUser;
};

export type ApiCategory = {
  id: number;
  name: string;
  slug: string;
  description: string;
  imageUrl: string | null;
};

export type ApiProductColor = { name: string; value: string };

export type ApiProductSummary = {
  id: number;
  slug: string;
  name: string;
  tagline: string;
  categoryName: string;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviewCount: number;
  primaryImage: string | null;
  badge: string | null;
  inStock: boolean;
  accent: string;
};

export type ApiProductDetail = {
  id: number;
  sku: string;
  slug: string;
  name: string;
  tagline: string;
  categoryName: string;
  categorySlug: string;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviewCount: number;
  description: string;
  features: string[];
  specs: Record<string, string>;
  colors: ApiProductColor[];
  images: string[];
  badge: string | null;
  stock: number;
  inStock: boolean;
  accent: string;
};

export type ApiCartItem = {
  id: number;
  productId: number;
  productName: string;
  productSlug: string;
  productImage: string | null;
  unitPrice: number;
  quantity: number;
  color: string | null;
  lineTotal: number;
  inStock: boolean;
};

export type ApiCart = {
  id: number;
  items: ApiCartItem[];
  itemCount: number;
  subtotal: number;
};

export type ApiOrderItem = {
  id: number;
  productId: number | null;
  productName: string;
  productImage: string | null;
  unitPrice: number;
  quantity: number;
  color: string | null;
  lineTotal: number;
};

export type ApiShippingAddress = {
  firstName: string;
  lastName: string;
  addressLine1: string;
  city: string;
  postalCode: string;
  country: string;
};

export type ApiOrder = {
  id: number;
  orderNumber: string;
  status: string;
  contactEmail: string;
  shippingAddress: ApiShippingAddress;
  items: ApiOrderItem[];
  subtotal: number;
  shippingCost: number;
  tax: number;
  total: number;
  createdAt: string;
};

export type ApiReview = {
  id: number;
  productId: number;
  reviewerName: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  mine: boolean;
};

// ---------------------------------------------------------------------------
// Adapters: backend DTOs -> the frontend's existing Product/Category types,
// so ProductCard/ProductDetails/ShopExperience/etc. don't need to change.
// ---------------------------------------------------------------------------

export function summaryToProduct(dto: ApiProductSummary): Product {
  const primaryImage = normalizeProductImage(dto.primaryImage);

  return {
    id: String(dto.id),
    sku: "",
    slug: dto.slug,
    name: dto.name,
    tagline: dto.tagline,
    category: dto.categoryName as ProductCategory,
    price: dto.price,
    originalPrice: dto.originalPrice ?? undefined,
    rating: dto.rating,
    reviews: dto.reviewCount,
    description: "",
    features: [],
    specs: {},
    colors: [],
    images: primaryImage ? [primaryImage] : [],
    badge: dto.badge ?? undefined,
    stock: dto.inStock ? 1 : 0,
    accent: dto.accent
  };
}

export function detailToProduct(dto: ApiProductDetail): Product {
  return {
    id: String(dto.id),
    sku: dto.sku,
    slug: dto.slug,
    name: dto.name,
    tagline: dto.tagline,
    category: dto.categoryName as ProductCategory,
    price: dto.price,
    originalPrice: dto.originalPrice ?? undefined,
    rating: dto.rating,
    reviews: dto.reviewCount,
    description: dto.description,
    features: dto.features,
    specs: dto.specs,
    colors: dto.colors.map((color): ProductColor => ({ name: color.name, value: color.value })),
    images: normalizeProductImages(dto.images),
    badge: dto.badge ?? undefined,
    stock: dto.stock,
    accent: dto.accent
  };
}

export function categoryToDisplay(dto: ApiCategory): Category {
  return {
    name: dto.name as ProductCategory,
    slug: dto.slug,
    description: dto.description,
    image: dto.imageUrl ?? ""
  };
}

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

export function registerAccount(input: { firstName: string; lastName: string; email: string; password: string }) {
  return apiFetch<AuthResponse>("/api/auth/register", { method: "POST", body: input });
}

export function login(input: { email: string; password: string }) {
  return apiFetch<AuthResponse>("/api/auth/login", { method: "POST", body: input });
}

export function fetchCurrentUser(token: string) {
  return apiFetch<ApiUser>("/api/users/me", { token });
}

export function fetchAccountSummary(token: string) {
  return apiFetch<ApiAccountSummary>("/api/users/me/summary", { token });
}

// ---------------------------------------------------------------------------
// Catalog
// ---------------------------------------------------------------------------

export function fetchCategories() {
  return apiFetch<ApiCategory[]>("/api/categories");
}

export function fetchProducts(params: { size?: number } = {}) {
  const search = new URLSearchParams();
  search.set("size", String(params.size ?? 100));
  return apiFetch<PageResponse<ApiProductSummary>>(`/api/products?${search.toString()}`);
}

export function fetchFeaturedProducts() {
  return apiFetch<ApiProductSummary[]>("/api/products/featured");
}

export function fetchProductBySlug(slug: string) {
  return apiFetch<ApiProductDetail>(`/api/products/${encodeURIComponent(slug)}`);
}

export function fetchRelatedProducts(slug: string) {
  return apiFetch<ApiProductSummary[]>(`/api/products/${encodeURIComponent(slug)}/related`);
}

export function fetchReviews(slug: string, token?: string | null) {
  return apiFetch<PageResponse<ApiReview>>(`/api/products/${encodeURIComponent(slug)}/reviews`, { token });
}

export function upsertMyReview(slug: string, input: { rating: number; comment?: string }, token: string) {
  return apiFetch<ApiReview>(`/api/products/${encodeURIComponent(slug)}/reviews/me`, {
    method: "PUT",
    body: input,
    token
  });
}

export function deleteMyReview(slug: string, token: string) {
  return apiFetch<void>(`/api/products/${encodeURIComponent(slug)}/reviews/me`, {
    method: "DELETE",
    token
  });
}

// ---------------------------------------------------------------------------
// Server-side cart (authenticated users only)
// ---------------------------------------------------------------------------

export function fetchServerCart(token: string) {
  return apiFetch<ApiCart>("/api/cart", { token });
}

export function addServerCartItem(
  token: string,
  input: { productId: number; quantity: number; color?: string }
) {
  return apiFetch<ApiCart>("/api/cart/items", { method: "POST", body: input, token });
}

export function updateServerCartItem(token: string, itemId: number, quantity: number) {
  return apiFetch<ApiCart>(`/api/cart/items/${itemId}`, { method: "PATCH", body: { quantity }, token });
}

export function removeServerCartItem(token: string, itemId: number) {
  return apiFetch<ApiCart>(`/api/cart/items/${itemId}`, { method: "DELETE", token });
}

export function clearServerCart(token: string) {
  return apiFetch<ApiCart>("/api/cart", { method: "DELETE", token });
}

// ---------------------------------------------------------------------------
// Checkout / orders
// ---------------------------------------------------------------------------

export function checkout(
  input: {
    contactEmail?: string;
    shippingAddress: ApiShippingAddress;
    items: Array<{ productId: number; quantity: number; color?: string }>;
  },
  token?: string | null
) {
  return apiFetch<ApiOrder>("/api/orders", { method: "POST", body: input, token });
}

export function fetchOrderByNumber(orderNumber: string, token: string) {
  return apiFetch<ApiOrder>(`/api/orders/number/${encodeURIComponent(orderNumber)}`, { token });
}

export function fetchMyOrders(token: string) {
  return apiFetch<PageResponse<ApiOrder>>("/api/orders/me", { token });
}

// ---------------------------------------------------------------------------
// Contact
// ---------------------------------------------------------------------------

export function submitContactMessage(input: { name: string; email: string; subject: string; message: string }) {
  return apiFetch<{ id: number; createdAt: string }>("/api/contact", { method: "POST", body: input });
}
