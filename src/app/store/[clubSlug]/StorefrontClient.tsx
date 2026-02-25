'use client';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import { Club } from '@/data/clubs';
import { Product, Category, categories } from '@/data/products';

interface StorefrontClientProps {
  club: Club;
  products: Product[];
}

export default function StorefrontClient({ club, products }: StorefrontClientProps) {
  function countForCategory(cat: Category): number {
    return products.filter((p) => p.category === cat.id).length;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f0f7f2' }}>
      <Navbar club={club} />

      {/* Hero Banner */}
      <div
        className="relative flex flex-col items-center justify-center py-12 px-4 text-center"
        style={{
          background: `linear-gradient(160deg, #0d2818 0%, #217A3F 60%, #0d2818 100%)`,
          backgroundImage: `
            linear-gradient(160deg, #0d2818 0%, #217A3F 60%, #0d2818 100%),
            repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 2px, transparent 2px, transparent 12px)
          `,
        }}
      >
        {/* Subtle diamond texture overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)`,
            backgroundSize: '18px 18px',
          }}
        />
        <div className="relative z-10 flex flex-col items-center gap-3">
          {/* Shield logo placeholder */}
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center shadow-xl border-4 border-white/20"
            style={{ backgroundColor: '#0d2818' }}
          >
            <span className="text-white font-black text-xl tracking-tight">UIF</span>
          </div>
          <h1 className="text-white text-3xl font-extrabold tracking-tight mt-1">
            Klubbshop Uppåkra IF
          </h1>
          <p className="text-white/80 text-base max-w-sm">
            {club.description}
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-5xl mx-auto px-4 py-8 flex gap-6">
        {/* Sidebar (desktop only) */}
        <aside className="hidden lg:block w-52 shrink-0">
          <div className="bg-white rounded-xl shadow-sm p-4 sticky top-20">
            <h2 className="text-sm font-bold text-gray-700 uppercase tracking-wide mb-3">Kategorier</h2>
            <ul className="space-y-1">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/store/${club.slug}/category/${cat.id}`}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-white transition-colors"
                    style={{}}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#217A3F';
                      (e.currentTarget as HTMLAnchorElement).style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '';
                      (e.currentTarget as HTMLAnchorElement).style.color = '';
                    }}
                  >
                    <span>{cat.label}</span>
                    <span className="text-xs text-gray-400">{countForCategory(cat)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Category grid */}
        <main className="flex-1">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Välj kategori</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {categories.map((cat) => {
              const count = countForCategory(cat);
              return (
                <Link
                  key={cat.id}
                  href={`/store/${club.slug}/category/${cat.id}`}
                  className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div className="relative aspect-square w-full bg-gray-50">
                    <Image
                      src={cat.image}
                      alt={cat.label}
                      fill
                      className="object-contain p-4"
                      sizes="(max-width: 640px) 50vw, 33vw"
                    />
                  </div>
                  <div className="px-3 py-3">
                    <p className="font-bold text-gray-800 text-sm group-hover:text-green-700 transition-colors">{cat.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{count} {count === 1 ? 'produkt' : 'produkter'}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="mt-12 py-6 text-center text-gray-400 text-xs border-t border-gray-200">
        <p>Powered by <strong className="text-gray-600">Az</strong> — Club Commerce Platform</p>
      </footer>
    </div>
  );
}

