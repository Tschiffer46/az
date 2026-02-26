'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { Club } from '@/data/clubs';

interface NavbarProps {
  club: Club;
}

export default function Navbar({ club }: NavbarProps) {
  const { totalItems } = useCart();

  return (
    <nav
      className="sticky top-0 z-50 shadow-md"
      style={{ backgroundColor: club.primaryColor }}
    >
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={`/store/${club.slug}`} className="flex items-center gap-3">
          <div className="relative w-10 h-10 shrink-0">
            <Image
              src={club.logo}
              alt={`${club.name} logo`}
              fill
              className="object-contain"
              sizes="40px"
              priority
            />
          </div>
          <span className="text-white font-semibold text-lg leading-tight hidden sm:block">
            {club.name}
          </span>
          <span className="text-white font-semibold text-base leading-tight sm:hidden">
            {club.name.split(' ')[0]}
          </span>
        </Link>

        <Link href="/cart" className="relative flex items-center gap-1 text-white">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 11H4L5 9z" />
          </svg>
          {totalItems > 0 && (
            <span
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center"
              style={{ backgroundColor: club.secondaryColor, color: club.primaryColor }}
            >
              {totalItems > 9 ? '9+' : totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
