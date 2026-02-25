'use client';
import { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import CategoryFilter from '@/components/CategoryFilter';
import { Club } from '@/data/clubs';
import { Product } from '@/data/products';

interface StorefrontClientProps {
  club: Club;
  products: Product[];
}

export default function StorefrontClient({ club, products }: StorefrontClientProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filtered =
    selectedCategory === 'all'
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar club={club} />

      {/* Hero Banner */}
      <div
        className="relative h-48 sm:h-64 flex items-end"
        style={{
          background: `linear-gradient(135deg, ${club.primaryColor} 0%, ${club.primaryColor}cc 60%, ${club.secondaryColor}55 100%)`,
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `repeating-linear-gradient(45deg, ${club.secondaryColor} 0, ${club.secondaryColor} 1px, transparent 0, transparent 50%)`,
            backgroundSize: '20px 20px',
          }} />
        </div>
        <div className="relative px-4 pb-6 flex items-end gap-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black shadow-lg"
            style={{ backgroundColor: club.secondaryColor, color: club.primaryColor }}
          >
            {club.name.split(' ').map((w) => w.charAt(0)).join('')}
          </div>
          <div>
            <h1 className="text-white text-2xl font-bold">{club.name}</h1>
            <p className="text-white/80 text-sm">{club.description}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-5">
          <CategoryFilter
            selected={selectedCategory}
            onChange={setSelectedCategory}
            primaryColor={club.primaryColor}
            secondaryColor={club.secondaryColor}
          />
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">Inga produkter hittades</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} clubSlug={club.slug} />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-12 py-6 text-center text-gray-400 text-xs border-t border-gray-200">
        <p>Powered by <strong className="text-gray-600">Az</strong> — Club Commerce Platform</p>
      </footer>
    </div>
  );
}
