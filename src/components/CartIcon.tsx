'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

interface CartIconProps {
  primaryColor: string;
  secondaryColor: string;
}

export default function CartIcon({ primaryColor, secondaryColor }: CartIconProps) {
  const { totalItems } = useCart();

  return (
    <Link href="/cart" className="relative inline-flex items-center p-2">
      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 11H4L5 9z" />
      </svg>
      {totalItems > 0 && (
        <span
          className="absolute top-0 right-0 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center"
          style={{ backgroundColor: secondaryColor, color: primaryColor }}
        >
          {totalItems > 9 ? '9+' : totalItems}
        </span>
      )}
    </Link>
  );
}
