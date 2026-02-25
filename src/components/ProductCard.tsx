import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/data/products';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  clubSlug: string;
}

export default function ProductCard({ product, clubSlug }: ProductCardProps) {
  return (
    <Link href={`/store/${clubSlug}/product/${product.id}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="relative aspect-square bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>
        <div className="p-3">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{product.brand}</p>
          <h3 className="text-sm font-semibold text-gray-800 mt-0.5 truncate">{product.name}</h3>
          <p className="text-sm font-bold text-gray-900 mt-1">
            från {formatPrice(product.price)}
          </p>
        </div>
      </div>
    </Link>
  );
}
