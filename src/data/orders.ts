export interface OrderItem {
  productId: string;
  productName: string;
  size: string;
  variant: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  clubId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  total: number;
  deliveryType: 'home' | 'club';
  address?: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
  paymentMethod: 'swish' | 'klarna';
}

export const mockOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    clubId: 'uif',
    customerName: 'Erik Andersson',
    customerEmail: 'erik.andersson@email.com',
    items: [
      { productId: 'tshirt-basic', productName: 'Basic-T', size: 'L', variant: 'Navy', quantity: 2, price: 249 },
      { productId: 'hoodie-basic', productName: 'Basic Hoodie', size: 'L', variant: 'Navy', quantity: 1, price: 599 },
    ],
    total: 1097,
    deliveryType: 'home',
    address: 'Storgatan 12, 245 31 Staffanstorp',
    status: 'delivered',
    createdAt: '2024-11-01T10:23:00Z',
    paymentMethod: 'swish',
  },
  {
    id: 'ORD-2024-002',
    clubId: 'uif',
    customerName: 'Maria Svensson',
    customerEmail: 'maria.svensson@email.com',
    items: [
      { productId: 'polo-classic', productName: 'Classic Polo', size: 'M', variant: 'Navy', quantity: 1, price: 399 },
      { productId: 'acc-cap', productName: 'Club Cap', size: 'One Size', variant: 'Navy', quantity: 1, price: 199 },
    ],
    total: 598,
    deliveryType: 'club',
    status: 'delivered',
    createdAt: '2024-11-03T14:10:00Z',
    paymentMethod: 'klarna',
  },
  {
    id: 'ORD-2024-003',
    clubId: 'uif',
    customerName: 'Lars Nilsson',
    customerEmail: 'lars.nilsson@email.com',
    items: [
      { productId: 'jacket-softshell', productName: 'Softshell Jacket', size: 'XL', variant: 'Navy', quantity: 1, price: 899 },
      { productId: 'pants-sweatpants', productName: 'Sweatpants', size: 'XL', variant: 'Navy', quantity: 1, price: 449 },
    ],
    total: 1348,
    deliveryType: 'home',
    address: 'Parkvägen 8, 245 45 Hjärup',
    status: 'shipped',
    createdAt: '2024-11-08T09:45:00Z',
    paymentMethod: 'klarna',
  },
  {
    id: 'ORD-2024-004',
    clubId: 'uif',
    customerName: 'Anna Johansson',
    customerEmail: 'anna.johansson@email.com',
    items: [
      { productId: 'tshirt-premium', productName: 'Premium-T', size: 'S', variant: 'Yellow', quantity: 1, price: 349 },
      { productId: 'acc-beanie', productName: 'Club Beanie', size: 'One Size', variant: 'Navy', quantity: 1, price: 149 },
    ],
    total: 498,
    deliveryType: 'club',
    status: 'delivered',
    createdAt: '2024-11-10T16:30:00Z',
    paymentMethod: 'swish',
  },
  {
    id: 'ORD-2024-005',
    clubId: 'uif',
    customerName: 'Peter Gustafsson',
    customerEmail: 'peter.gustafsson@email.com',
    items: [
      { productId: 'hoodie-halfzip', productName: 'Half-Zip Hoodie', size: 'M', variant: 'Navy', quantity: 1, price: 699 },
      { productId: 'polo-premium', productName: 'Premium Polo', size: 'M', variant: 'Navy', quantity: 1, price: 499 },
    ],
    total: 1198,
    deliveryType: 'home',
    address: 'Idrottsvägen 3, 245 32 Staffanstorp',
    status: 'processing',
    createdAt: '2024-11-15T11:20:00Z',
    paymentMethod: 'klarna',
  },
  {
    id: 'ORD-2024-006',
    clubId: 'uif',
    customerName: 'Sofia Lindqvist',
    customerEmail: 'sofia.lindqvist@email.com',
    items: [
      { productId: 'acc-scarf', productName: 'Club Scarf', size: 'One Size', variant: 'Navy/Yellow', quantity: 2, price: 179 },
      { productId: 'acc-cap', productName: 'Club Cap', size: 'One Size', variant: 'Navy', quantity: 1, price: 199 },
    ],
    total: 557,
    deliveryType: 'club',
    status: 'delivered',
    createdAt: '2024-11-18T13:55:00Z',
    paymentMethod: 'swish',
  },
  {
    id: 'ORD-2024-007',
    clubId: 'uif',
    customerName: 'Mikael Persson',
    customerEmail: 'mikael.persson@email.com',
    items: [
      { productId: 'jacket-padded', productName: 'Padded Jacket', size: 'L', variant: 'Navy', quantity: 1, price: 1099 },
    ],
    total: 1099,
    deliveryType: 'home',
    address: 'Bollgatan 5, 245 33 Staffanstorp',
    status: 'shipped',
    createdAt: '2024-11-22T08:30:00Z',
    paymentMethod: 'klarna',
  },
  {
    id: 'ORD-2024-008',
    clubId: 'uif',
    customerName: 'Emma Carlsson',
    customerEmail: 'emma.carlsson@email.com',
    items: [
      { productId: 'tshirt-basic', productName: 'Basic-T', size: 'XS', variant: 'White', quantity: 3, price: 249 },
      { productId: 'pants-shorts', productName: 'Training Shorts', size: 'S', variant: 'Navy', quantity: 1, price: 299 },
    ],
    total: 1046,
    deliveryType: 'club',
    status: 'delivered',
    createdAt: '2024-11-25T15:40:00Z',
    paymentMethod: 'swish',
  },
  {
    id: 'ORD-2024-009',
    clubId: 'uif',
    customerName: 'Johan Magnusson',
    customerEmail: 'johan.magnusson@email.com',
    items: [
      { productId: 'polo-classic', productName: 'Classic Polo', size: 'XL', variant: 'Navy', quantity: 1, price: 399 },
      { productId: 'hoodie-basic', productName: 'Basic Hoodie', size: 'XL', variant: 'Black', quantity: 1, price: 599 },
      { productId: 'acc-beanie', productName: 'Club Beanie', size: 'One Size', variant: 'Yellow', quantity: 1, price: 149 },
    ],
    total: 1147,
    deliveryType: 'home',
    address: 'Skolvägen 14, 245 41 Staffanstorp',
    status: 'delivered',
    createdAt: '2024-12-01T10:10:00Z',
    paymentMethod: 'klarna',
  },
  {
    id: 'ORD-2024-010',
    clubId: 'uif',
    customerName: 'Karin Eriksson',
    customerEmail: 'karin.eriksson@email.com',
    items: [
      { productId: 'tshirt-premium', productName: 'Premium-T', size: 'M', variant: 'Navy', quantity: 2, price: 349 },
    ],
    total: 698,
    deliveryType: 'club',
    status: 'processing',
    createdAt: '2024-12-03T12:00:00Z',
    paymentMethod: 'swish',
  },
  {
    id: 'ORD-2024-011',
    clubId: 'uif',
    customerName: 'Anders Bergström',
    customerEmail: 'anders.bergstrom@email.com',
    items: [
      { productId: 'jacket-softshell', productName: 'Softshell Jacket', size: 'M', variant: 'Black', quantity: 1, price: 899 },
      { productId: 'pants-sweatpants', productName: 'Sweatpants', size: 'M', variant: 'Black', quantity: 1, price: 449 },
      { productId: 'acc-cap', productName: 'Club Cap', size: 'One Size', variant: 'Black', quantity: 1, price: 199 },
    ],
    total: 1547,
    deliveryType: 'home',
    address: 'Furugatan 22, 245 34 Staffanstorp',
    status: 'pending',
    createdAt: '2024-12-05T09:15:00Z',
    paymentMethod: 'klarna',
  },
  {
    id: 'ORD-2024-012',
    clubId: 'uif',
    customerName: 'Lina Olsson',
    customerEmail: 'lina.olsson@email.com',
    items: [
      { productId: 'hoodie-halfzip', productName: 'Half-Zip Hoodie', size: 'S', variant: 'Yellow', quantity: 1, price: 699 },
      { productId: 'acc-scarf', productName: 'Club Scarf', size: 'One Size', variant: 'Navy/Yellow', quantity: 1, price: 179 },
    ],
    total: 878,
    deliveryType: 'club',
    status: 'processing',
    createdAt: '2024-12-06T14:25:00Z',
    paymentMethod: 'swish',
  },
  {
    id: 'ORD-2024-013',
    clubId: 'uif',
    customerName: 'Tobias Hansson',
    customerEmail: 'tobias.hansson@email.com',
    items: [
      { productId: 'polo-premium', productName: 'Premium Polo', size: 'L', variant: 'Yellow', quantity: 1, price: 499 },
      { productId: 'pants-shorts', productName: 'Training Shorts', size: 'L', variant: 'Black', quantity: 2, price: 299 },
    ],
    total: 1097,
    deliveryType: 'home',
    address: 'Ljungvägen 7, 245 45 Hjärup',
    status: 'pending',
    createdAt: '2024-12-07T16:50:00Z',
    paymentMethod: 'klarna',
  },
  {
    id: 'ORD-2024-014',
    clubId: 'uif',
    customerName: 'Helena Ström',
    customerEmail: 'helena.strom@email.com',
    items: [
      { productId: 'tshirt-basic', productName: 'Basic-T', size: 'M', variant: 'Black', quantity: 1, price: 249 },
      { productId: 'acc-beanie', productName: 'Club Beanie', size: 'One Size', variant: 'Black', quantity: 1, price: 149 },
      { productId: 'acc-cap', productName: 'Club Cap', size: 'One Size', variant: 'Navy', quantity: 1, price: 199 },
    ],
    total: 597,
    deliveryType: 'club',
    status: 'pending',
    createdAt: '2024-12-08T11:05:00Z',
    paymentMethod: 'swish',
  },
  {
    id: 'ORD-2024-015',
    clubId: 'uif',
    customerName: 'Oskar Lindgren',
    customerEmail: 'oskar.lindgren@email.com',
    items: [
      { productId: 'jacket-padded', productName: 'Padded Jacket', size: 'M', variant: 'Black', quantity: 1, price: 1099 },
      { productId: 'hoodie-basic', productName: 'Basic Hoodie', size: 'M', variant: 'Grey', quantity: 1, price: 599 },
    ],
    total: 1698,
    deliveryType: 'home',
    address: 'Ekvägen 19, 245 32 Staffanstorp',
    status: 'pending',
    createdAt: '2024-12-08T17:30:00Z',
    paymentMethod: 'klarna',
  },
];
