# Lucky Couture — Frontend

A premium boutique & tailoring marketplace frontend, built with React 19 + Vite.

## Tech Stack

- React 19 + Vite
- React Router DOM v6
- Framer Motion (animations)
- Lucide React (icons)
- Axios (API client, pre-wired for a future backend)
- React Hook Form (forms & validation)
- Context API (Auth, Cart, Wishlist state)
- Plain CSS per component (BEM-style class names), design tokens in `src/styles/variables.css`

This is a **frontend-only** project. It does not include a backend. All data (products,
gallery designs, testimonials) is defined in `src/utils/constants.js` for now, and the
`src/services/` layer is already wired to call a Node.js + Express + MongoDB API once
one is available (see below).

## Getting Started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

To create a production build:

```bash
npm run build
npm run preview
```

## Connecting a Backend

Copy `.env.example` to `.env` and set `VITE_API_URL` to your backend's base URL:

```
VITE_API_URL=http://localhost:5000/api
```

`src/services/api.js` is an Axios instance with an auth-token interceptor already in
place. `src/services/authService.js` defines the calls the login/signup pages and
tailoring order form are expected to eventually use — swap the demo logic in
`AuthContext.jsx` and the `Tailoring` / `Cart` pages for these calls once the backend
exists.

## Project Structure

```
frontend/
  public/
  src/
    assets/          images, icons, logo, video placeholders
    components/       reusable UI: Navbar, Footer, Hero, About, Services,
                       Gallery, ProductCard, Testimonials, FAQ, ScrollTop,
                       Loader, ProtectedRoute
    pages/            one folder per route (Home, Gallery, Tailoring, Shop,
                       Cart, Wishlist, Orders, Profile, About, Contact,
                       Login, Signup, NotFound)
    layouts/          MainLayout (Navbar + Footer + ScrollTop wrapper)
    routes/           AppRoutes.jsx — all route definitions, lazy loaded
    hooks/            useCounter, useInView, useScrollPosition
    context/          AuthContext, CartContext, WishlistContext
    services/         api.js (Axios instance), authService.js
    utils/            constants.js (demo data), helpers.js
    styles/           variables.css (design tokens), global.css
    App.jsx
    main.jsx
    index.css
```

## Notes on Demo Data

- Products, gallery designs, testimonials, and FAQs live in `src/utils/constants.js`.
- Cart, Wishlist, and the logged-in user persist to `localStorage` so state survives a
  page refresh.
- The Tailoring booking form's "expected delivery date" is calculated client-side in
  `src/utils/helpers.js` (`estimateDeliveryDate`) based on a daily stitching capacity of
  4 orders — replace the `pendingOrdersToday` placeholder in `Tailoring.jsx` with a real
  count from the backend once available.
- Coupon codes `LUCKY10` and `WELCOME15` work in the Cart for demo purposes.

## Design Tokens

All colors, fonts, radii, and shadows are defined once in `src/styles/variables.css`
and consumed everywhere via CSS custom properties, e.g. `var(--color-primary)`.
