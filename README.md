# Elevate — Premium Ecommerce Storefront
Elevate is a responsive front-end ecommerce storefront built with Next.js, React, TypeScript, and Tailwind CSS.
The project focuses on modern ecommerce UI design, responsive layouts, product-focused interfaces, cart functionality, and a polished checkout experience.

<img width="1898" height="908" alt="image" src="https://github.com/user-attachments/assets/d3a4b35b-35f9-46de-bb47-a0eb2b18c081" />

## Live Demo

https://elevate-storefront.vercel.app/

## Features

- Responsive ecommerce layout
- Product category filtering
- Product detail pages
- Shopping cart functionality
- Sandbox checkout flow
- Mobile-friendly navigation
- Responsive product grids
- Clean modern UI
- Dynamic cart state
- Reusable component structure

## Tech Stack

React • Next.js • TypeScript • Tailwind CSS • Framer Motion • Local Storage • Git • Vercel

## What I Practiced

- Building reusable ecommerce components
- Working with Next.js App Router
- Creating responsive layouts for mobile and desktop
- Managing cart state and product data
- Designing modern ecommerce UI patterns
- Structuring scalable front-end architecture
- Building a sandbox checkout experience
- Improving responsive image handling and layouts

## Screenshots

## Desktop View
<img width="1898" height="908" alt="image" src="https://github.com/user-attachments/assets/d3a4b35b-35f9-46de-bb47-a0eb2b18c081" />


## Shop Page
<img width="1899" height="914" alt="image" src="https://github.com/user-attachments/assets/7f51be46-ecfa-4308-8ded-dfaf44d961f2" />



## Cart & Checkout
<img width="1896" height="915" alt="image" src="https://github.com/user-attachments/assets/b65ad7c9-8d2e-4756-80ba-3c9050912490" />

<img width="1897" height="913" alt="image" src="https://github.com/user-attachments/assets/e47d623e-3caa-40a2-9c5a-bed01e1dc238" />

## Mobile View
<img width="475" height="761" alt="image" src="https://github.com/user-attachments/assets/717fab4b-d2a1-42c5-8949-1127f45dde49" />

<img width="471" height="760" alt="image" src="https://github.com/user-attachments/assets/15cf56aa-5652-4559-a2d9-6e323682f481" />

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

Clone the repository:

```bash
git clone https://github.com/Alvarez-J1/Elevate.git
```

Go into the project folder:

```bash
cd Elevate
```

Install dependencies:

```bash
npm install
```

```bash
Run the development server:
```

```bash
npm run dev

Open: http://localhost:3000 in your browser.
```

## Project Structure
```text
Elevate/
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx              # Root layout: Navbar, Footer, page shell
│  │  ├─ page.tsx                # Home page route: /
│  │  ├─ loading.tsx             # Global loading UI
│  │  ├─ globals.css             # Global styles / Tailwind
│  │  ├─ cart/
│  │  │  └─ page.tsx             # Cart route: /cart
│  │  ├─ checkout/
│  │  │  └─ page.tsx             # Checkout route: /checkout
│  │  ├─ shop/
│  │  │  └─ page.tsx             # Shop route: /shop
│  │  └─ product/
│  │     └─ [slug]/
│  │        └─ page.tsx          # Product detail route: /product/:slug
│  │
│  ├─ components/
│  │  ├─ layout/                 # Navbar, Footer
│  │  ├─ home/                   # Hero, featured products, categories
│  │  ├─ shop/                   # Shop filtering/sorting UI
│  │  ├─ product/                # Product cards, gallery, details, quantity
│  │  ├─ cart/                   # Cart page UI, line items, order summary
│  │  ├─ checkout/               # Checkout form/experience
│  │  ├─ ui/                     # Shared UI: button, container, skeleton, etc.
│  │  ├─ motion/                 # Animation helpers
│  │  └─ store/                  # Zustand cart store
│  │
│  ├─ lib/
│  │  ├─ products.ts             # Product/category data
│  │  └─ utils.ts                # Helpers like cn, formatCurrency, clamp
│  │
│  └─ types/
│     └─ product.ts              # Product and category TypeScript types
│
├─ package.json
├─ tsconfig.json
├─ next.config.ts
├─ eslint.config.mjs
└─ postcss.config.mjs
```

## Future Improvements

- Product search enhancements
- Improved animations and transitions
- Expanded product catalog
- Wishlist functionality
- Stripe integration
- Backend/API integration
- User authentication

## Author
Joel Alvarez
