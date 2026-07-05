# Store App

A complete e-commerce frontend built with React, React Router, Vite, and Tailwind CSS.

## Features

- Product grid with images, category, and price
- Search by product name
- Filter by category
- Sort by price
- Product detail page with quantity selector
- Cart page with quantity controls and item removal
- Cart persisted in the browser (local storage)
- Checkout page with a validated shipping and payment form
- Order confirmation page

## Setup

```
npm install
npm run dev
```

Then open the local address shown in the terminal (usually http://localhost:5173).

## Build for production

```
npm run build
```

The output goes to the `dist` folder.

## Structure

```
store-app/
  index.html
  package.json
  vite.config.js
  tailwind.config.js
  postcss.config.js
  src/
    main.jsx
    index.css
    App.jsx
    data/
      products.js
    context/
      CartContext.jsx
    components/
      Header.jsx
      Footer.jsx
    pages/
      Home.jsx
      ProductDetail.jsx
      Cart.jsx
      Checkout.jsx
      OrderSuccess.jsx
```

## Pages

- `/` — product listing, search, filter, sort
- `/product/:id` — product detail
- `/cart` — cart contents
- `/checkout` — shipping and payment form
- `/order-success` — confirmation after placing an order
