export interface Club {
  id: string;
  slug: string;
  name: string;
  primaryColor: string;
  secondaryColor: string;
  logo: string;
  bannerImage: string;
  description: string;
  activeProductIds: string[];
}

export const clubs: Club[] = [
  {
    id: 'uif',
    slug: 'uppakra-if',
    name: 'Uppåkra IF',
    primaryColor: '#1a3a6b',
    secondaryColor: '#e8c232',
    logo: '/images/uif-logo.png',
    bannerImage: '/images/uif-banner.jpg',
    description: 'Uppåkra IF — Din lokala fotbollsklubb',
    activeProductIds: [
      'tshirt-basic',
      'tshirt-premium',
      'polo-classic',
      'polo-premium',
      'hoodie-basic',
      'hoodie-halfzip',
      'jacket-softshell',
      'jacket-padded',
      'pants-sweatpants',
      'pants-shorts',
      'acc-cap',
      'acc-beanie',
      'acc-scarf',
    ],
  },
];

export function getClubBySlug(slug: string): Club | undefined {
  return clubs.find((c) => c.slug === slug);
}
