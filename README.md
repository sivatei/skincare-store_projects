# Skincare Store

A React-based skincare e-commerce frontend built with Vite and Tailwind CSS. The application lives in the `store-app/` directory.

## Features
- Product listing with images, categories, and prices
- Search by product name
- Filter by category
- Sort products by price
- Product detail page with quantity selection
- Shopping cart with quantity updates and item removal
- Cart persistence using browser local storage
- Checkout form with validation
- Order confirmation page

## Tech stack
- React 18
- Vite
- React Router
- Tailwind CSS

## Run locally
```bash
cd store-app
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

## Build
```bash
cd store-app
npm run build
```

The source is organized under `store-app/src/`, including components, cart context, product data, and page components.

This is a frontend learning project demonstrating product browsing, cart state management, and a checkout flow. The checkout interface is a demonstration and should not be treated as a real payment integration unless a payment provider is configured.
