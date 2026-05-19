export const adminStats = {
  liveOrders: 12,
  onlineRiders: 8,
  activeVendors: 15,
  revenueToday: 145600,
};

export const liveOrders = [
  {
    id: 'ORD-1050',
    customerName: 'Tolu',
    restaurant: 'Mavise Grill',
    status: 'pending',
    elapsedTime: 45, // seconds
    needsRider: true,
  },
  {
    id: 'ORD-1049',
    customerName: 'Chioma',
    restaurant: 'Jollof Palace',
    status: 'preparing',
    elapsedTime: 180,
    riderName: 'Emeka',
  },
  {
    id: 'ORD-1048',
    customerName: 'Ahmed',
    restaurant: 'Suya Kingdom',
    status: 'on-the-way',
    elapsedTime: 420,
    riderName: 'Ngozi',
  },
  {
    id: 'ORD-1047',
    customerName: 'Blessing',
    restaurant: 'Mavise Grill',
    status: 'delivered',
    elapsedTime: 1200,
    riderName: 'Emeka',
  },
];

export const onlineRiders = [
  { id: 'R001', name: 'Emeka Okafor', rating: 4.9, deliveriesToday: 8, status: 'delivering' },
  { id: 'R002', name: 'Ngozi Adeyemi', rating: 4.8, deliveriesToday: 6, status: 'available' },
  { id: 'R003', name: 'Ibrahim Sule', rating: 4.7, deliveriesToday: 5, status: 'available' },
  { id: 'R004', name: 'Funke Daniels', rating: 4.9, deliveriesToday: 7, status: 'available' },
];

export const closedVendors = ['Eba & Egusi Spot', 'Quick Bites'];

export const pendingRiders = [
  {
    id: 'PR001',
    name: 'David Okoro',
    matricNumber: '180101001',
    email: 'david.okoro@students.unilag.edu.ng',
    phone: '+234 801 234 5678',
    bankName: 'GTBank',
    accountNumber: '0123456789',
    photo: 'https://i.pravatar.cc/150?img=12',
    submittedDate: '2026-05-17',
  },
  {
    id: 'PR002',
    name: 'Grace Eze',
    matricNumber: '180101002',
    email: 'grace.eze@students.unilag.edu.ng',
    phone: '+234 802 345 6789',
    bankName: 'Access Bank',
    accountNumber: '9876543210',
    photo: 'https://i.pravatar.cc/150?img=5',
    submittedDate: '2026-05-16',
  },
];

export const activeRiders = [
  {
    id: 'R001',
    name: 'Emeka Okafor',
    rating: 4.9,
    totalDeliveries: 234,
    deliveriesToday: 8,
    lastActive: 'Now',
  },
  {
    id: 'R002',
    name: 'Ngozi Adeyemi',
    rating: 4.8,
    totalDeliveries: 189,
    deliveriesToday: 6,
    lastActive: '2 mins ago',
  },
];

export const allVendors = [
  {
    id: 'V001',
    name: 'Mavise Grill',
    ownerName: 'Mrs. Adebayo',
    status: 'active',
    ordersThisWeek: 156,
    photo: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=100&h=100&fit=crop',
  },
  {
    id: 'V002',
    name: 'Jollof Palace',
    ownerName: 'Mr. Okonkwo',
    status: 'active',
    ordersThisWeek: 142,
    photo: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=100&h=100&fit=crop',
  },
  {
    id: 'V003',
    name: 'Suya Kingdom',
    ownerName: 'Alhaji Musa',
    status: 'inactive',
    ordersThisWeek: 0,
    photo: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=100&h=100&fit=crop',
  },
];

export const unassignedOrders = [
  {
    id: 'ORD-1050',
    customerName: 'Tolu',
    restaurant: 'Mavise Grill',
    items: ['2x Jollof Rice with Chicken', '1x Zobo'],
    timestamp: new Date(Date.now() - 45 * 1000),
    total: 2700,
  },
  {
    id: 'ORD-1051',
    customerName: 'Funmi',
    restaurant: 'Jollof Palace',
    items: ['1x Fried Rice Special'],
    timestamp: new Date(Date.now() - 120 * 1000),
    total: 1500,
  },
];

export const completedOrders = [
  {
    id: 'ORD-1047',
    customerName: 'Blessing',
    restaurant: 'Mavise Grill',
    riderName: 'Emeka',
    total: 1400,
    duration: '18 mins',
    completedAt: '2026-05-18 14:35',
  },
  {
    id: 'ORD-1046',
    customerName: 'David',
    restaurant: 'Suya Kingdom',
    riderName: 'Ngozi',
    total: 2200,
    duration: '16 mins',
    completedAt: '2026-05-18 14:20',
  },
];

export const financeStats = {
  platformEarningsToday: 45600,
  pendingPayouts: 128400,
  settledThisWeek: 456800,
};

export const vendorPayouts = [
  {
    id: 'V001',
    vendorName: 'Mavise Grill',
    ordersSinceLastSettlement: 42,
    amountOwed: 48600,
    lastSettlementDate: '2026-05-15',
    status: 'pending',
  },
  {
    id: 'V002',
    vendorName: 'Jollof Palace',
    ordersSinceLastSettlement: 38,
    amountOwed: 42800,
    lastSettlementDate: '2026-05-15',
    status: 'pending',
  },
  {
    id: 'V003',
    vendorName: 'Suya Kingdom',
    ordersSinceLastSettlement: 28,
    amountOwed: 31200,
    lastSettlementDate: '2026-05-15',
    status: 'pending',
  },
];

export const riderPayouts = [
  {
    id: 'R001',
    riderName: 'Emeka Okafor',
    deliveriesSinceLastSettlement: 52,
    amountOwed: 15600, // 52 × ₦300
    lastSettlementDate: '2026-05-16',
    status: 'pending',
  },
  {
    id: 'R002',
    riderName: 'Ngozi Adeyemi',
    deliveriesSinceLastSettlement: 48,
    amountOwed: 14400,
    lastSettlementDate: '2026-05-16',
    status: 'pending',
  },
  {
    id: 'R003',
    riderName: 'Ibrahim Sule',
    deliveriesSinceLastSettlement: 35,
    amountOwed: 10500,
    lastSettlementDate: '2026-05-16',
    status: 'pending',
  },
];

export const settlementHistory = [
  // Today (2026-05-18)
  {
    id: 'SET-1240',
    date: '2026-05-18',
    recipientType: 'Vendor',
    recipientName: 'Mavise Grill',
    amount: 85600,
    reference: 'REF-2026-05-18-V001',
  },
  {
    id: 'SET-1239',
    date: '2026-05-18',
    recipientType: 'Rider',
    recipientName: 'Ibrahim Sule',
    amount: 9300,
    reference: 'REF-2026-05-18-R003',
  },
  // This week (last 7 days)
  {
    id: 'SET-1238',
    date: '2026-05-17',
    recipientType: 'Vendor',
    recipientName: 'Jollof Palace',
    amount: 124500,
    reference: 'REF-2026-05-17-V002',
  },
  {
    id: 'SET-1237',
    date: '2026-05-16',
    recipientType: 'Rider',
    recipientName: 'Funke Daniels',
    amount: 10800,
    reference: 'REF-2026-05-16-R004',
  },
  {
    id: 'SET-1236',
    date: '2026-05-16',
    recipientType: 'Rider',
    recipientName: 'Emeka Okafor',
    amount: 12600,
    reference: 'REF-2026-05-16-R001',
  },
  {
    id: 'SET-1235',
    date: '2026-05-15',
    recipientType: 'Vendor',
    recipientName: 'Suya Kingdom',
    amount: 98400,
    reference: 'REF-2026-05-15-V003',
  },
  {
    id: 'SET-1234',
    date: '2026-05-15',
    recipientType: 'Vendor',
    recipientName: 'Mavise Grill',
    amount: 156400,
    reference: 'REF-2026-05-15-V001',
  },
  {
    id: 'SET-1233',
    date: '2026-05-14',
    recipientType: 'Rider',
    recipientName: 'Ngozi Adeyemi',
    amount: 11700,
    reference: 'REF-2026-05-14-R002',
  },
  {
    id: 'SET-1232',
    date: '2026-05-13',
    recipientType: 'Vendor',
    recipientName: 'Jollof Palace',
    amount: 142800,
    reference: 'REF-2026-05-13-V002',
  },
  // This month (older than 7 days)
  {
    id: 'SET-1231',
    date: '2026-05-08',
    recipientType: 'Vendor',
    recipientName: 'Mavise Grill',
    amount: 178900,
    reference: 'REF-2026-05-08-V001',
  },
  {
    id: 'SET-1230',
    date: '2026-05-07',
    recipientType: 'Rider',
    recipientName: 'Emeka Okafor',
    amount: 13500,
    reference: 'REF-2026-05-07-R001',
  },
  {
    id: 'SET-1229',
    date: '2026-05-05',
    recipientType: 'Vendor',
    recipientName: 'Suya Kingdom',
    amount: 89200,
    reference: 'REF-2026-05-05-V003',
  },
  {
    id: 'SET-1228',
    date: '2026-05-03',
    recipientType: 'Rider',
    recipientName: 'Ngozi Adeyemi',
    amount: 12000,
    reference: 'REF-2026-05-03-R002',
  },
  {
    id: 'SET-1227',
    date: '2026-05-01',
    recipientType: 'Vendor',
    recipientName: 'Jollof Palace',
    amount: 165300,
    reference: 'REF-2026-05-01-V002',
  },
  // Previous month (April)
  {
    id: 'SET-1226',
    date: '2026-04-29',
    recipientType: 'Vendor',
    recipientName: 'Mavise Grill',
    amount: 192400,
    reference: 'REF-2026-04-29-V001',
  },
  {
    id: 'SET-1225',
    date: '2026-04-25',
    recipientType: 'Rider',
    recipientName: 'Ibrahim Sule',
    amount: 11400,
    reference: 'REF-2026-04-25-R003',
  },
  {
    id: 'SET-1224',
    date: '2026-04-22',
    recipientType: 'Vendor',
    recipientName: 'Jollof Palace',
    amount: 158700,
    reference: 'REF-2026-04-22-V002',
  },
  {
    id: 'SET-1223',
    date: '2026-04-18',
    recipientType: 'Rider',
    recipientName: 'Emeka Okafor',
    amount: 14100,
    reference: 'REF-2026-04-18-R001',
  },
  {
    id: 'SET-1222',
    date: '2026-04-15',
    recipientType: 'Vendor',
    recipientName: 'Suya Kingdom',
    amount: 103600,
    reference: 'REF-2026-04-15-V003',
  },
];
