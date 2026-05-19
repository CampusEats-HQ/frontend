export const riderStats = {
  deliveriesToday: 8,
  earningsToday: 2400,
  rating: 4.9,
  earningsThisWeek: 12800,
};

export const incomingOrder = {
  id: 'ORD-1048',
  restaurant: {
    name: 'Mavise Grill',
    location: 'Near Eni-Jokun Hostel',
  },
  customer: {
    name: 'Tolu',
    phone: '+234 801 234 5678',
    location: 'Fabian House, Block B',
  },
  items: [
    'Jollof Rice with Chicken',
    'Zobo (Chilled)',
  ],
  distance: '4 min walk',
  payout: 300,
  expiresIn: 15, // seconds
};

export const activeDelivery = {
  id: 'ORD-1048',
  restaurant: {
    name: 'Mavise Grill',
    location: 'Near Eni-Jokun Hostel',
  },
  customer: {
    name: 'Tolu',
    phone: '+234 801 234 5678',
    location: 'Fabian House, Block B',
  },
  items: [
    '2x Jollof Rice with Chicken',
    '1x Zobo (Chilled)',
  ],
  currentStep: 1, // 1 = going to restaurant, 2 = going to customer
};

export const earningsHistory = [
  { date: '2026-05-17', deliveries: 8, amount: 2400 },
  { date: '2026-05-16', deliveries: 12, amount: 3600 },
  { date: '2026-05-15', deliveries: 6, amount: 1800 },
  { date: '2026-05-14', deliveries: 10, amount: 3000 },
];

export const banks = [
  'Access Bank',
  'GTBank',
  'First Bank',
  'UBA',
  'Zenith Bank',
  'Ecobank',
  'Fidelity Bank',
  'Union Bank',
  'Stanbic IBTC',
  'Sterling Bank',
];
