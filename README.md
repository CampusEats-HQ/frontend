# CampusEats

A multi-portal food delivery platform built for campus environments. CampusEats connects students with campus vendors and delivery riders through a unified web application.

## Overview

The platform serves four distinct user roles, each with its own portal:

| Portal | Description |
|--------|-------------|
| **Customer** | Browse restaurants, place orders, track deliveries in real-time |
| **Vendor** | Manage menus, fulfill orders, view analytics and earnings |
| **Rider** | Accept deliveries, track active jobs, monitor earnings |
| **Admin** | Oversee the platform, manage users, view finance and analytics |

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build tool:** Vite
- **Styling:** Tailwind CSS v4, shadcn/ui, Radix UI
- **Routing:** React Router v7
- **Charts:** Recharts
- **Animations:** Motion
- **Forms:** React Hook Form
- **Package manager:** npm

## Getting Started

### Prerequisites

- Node.js 18+

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build

```bash
npm run build
```

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   └── ui/          # Reusable UI components (shadcn/ui)
│   ├── context/         # React Context providers (Cart, Vendor, Rider)
│   ├── data/            # Mock data for all portals
│   ├── screens/
│   │   ├── admin/       # Admin portal screens
│   │   ├── rider/       # Rider portal screens
│   │   ├── vendor/      # Vendor portal screens
│   │   └── *.tsx        # Customer-facing screens
│   ├── App.tsx
│   └── routes.tsx
├── styles/              # Global styles and theme tokens
└── main.tsx
```

## Screens

### Customer (14 screens)
Splash → Login / Sign Up → Home → Restaurant → Cart → Payment → Order Tracking → Order Success → Order History → Profile → Notifications → Saved Addresses → Help

### Vendor (9 screens)
Login → Dashboard → Orders → Order Detail → Menu → Menu Edit → Analytics → Earnings → Profile

### Rider (7 screens)
Login → Sign Up → Home → Order Alert → Active Delivery → Earnings → Profile

### Admin (6 screens)
Login → Dashboard → Orders → People → Analytics → Finance

## Attributions

See [ATTRIBUTIONS.md](./ATTRIBUTIONS.md) for third-party licenses.
