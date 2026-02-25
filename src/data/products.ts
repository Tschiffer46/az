export interface ProductVariant {
  id: string;
  name: string;
  color: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  description: string;
  sizes: string[];
  variants: ProductVariant[];
  image: string;
}

export const products: Product[] = [
  // T-SHIRTS
  {
    id: 'tshirt-basic',
    name: 'Basic-T',
    brand: 'Clique',
    category: 't-shirts',
    price: 249,
    description: 'Classic Clique Basic-T. Comfortable everyday t-shirt with club branding. Made from 100% ring-spun cotton for a soft feel.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    variants: [
      { id: 'navy', name: 'Navy', color: '#1a3a6b' },
      { id: 'white', name: 'White', color: '#ffffff' },
      { id: 'black', name: 'Black', color: '#000000' },
    ],
    image: 'https://picsum.photos/seed/tshirt-basic/400/400',
  },
  {
    id: 'tshirt-premium',
    name: 'Premium-T',
    brand: 'Clique',
    category: 't-shirts',
    price: 349,
    description: 'Clique Premium-T with superior finish. Moisture-wicking fabric keeps you cool during training sessions.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    variants: [
      { id: 'navy', name: 'Navy', color: '#1a3a6b' },
      { id: 'yellow', name: 'Yellow', color: '#e8c232' },
      { id: 'white', name: 'White', color: '#ffffff' },
    ],
    image: 'https://picsum.photos/seed/tshirt-premium/400/400',
  },

  // POLO
  {
    id: 'polo-classic',
    name: 'Classic Polo',
    brand: 'Clique',
    category: 'polo',
    price: 399,
    description: 'Clique Classic Polo shirt. Perfect for match days and club events. Slim fit with club embroidery.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    variants: [
      { id: 'navy', name: 'Navy', color: '#1a3a6b' },
      { id: 'white', name: 'White', color: '#ffffff' },
      { id: 'black', name: 'Black', color: '#000000' },
    ],
    image: 'https://picsum.photos/seed/polo-classic/400/400',
  },
  {
    id: 'polo-premium',
    name: 'Premium Polo',
    brand: 'Clique',
    category: 'polo',
    price: 499,
    description: 'Clique Premium Polo with stretch fabric. Excellent comfort and style for club representatives.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    variants: [
      { id: 'navy', name: 'Navy', color: '#1a3a6b' },
      { id: 'yellow', name: 'Yellow', color: '#e8c232' },
    ],
    image: 'https://picsum.photos/seed/polo-premium/400/400',
  },

  // HOODIES
  {
    id: 'hoodie-basic',
    name: 'Basic Hoodie',
    brand: 'Clique',
    category: 'hoodies',
    price: 599,
    description: 'Clique Basic Hoodie. Warm and cozy with kangaroo pocket and adjustable drawstring.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    variants: [
      { id: 'navy', name: 'Navy', color: '#1a3a6b' },
      { id: 'black', name: 'Black', color: '#000000' },
      { id: 'grey', name: 'Grey', color: '#888888' },
    ],
    image: 'https://picsum.photos/seed/hoodie-basic/400/400',
  },
  {
    id: 'hoodie-halfzip',
    name: 'Half-Zip Hoodie',
    brand: 'Clique',
    category: 'hoodies',
    price: 699,
    description: 'Clique Half-Zip Hoodie. Premium fleece with half-zip closure. Perfect for training and casual wear.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    variants: [
      { id: 'navy', name: 'Navy', color: '#1a3a6b' },
      { id: 'yellow', name: 'Yellow', color: '#e8c232' },
      { id: 'black', name: 'Black', color: '#000000' },
    ],
    image: 'https://picsum.photos/seed/hoodie-halfzip/400/400',
  },

  // JACKETS
  {
    id: 'jacket-softshell',
    name: 'Softshell Jacket',
    brand: 'Clique',
    category: 'jackets',
    price: 899,
    description: 'Clique Softshell Jacket. Wind and water resistant with breathable membrane. Ideal for outdoor training.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    variants: [
      { id: 'navy', name: 'Navy', color: '#1a3a6b' },
      { id: 'black', name: 'Black', color: '#000000' },
    ],
    image: 'https://picsum.photos/seed/jacket-softshell/400/400',
  },
  {
    id: 'jacket-padded',
    name: 'Padded Jacket',
    brand: 'Clique',
    category: 'jackets',
    price: 1099,
    description: 'Clique Padded Jacket. Warm and lightweight with club branding. Perfect for cold match days.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    variants: [
      { id: 'navy', name: 'Navy', color: '#1a3a6b' },
      { id: 'black', name: 'Black', color: '#000000' },
    ],
    image: 'https://picsum.photos/seed/jacket-padded/400/400',
  },

  // PANTS
  {
    id: 'pants-sweatpants',
    name: 'Sweatpants',
    brand: 'Clique',
    category: 'pants',
    price: 449,
    description: 'Clique Sweatpants. Comfortable training pants with elastic waistband and side pockets.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    variants: [
      { id: 'navy', name: 'Navy', color: '#1a3a6b' },
      { id: 'black', name: 'Black', color: '#000000' },
      { id: 'grey', name: 'Grey', color: '#888888' },
    ],
    image: 'https://picsum.photos/seed/pants-sweatpants/400/400',
  },
  {
    id: 'pants-shorts',
    name: 'Training Shorts',
    brand: 'Clique',
    category: 'pants',
    price: 299,
    description: 'Clique Training Shorts. Lightweight and breathable. Perfect for warm weather training.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    variants: [
      { id: 'navy', name: 'Navy', color: '#1a3a6b' },
      { id: 'black', name: 'Black', color: '#000000' },
      { id: 'yellow', name: 'Yellow', color: '#e8c232' },
    ],
    image: 'https://picsum.photos/seed/pants-shorts/400/400',
  },

  // ACCESSORIES
  {
    id: 'acc-cap',
    name: 'Club Cap',
    brand: 'Clique',
    category: 'accessories',
    price: 199,
    description: 'Clique Club Cap. Adjustable snapback with embroidered club logo. One size fits all.',
    sizes: ['One Size'],
    variants: [
      { id: 'navy', name: 'Navy', color: '#1a3a6b' },
      { id: 'black', name: 'Black', color: '#000000' },
    ],
    image: 'https://picsum.photos/seed/acc-cap/400/400',
  },
  {
    id: 'acc-beanie',
    name: 'Club Beanie',
    brand: 'Clique',
    category: 'accessories',
    price: 149,
    description: 'Clique Club Beanie. Warm knitted beanie with club colors. Perfect for cold weather.',
    sizes: ['One Size'],
    variants: [
      { id: 'navy', name: 'Navy', color: '#1a3a6b' },
      { id: 'yellow', name: 'Yellow', color: '#e8c232' },
      { id: 'black', name: 'Black', color: '#000000' },
    ],
    image: 'https://picsum.photos/seed/acc-beanie/400/400',
  },
  {
    id: 'acc-scarf',
    name: 'Club Scarf',
    brand: 'Clique',
    category: 'accessories',
    price: 179,
    description: 'Clique Club Scarf. Jacquard woven scarf with club colors and logo. Essential supporter gear.',
    sizes: ['One Size'],
    variants: [
      { id: 'navy-yellow', name: 'Navy/Yellow', color: '#1a3a6b' },
      { id: 'white-navy', name: 'White/Navy', color: '#ffffff' },
    ],
    image: 'https://picsum.photos/seed/acc-scarf/400/400',
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductsByIds(ids: string[]): Product[] {
  return products.filter((p) => ids.includes(p.id));
}

export const categories = [
  { id: 'all', label: 'All' },
  { id: 't-shirts', label: 'T-Shirts' },
  { id: 'polo', label: 'Polo' },
  { id: 'hoodies', label: 'Hoodies' },
  { id: 'jackets', label: 'Jackets' },
  { id: 'pants', label: 'Pants' },
  { id: 'accessories', label: 'Accessories' },
];
