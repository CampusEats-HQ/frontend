# CampusEats API Reference

Base URL: `https://api.campuseats.ng/v1`

All protected endpoints require:
```
Authorization: Bearer <token>
Content-Type: application/json
```

Timestamps are ISO 8601 strings. Monetary values are numbers in Nigerian Naira (e.g. `45600` = ₦45,600).

---

## Table of Contents

1. [Auth](#1-auth)
2. [Restaurants](#2-restaurants)
3. [Orders — Customer](#3-orders--customer)
4. [Delivery Locations](#4-delivery-locations)
5. [Addresses](#5-addresses)
6. [Notifications](#6-notifications)
7. [Customer Profile](#7-customer-profile)
8. [Vendor — Dashboard & Orders](#8-vendor--dashboard--orders)
9. [Vendor — Menu](#9-vendor--menu)
10. [Vendor — Store, Analytics & Profile](#10-vendor--store-analytics--profile)
11. [Rider](#11-rider)
12. [Admin — Dashboard & Orders](#12-admin--dashboard--orders)
13. [Admin — People](#13-admin--people)
14. [Admin — Analytics & Finance](#14-admin--analytics--finance)

---

## 1. Auth

### POST /auth/customer/register
Register a new student customer account.

**Request**
```json
{
  "fullName": "John Doe",
  "email": "john.doe@gmail.com",
  "password": "secret123"
}
```

**Response 201**
```json
{
  "token": "<jwt>",
  "user": {
    "id": "usr_abc123",
    "fullName": "John Doe",
    "email": "john.doe@gmail.com"
  }
}
```

**Errors**
- `400` — missing required fields
- `409` — email already registered

---

### POST /auth/customer/login
Log in as a customer.

**Request**
```json
{
  "email": "john.doe@gmail.com",
  "password": "secret123"
}
```

**Response 200**
```json
{
  "token": "<jwt>",
  "user": {
    "id": "usr_abc123",
    "fullName": "John Doe",
    "email": "john.doe@gmail.com"
  }
}
```

**Errors**
- `401` — invalid credentials

---

### POST /auth/vendor/login
Log in as a vendor.

**Request**
```json
{
  "email": "mavise@campuseats.ng",
  "password": "secret123"
}
```

**Response 200**
```json
{
  "token": "<jwt>",
  "vendor": {
    "id": "V001",
    "name": "Mavise Grill",
    "category": "Rice & Swallow",
    "location": "Near Eni-Jokun Hostel",
    "isOpen": true
  }
}
```

**Errors**
- `401` — invalid credentials
- `403` — vendor account inactive

---

### POST /auth/rider/register
Submit a rider application. Does **not** grant immediate access — triggers admin approval flow.

**Request** — `multipart/form-data`
```
fullName      string   required
email         string   required
phone         string   required
matricNumber  string   required
bankName      string   required
accountNumber string   required  (10 digits)
photo         file     required  (image/jpeg or image/png)
```

**Response 201**
```json
{
  "message": "Application submitted. You will be notified once approved.",
  "applicationId": "PR001"
}
```

**Errors**
- `400` — missing fields or invalid matric format
- `409` — email already has a pending or active application

---

### POST /auth/rider/login
Log in as an approved rider.

**Request**
```json
{
  "email": "emeka@gmail.com",
  "password": "secret123"
}
```

**Response 200**
```json
{
  "token": "<jwt>",
  "rider": {
    "id": "R001",
    "name": "Emeka Obi",
    "email": "emeka@gmail.com",
    "phone": "+2348012345678",
    "rating": 4.9,
    "totalDeliveries": 124,
    "bankName": "GTBank",
    "accountNumber": "0123456789"
  }
}
```

**Errors**
- `401` — invalid credentials
- `403` — application still pending or rider suspended

---

### POST /auth/admin/login
Log in as an admin.

**Request**
```json
{
  "email": "admin@campuseats.ng",
  "password": "secret123"
}
```

**Response 200**
```json
{
  "token": "<jwt>",
  "admin": {
    "id": "adm_001",
    "name": "Platform Admin",
    "email": "admin@campuseats.ng",
    "role": "super_admin"
  }
}
```

**Errors**
- `401` — invalid credentials

---

## 2. Restaurants

### GET /restaurants
List all restaurants. Supports optional filtering.

**Query params**
| Param | Type | Description |
|-------|------|-------------|
| `category` | string | Filter by food category (e.g. `Rice`, `Shawarma`) |
| `search` | string | Search by restaurant name or food item |

**Response 200**
```json
{
  "restaurants": [
    {
      "id": "1",
      "name": "Mavise Grill",
      "category": "Rice & Swallow",
      "rating": 4.8,
      "deliveryTime": "12-18 min",
      "deliveryFee": 400,
      "image": "https://...",
      "isOpen": true
    }
  ]
}
```

---

### GET /restaurants/:id
Get full restaurant details including menu grouped by category.

**Response 200**
```json
{
  "id": "1",
  "name": "Mavise Grill",
  "category": "Rice & Swallow",
  "rating": 4.8,
  "reviewsCount": 238,
  "deliveryTime": "12-18 min",
  "deliveryFee": 400,
  "image": "https://...",
  "isOpen": true,
  "menu": [
    {
      "category": "RICE DISHES",
      "items": [
        {
          "id": "r1",
          "name": "Jollof Rice + Chicken",
          "description": "Party-style jollof with grilled chicken",
          "price": 1800,
          "image": "https://..."
        }
      ]
    }
  ]
}
```

**Errors**
- `404` — restaurant not found

---

### GET /restaurants/popular-items
Get popular items across all restaurants for the home feed.

**Response 200**
```json
{
  "items": [
    {
      "id": "r1",
      "name": "Jollof Rice + Chicken",
      "restaurant": "Mavise Grill",
      "restaurantId": "1",
      "price": 1800,
      "image": "https://..."
    }
  ]
}
```

---

## 3. Orders — Customer

### POST /orders
Place a new order. Cart is submitted here after payment method is selected.

**Request**
```json
{
  "items": [
    {
      "itemId": "r1",
      "name": "Jollof Rice + Chicken",
      "price": 1800,
      "quantity": 2,
      "restaurantId": "1"
    }
  ],
  "deliveryLocation": "Eni-Jokun Hostel",
  "paymentMethod": "card",
  "promoCode": "WELCOME10"
}
```

**Response 201**
```json
{
  "orderId": "ORD-1042",
  "status": "pending",
  "estimatedDeliveryTime": "25-35 min",
  "subtotal": 3600,
  "deliveryFee": 400,
  "discount": 360,
  "total": 3640
}
```

**Errors**
- `400` — empty items array or missing delivery location
- `402` — payment failed
- `404` — one or more items no longer available

---

### GET /orders
Get authenticated customer's order history.

**Response 200**
```json
{
  "orders": [
    {
      "id": "ORD-1042",
      "date": "2025-05-18",
      "time": "14:32",
      "restaurant": "Mavise Grill",
      "restaurantId": "1",
      "items": [
        { "name": "Jollof Rice + Chicken", "quantity": 2, "price": 1800 }
      ],
      "subtotal": 3600,
      "deliveryFee": 400,
      "total": 4000,
      "status": "delivered",
      "rider": "Emeka Obi"
    }
  ]
}
```

---

### GET /orders/:orderId
Get order detail and live tracking state.

**Response 200**
```json
{
  "id": "ORD-1042",
  "status": "on-the-way",
  "restaurant": "Mavise Grill",
  "items": [
    { "name": "Jollof Rice + Chicken", "quantity": 2, "price": 1800 }
  ],
  "deliveryLocation": "Eni-Jokun Hostel",
  "subtotal": 3600,
  "deliveryFee": 400,
  "total": 4000,
  "steps": [
    { "label": "Order Confirmed", "completed": true, "active": false },
    { "label": "Being Prepared", "completed": true, "active": false },
    { "label": "Rider on the way", "completed": false, "active": true },
    { "label": "Delivered", "completed": false, "active": false }
  ],
  "rider": {
    "name": "Emeka Obi",
    "phone": "+2348012345678",
    "rating": 4.9
  },
  "estimatedArrival": "~8 mins",
  "placedAt": "2025-05-18T14:32:00Z"
}
```

**Errors**
- `404` — order not found or does not belong to this customer

---

### POST /orders/apply-promo
Validate a promo code and return the discount.

**Request**
```json
{
  "code": "WELCOME10",
  "subtotal": 3600
}
```

**Response 200**
```json
{
  "valid": true,
  "discountPercent": 10,
  "discountAmount": 360,
  "newSubtotal": 3240
}
```

**Response 200 (invalid code)**
```json
{
  "valid": false,
  "message": "Promo code not found or expired"
}
```

---

## 4. Delivery Locations

### GET /delivery-locations
Get all available delivery zones (hostels) shown in the cart dropdown.

**Response 200**
```json
{
  "locations": [
    "Eni-Jokun Hostel",
    "Jaja Hostel",
    "Kofo Ademola Hostel",
    "Fabian House",
    "Madam Tinubu Hostel",
    "Moremi Hall",
    "Independence Hall",
    "Biobaku Hall",
    "Angola Hall",
    "Sultan Bello Hall"
  ]
}
```

---

## 5. Addresses

### GET /addresses
Get all saved addresses for the authenticated customer.

**Response 200**
```json
{
  "addresses": [
    {
      "id": "addr_001",
      "label": "Hostel",
      "name": "Fabian House",
      "details": "Room 204, Block A",
      "isDefault": true
    },
    {
      "id": "addr_002",
      "label": "Class",
      "name": "Faculty of Engineering",
      "details": "100 Level Block",
      "isDefault": false
    }
  ]
}
```

---

### POST /addresses
Add a new saved address.

**Request**
```json
{
  "label": "Hostel",
  "name": "Fabian House",
  "details": "Room 204, Block A"
}
```

**Response 201**
```json
{
  "id": "addr_003",
  "label": "Hostel",
  "name": "Fabian House",
  "details": "Room 204, Block A",
  "isDefault": false
}
```

**Errors**
- `400` — missing label, name, or details

---

### PUT /addresses/:id/default
Set an address as the default delivery location.

**Response 200**
```json
{
  "message": "Default address updated"
}
```

**Errors**
- `404` — address not found

---

### DELETE /addresses/:id
Delete a saved address.

**Response 200**
```json
{
  "message": "Address deleted"
}
```

**Errors**
- `404` — address not found

---

## 6. Notifications

### GET /notifications
Get all notifications for the authenticated customer.

**Response 200**
```json
{
  "unreadCount": 2,
  "notifications": [
    {
      "id": "notif_001",
      "type": "delivery",
      "title": "Order Delivered!",
      "message": "Your order from Mavise Grill has been delivered.",
      "time": "2025-05-18T14:55:00Z",
      "read": false
    },
    {
      "id": "notif_002",
      "type": "promo",
      "title": "Weekend Deal 🎉",
      "message": "Get 15% off all orders this Saturday. Use code SAT15.",
      "time": "2025-05-17T09:00:00Z",
      "read": true
    }
  ]
}
```

Notification `type` values: `delivery` | `order` | `promo` | `rating`

---

### PUT /notifications/read-all
Mark all notifications as read.

**Response 200**
```json
{
  "message": "All notifications marked as read"
}
```

---

### PUT /notifications/:id/read
Mark a single notification as read.

**Response 200**
```json
{
  "message": "Notification marked as read"
}
```

**Errors**
- `404` — notification not found

---

## 7. Customer Profile

### GET /profile
Get the authenticated customer's profile.

**Response 200**
```json
{
  "id": "usr_abc123",
  "fullName": "John Doe",
  "email": "john.doe@gmail.com",
  "phone": "+2348012345678"
}
```

---

### PUT /profile
Update customer profile details.

**Request**
```json
{
  "fullName": "John Doe",
  "phone": "+2348012345678"
}
```

**Response 200**
```json
{
  "id": "usr_abc123",
  "fullName": "John Doe",
  "phone": "+2348012345678"
}
```

---

## 8. Vendor — Dashboard & Orders

### GET /vendor/dashboard
Get vendor dashboard stats and store status. Protected — vendor token required.

**Response 200**
```json
{
  "isOpen": true,
  "todayOrders": 23,
  "todayRevenue": 45600,
  "pendingOrders": 3,
  "avgPrepTime": 15
}
```

---

### GET /vendor/orders
Get orders for the authenticated vendor.

**Query params**
| Param | Type | Description |
|-------|------|-------------|
| `status` | string | `pending` \| `preparing` \| `ready` \| `completed` |

**Response 200**
```json
{
  "orders": [
    {
      "id": "ORD-1050",
      "customerName": "Tunde Bello",
      "items": [
        { "name": "Jollof Rice + Chicken", "quantity": 1, "price": 1800 }
      ],
      "total": 2200,
      "status": "pending",
      "timestamp": "2025-05-18T14:32:00Z",
      "location": "Eni-Jokun Hostel",
      "riderName": null,
      "specialInstructions": "Extra pepper please"
    }
  ]
}
```

Order `status` values: `pending` | `preparing` | `ready` | `completed`

---

### PUT /vendor/orders/:id/status
Advance an order through the preparation flow.

**Request**
```json
{
  "status": "preparing"
}
```

**Response 200**
```json
{
  "id": "ORD-1050",
  "status": "preparing"
}
```

**Errors**
- `400` — invalid status transition
- `404` — order not found

---

## 9. Vendor — Menu

### GET /vendor/menu
Get all menu items for the authenticated vendor.

**Response 200**
```json
{
  "items": [
    {
      "id": "r1",
      "name": "Jollof Rice + Chicken",
      "description": "Party-style jollof with grilled chicken",
      "price": 1800,
      "category": "Rice",
      "image": "https://...",
      "available": true,
      "prepTime": "15 mins"
    }
  ]
}
```

---

### POST /vendor/menu
Add a new menu item. Requires `multipart/form-data`.

**Request** — `multipart/form-data`
```
name         string   required
description  string   optional
price        number   required
category     string   required  (Rice | Swallow | Drinks | Snacks | Pastries | Proteins)
prepTime     string   required  (5 mins | 10 mins | 15 mins | 20 mins | 25+ mins)
available    boolean  required
photo        file     optional  (image/jpeg or image/png)
```

**Response 201**
```json
{
  "id": "r5",
  "name": "Egusi Soup + Fufu",
  "description": "Rich egusi soup with fresh fufu",
  "price": 2000,
  "category": "Swallow",
  "image": "https://...",
  "available": true,
  "prepTime": "20 mins"
}
```

**Errors**
- `400` — missing name, price, category, or prepTime

---

### PUT /vendor/menu/:id
Update an existing menu item. Requires `multipart/form-data`.

**Request** — `multipart/form-data`
```
name         string   optional
description  string   optional
price        number   optional
category     string   optional
prepTime     string   optional
available    boolean  optional
photo        file     optional  (replaces existing image)
```

**Response 200**
```json
{
  "id": "r1",
  "name": "Jollof Rice + Chicken",
  "price": 1900,
  "available": true
}
```

**Errors**
- `404` — item not found

---

### DELETE /vendor/menu/:id
Delete a menu item.

**Response 200**
```json
{
  "message": "Menu item deleted"
}
```

**Errors**
- `404` — item not found

---

### PATCH /vendor/menu/:id/availability
Toggle a menu item's availability without a full update.

**Request**
```json
{
  "available": false
}
```

**Response 200**
```json
{
  "id": "r1",
  "available": false
}
```

---

## 10. Vendor — Store, Analytics & Profile

### PUT /vendor/status
Toggle the vendor store open or closed.

**Request**
```json
{
  "isOpen": false
}
```

**Response 200**
```json
{
  "isOpen": false
}
```

---

### GET /vendor/analytics
Get sales and performance analytics.

**Query params**
| Param | Type | Description |
|-------|------|-------------|
| `period` | string | `week` (default) \| `month` |

**Response 200**
```json
{
  "dailySales": [
    { "day": "Mon", "orders": 18, "revenue": 32400 },
    { "day": "Tue", "orders": 23, "revenue": 45600 }
  ],
  "peakHours": [
    { "hour": "12pm", "orders": 15 },
    { "hour": "1pm", "orders": 22 }
  ],
  "topItems": [
    { "name": "Jollof Rice + Chicken", "orders": 87, "revenue": 156600 }
  ],
  "orderSources": [
    { "name": "Direct", "value": 65 },
    { "name": "Reorders", "value": 35 }
  ]
}
```

---

### GET /vendor/earnings
Get earnings summary and payout history.

**Response 200**
```json
{
  "thisMonth": 180400,
  "thisWeek": 45600,
  "pendingSettlement": 32000,
  "dailyEarnings": [
    { "day": "Mon", "amount": 32400 }
  ],
  "transactions": [
    { "date": "2025-05-12", "orders": 21, "amount": 38000 }
  ]
}
```

---

### GET /vendor/profile
Get vendor profile details.

**Response 200**
```json
{
  "id": "V001",
  "name": "Mavise Grill",
  "category": "Rice & Swallow",
  "location": "Near Eni-Jokun Hostel",
  "image": "https://...",
  "contact": "+2348012345678",
  "bankAccount": "GTBank — 0123456789"
}
```

---

### PUT /vendor/profile
Update vendor profile details.

**Request**
```json
{
  "name": "Mavise Grill",
  "category": "Rice & Swallow",
  "location": "Near Eni-Jokun Hostel",
  "contact": "+2348012345678"
}
```

**Response 200**
```json
{
  "name": "Mavise Grill",
  "category": "Rice & Swallow",
  "location": "Near Eni-Jokun Hostel",
  "contact": "+2348012345678"
}
```

---

## 11. Rider

### GET /rider/stats
Get the authenticated rider's current stats.

**Response 200**
```json
{
  "deliveriesToday": 8,
  "earningsToday": 2400,
  "rating": 4.9,
  "earningsThisWeek": 12800
}
```

---

### PUT /rider/status
Toggle the rider's online/offline status.

**Request**
```json
{
  "isOnline": true
}
```

**Response 200**
```json
{
  "isOnline": true
}
```

---

### GET /rider/incoming-order
Poll for an incoming order assigned to this rider. Returns `null` when no order is pending.

> **Note:** This endpoint is designed for short-polling. A WebSocket event (`order.assigned`) is the preferred real-time alternative.

**Response 200 — order available**
```json
{
  "order": {
    "id": "ORD-1048",
    "restaurant": {
      "name": "Mavise Grill",
      "location": "Near Eni-Jokun Hostel"
    },
    "customer": {
      "name": "Tunde Bello",
      "phone": "+2348098765432",
      "location": "Eni-Jokun Hostel"
    },
    "items": ["Jollof Rice + Chicken x1", "Zobo Drink x2"],
    "distance": "4 min walk",
    "payout": 300,
    "expiresIn": 30
  }
}
```

**Response 200 — no order**
```json
{
  "order": null
}
```

---

### POST /rider/orders/:id/accept
Accept an incoming order.

**Response 200**
```json
{
  "delivery": {
    "id": "ORD-1048",
    "restaurant": {
      "name": "Mavise Grill",
      "location": "Near Eni-Jokun Hostel"
    },
    "customer": {
      "name": "Tunde Bello",
      "phone": "+2348098765432",
      "location": "Eni-Jokun Hostel"
    },
    "items": ["Jollof Rice + Chicken x1", "Zobo Drink x2"],
    "currentStep": 1
  }
}
```

**Errors**
- `409` — order already accepted by another rider or expired

---

### POST /rider/orders/:id/reject
Reject an incoming order.

**Response 200**
```json
{
  "message": "Order rejected"
}
```

---

### PUT /rider/delivery/step
Advance the active delivery to the next step.
- Step `1` → Rider is heading to the restaurant (default on accept)
- Step `2` → Rider has picked up food, heading to customer

**Request**
```json
{
  "step": 2
}
```

**Response 200**
```json
{
  "currentStep": 2
}
```

**Errors**
- `400` — no active delivery or invalid step value

---

### POST /rider/delivery/complete
Mark the active delivery as completed.

**Response 200**
```json
{
  "message": "Delivery completed",
  "earnings": 300
}
```

**Errors**
- `400` — no active delivery in progress

---

### GET /rider/earnings
Get rider earnings history.

**Response 200**
```json
{
  "earningsThisWeek": 12800,
  "history": [
    { "date": "2025-05-18", "deliveries": 8, "amount": 2400 },
    { "date": "2025-05-17", "deliveries": 6, "amount": 1800 }
  ]
}
```

---

### GET /rider/profile
Get the authenticated rider's profile.

**Response 200**
```json
{
  "id": "R001",
  "name": "Emeka Obi",
  "email": "emeka@gmail.com",
  "phone": "+2348012345678",
  "rating": 4.9,
  "totalDeliveries": 124,
  "bankName": "GTBank",
  "accountNumber": "0123456789"
}
```

---

### PUT /rider/bank
Update rider bank account details.

**Request**
```json
{
  "bankName": "Access Bank",
  "accountNumber": "0987654321"
}
```

**Response 200**
```json
{
  "bankName": "Access Bank",
  "accountNumber": "0987654321"
}
```

**Errors**
- `400` — account number must be 10 digits

---

## 12. Admin — Dashboard & Orders

### GET /admin/dashboard
Get live platform overview. Admin token required.

**Response 200**
```json
{
  "stats": {
    "liveOrders": 12,
    "onlineRiders": 8,
    "activeVendors": 15,
    "revenueToday": 145600
  },
  "liveOrders": [
    {
      "id": "ORD-1050",
      "customerName": "Tunde Bello",
      "restaurant": "Mavise Grill",
      "status": "preparing",
      "elapsedTime": 420,
      "needsRider": false,
      "riderName": "Emeka Obi"
    }
  ],
  "onlineRiders": [
    {
      "id": "R001",
      "name": "Emeka Obi",
      "rating": 4.9,
      "deliveriesToday": 8,
      "status": "delivering"
    }
  ]
}
```

Order `status` values: `pending` | `preparing` | `on-the-way` | `delivered`
Rider `status` values: `available` | `delivering`

---

### GET /admin/orders
Get all orders across the platform.

**Query params**
| Param | Type | Description |
|-------|------|-------------|
| `status` | string | `pending` \| `preparing` \| `on-the-way` \| `delivered` |

**Response 200**
```json
{
  "orders": [
    {
      "id": "ORD-1050",
      "customerName": "Tunde Bello",
      "restaurant": "Mavise Grill",
      "status": "pending",
      "elapsedTime": 60,
      "needsRider": true,
      "riderName": null
    }
  ]
}
```

---

### GET /admin/orders/unassigned
Get orders that are ready but have no rider assigned.

**Response 200**
```json
{
  "orders": [
    {
      "id": "ORD-1049",
      "customerName": "Amaka Osei",
      "restaurant": "Mama Put Kitchen",
      "items": ["Egusi Soup + Fufu x1"],
      "timestamp": "2025-05-18T13:45:00Z",
      "total": 2000
    }
  ]
}
```

---

### POST /admin/orders/:id/assign-rider
Assign an available rider to an unassigned order.

**Request**
```json
{
  "riderId": "R002"
}
```

**Response 200**
```json
{
  "orderId": "ORD-1049",
  "riderId": "R002",
  "riderName": "Chidi Nwosu"
}
```

**Errors**
- `400` — rider is not available
- `404` — order or rider not found

---

## 13. Admin — People

### GET /admin/riders
Get all riders, filtered by status.

**Query params**
| Param | Type | Description |
|-------|------|-------------|
| `status` | string | `active` \| `pending` \| `suspended` |

**Response 200 — active riders**
```json
{
  "riders": [
    {
      "id": "R001",
      "name": "Emeka Obi",
      "rating": 4.9,
      "totalDeliveries": 124,
      "deliveriesToday": 8,
      "status": "delivering",
      "lastActive": "Now"
    }
  ]
}
```

**Response 200 — pending riders**
```json
{
  "riders": [
    {
      "id": "PR001",
      "name": "Kola Adeyemi",
      "matricNumber": "190202001",
      "email": "kola@gmail.com",
      "phone": "+2348056781234",
      "bankName": "Access Bank",
      "accountNumber": "0123456789",
      "photo": "https://...",
      "submittedDate": "2025-05-15"
    }
  ]
}
```

---

### POST /admin/riders/:id/approve
Approve a pending rider application. Sends login credentials to the rider's email.

**Response 200**
```json
{
  "message": "Rider approved and credentials sent"
}
```

**Errors**
- `404` — application not found
- `409` — already approved

---

### POST /admin/riders/:id/reject
Reject a pending rider application.

**Request**
```json
{
  "reason": "Incomplete documentation"
}
```

**Response 200**
```json
{
  "message": "Application rejected"
}
```

---

### POST /admin/riders/:id/suspend
Suspend an active rider.

**Request**
```json
{
  "reason": "Multiple complaints received"
}
```

**Response 200**
```json
{
  "message": "Rider suspended"
}
```

---

### GET /admin/vendors
Get all vendors on the platform.

**Response 200**
```json
{
  "vendors": [
    {
      "id": "V001",
      "name": "Mavise Grill",
      "ownerName": "Mavise Adebayo",
      "status": "active",
      "ordersThisWeek": 87,
      "photo": "https://..."
    }
  ]
}
```

Vendor `status` values: `active` | `inactive`

---

### POST /admin/vendors
Create a new vendor account. Sends login credentials to the owner's email.

**Request**
```json
{
  "restaurantName": "Suya Spot",
  "ownerName": "Ade Salami",
  "ownerEmail": "ade@example.com",
  "ownerPhone": "+2348023456789",
  "location": "Near Moremi Hall",
  "bankName": "Zenith Bank",
  "accountNumber": "2109876543"
}
```

**Response 201**
```json
{
  "message": "Vendor account created and credentials sent",
  "vendorId": "V004"
}
```

**Errors**
- `409` — email already registered as a vendor

---

### PUT /admin/vendors/:id/status
Activate or deactivate a vendor.

**Request**
```json
{
  "status": "inactive"
}
```

**Response 200**
```json
{
  "id": "V001",
  "status": "inactive"
}
```

---

## 14. Admin — Analytics & Finance

### GET /admin/analytics
Get platform-wide analytics.

**Query params**
| Param | Type | Description |
|-------|------|-------------|
| `period` | string | `week` (default) \| `month` |

**Response 200**
```json
{
  "revenueGrowth": [
    { "month": "Jan", "revenue": 980000, "orders": 520 }
  ],
  "ordersByTime": [
    { "time": "12pm", "orders": 145 }
  ],
  "vendorPerformance": [
    { "name": "Mavise Grill", "orders": 312, "revenue": 561600 }
  ],
  "orderStatusDistribution": [
    { "name": "Delivered", "value": 87 },
    { "name": "Cancelled", "value": 5 },
    { "name": "In Progress", "value": 8 }
  ],
  "riderPerformance": [
    { "name": "Emeka Obi", "deliveries": 124, "rating": 4.9, "avgTime": "14 mins" }
  ],
  "customerGrowth": [
    { "week": "W1 May", "newUsers": 34, "totalUsers": 820 }
  ]
}
```

---

### GET /admin/finance
Get finance summary.

**Response 200**
```json
{
  "platformEarningsToday": 14560,
  "pendingPayouts": 320000,
  "settledThisWeek": 1200000
}
```

---

### GET /admin/finance/payouts/vendors
Get all vendors with pending settlement amounts.

**Response 200**
```json
{
  "payouts": [
    {
      "id": "pv_001",
      "vendorName": "Mavise Grill",
      "ordersSinceLastSettlement": 42,
      "amountOwed": 75600,
      "lastSettlementDate": "2025-05-16",
      "status": "pending"
    }
  ]
}
```

---

### GET /admin/finance/payouts/riders
Get all riders with pending settlement amounts.

**Response 200**
```json
{
  "payouts": [
    {
      "id": "pr_001",
      "riderName": "Emeka Obi",
      "deliveriesSinceLastSettlement": 24,
      "amountOwed": 7200,
      "lastSettlementDate": "2025-05-16",
      "status": "pending"
    }
  ]
}
```

---

### POST /admin/finance/payouts/:id/settle
Mark a payout as settled and generate a reference.

**Response 200**
```json
{
  "message": "Payout settled",
  "reference": "REF-2025-05-18-0042"
}
```

**Errors**
- `404` — payout not found
- `409` — already settled

---

### GET /admin/finance/settlements
Get settlement history.

**Query params**
| Param | Type | Description |
|-------|------|-------------|
| `period` | string | `today` \| `week` \| `month` \| `all` (default) |

**Response 200**
```json
{
  "settlements": [
    {
      "id": "SET-0042",
      "date": "2025-05-18",
      "recipientType": "Vendor",
      "recipientName": "Mavise Grill",
      "amount": 75600,
      "reference": "REF-2025-05-18-0042"
    }
  ]
}
```
