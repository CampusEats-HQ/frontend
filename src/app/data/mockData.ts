export const restaurants = [
  {
    id: '1',
    name: 'Mavise Grill',
    rating: 4.8,
    deliveryTime: '12-18 min',
    deliveryFee: 400,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
  },
  {
    id: '2',
    name: 'Jollof Palace',
    rating: 4.9,
    deliveryTime: '15-20 min',
    deliveryFee: 400,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
  },
  {
    id: '3',
    name: 'Suya Kingdom',
    rating: 4.7,
    deliveryTime: '10-15 min',
    deliveryFee: 300,
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop',
  },
  {
    id: '4',
    name: 'Eba & Egusi Spot',
    rating: 4.6,
    deliveryTime: '18-25 min',
    deliveryFee: 500,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
  },
];

export const menuItems = {
  '1': [
    {
      category: 'RICE DISHES',
      items: [
        {
          id: 'r1',
          name: 'Jollof Rice with Chicken',
          description: 'Smoky jollof with grilled chicken',
          price: 1200,
          image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=200&h=200&fit=crop',
        },
        {
          id: 'r2',
          name: 'Fried Rice Special',
          description: 'Mixed veggies, chicken & shrimp',
          price: 1500,
          image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=200&h=200&fit=crop',
        },
      ],
    },
    {
      category: 'SWALLOW',
      items: [
        {
          id: 'r3',
          name: 'Eba & Egusi Soup',
          description: 'Fresh eba with rich egusi',
          price: 800,
          image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop',
        },
      ],
    },
    {
      category: 'DRINKS',
      items: [
        {
          id: 'r4',
          name: 'Zobo (Chilled)',
          description: 'Fresh hibiscus drink',
          price: 300,
          image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=200&h=200&fit=crop',
        },
      ],
    },
  ],
};

export const popularItems = [
  {
    id: 'p1',
    name: 'Beef Shawarma',
    restaurant: 'Mavise Grill',
    price: 1000,
    image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=200&h=200&fit=crop',
  },
  {
    id: 'p2',
    name: 'Puff Puff (6pcs)',
    restaurant: 'Snack Corner',
    price: 200,
    image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=200&h=200&fit=crop',
  },
  {
    id: 'p3',
    name: 'Indomie Special',
    restaurant: 'Quick Bites',
    price: 500,
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&h=200&fit=crop',
  },
  {
    id: 'p4',
    name: 'Moi Moi',
    restaurant: 'Jollof Palace',
    price: 300,
    image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=200&h=200&fit=crop',
  },
];

export const categories = [
  'All',
  'Rice',
  'Swallow',
  'Soup',
  'Proteins',
  'Beans',
  'Yam & Plantain',
  'Shawarma',
  'Burger',
  'Snacks',
  'Pastries',
  'Drinks',
];

export const hostels = [
  'Eni-Jokun Hostel',
  'Jaja Hostel',
  'Kofo Ademola Hostel',
  'El-Kanemi Hostel',
  'Makama Bida Hostel',
  'Fagunwa Hostel',
  'Biobaku Hostel',
  'Engineering Faculty',
  'Sciences Faculty',
  'Arts Building',
];
