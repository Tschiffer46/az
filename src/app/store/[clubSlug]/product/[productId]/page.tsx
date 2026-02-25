import { notFound } from 'next/navigation';
import { getClubBySlug } from '@/data/clubs';
import { getProductById } from '@/data/products';
import ProductDetailClient from './ProductDetailClient';

interface PageProps {
  params: Promise<{ clubSlug: string; productId: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { clubSlug, productId } = await params;
  const club = getClubBySlug(clubSlug);
  if (!club) notFound();

  const product = getProductById(productId);
  if (!product) notFound();

  return <ProductDetailClient club={club} product={product} />;
}
