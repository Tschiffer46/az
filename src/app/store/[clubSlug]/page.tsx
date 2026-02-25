import { notFound } from 'next/navigation';
import { getClubBySlug } from '@/data/clubs';
import { getProductsByIds } from '@/data/products';
import StorefrontClient from './StorefrontClient';

interface PageProps {
  params: Promise<{ clubSlug: string }>;
}

export default async function StorePage({ params }: PageProps) {
  const { clubSlug } = await params;
  const club = getClubBySlug(clubSlug);
  if (!club) notFound();

  const products = getProductsByIds(club.activeProductIds);

  return <StorefrontClient club={club} products={products} />;
}
