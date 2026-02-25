import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getClubBySlug } from '@/data/clubs';
import { getProductsByIds, getProductsByCategory, getCategoryById } from '@/data/products';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';

interface PageProps {
  params: Promise<{ clubSlug: string; categoryId: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { clubSlug, categoryId } = await params;
  const club = getClubBySlug(clubSlug);
  if (!club) notFound();

  const category = getCategoryById(categoryId);
  if (!category) notFound();

  const clubProducts = getProductsByIds(club.activeProductIds);
  const products = clubProducts.filter((p) => p.category === categoryId);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f0f7f2' }}>
      <Navbar club={club} />

      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link href={`/store/${club.slug}`} className="hover:underline" style={{ color: '#217A3F' }}>
            Klubbshop
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">{category.label}</span>
        </nav>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">{category.label}</h1>

        {products.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">Inga produkter hittades i denna kategori</p>
            <Link
              href={`/store/${club.slug}`}
              className="mt-4 inline-block text-sm font-medium underline"
              style={{ color: '#217A3F' }}
            >
              Tillbaka till butiken
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} clubSlug={club.slug} />
            ))}
          </div>
        )}
      </div>

      <footer className="py-6 text-center text-gray-400 text-xs border-t border-gray-200">
        <p>Powered by <strong className="text-gray-600">Az</strong> — Club Commerce Platform</p>
      </footer>
    </div>
  );
}
