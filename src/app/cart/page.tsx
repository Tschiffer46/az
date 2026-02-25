'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="sticky top-0 z-50 bg-white shadow-sm px-4 h-16 flex items-center gap-4">
          <Link href="/store/uppakra-if" className="text-gray-500 hover:text-gray-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 className="text-lg font-bold text-gray-900">Kundvagn</h1>
        </header>
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 11H4L5 9z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Din kundvagn är tom</h2>
          <p className="text-gray-500 mb-6">Utforska sortimentet och hitta något du gillar</p>
          <Link
            href="/store/uppakra-if"
            className="bg-[#1a3a6b] text-white px-6 py-3 rounded-2xl font-semibold hover:bg-[#152f58] transition-colors"
          >
            Tillbaka till butiken
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 bg-white shadow-sm px-4 h-16 flex items-center gap-4">
        <Link href="/store/uppakra-if" className="text-gray-500 hover:text-gray-700">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-lg font-bold text-gray-900">
          Kundvagn <span className="text-gray-400 font-normal text-sm">({totalItems} artiklar)</span>
        </h1>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-4">
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={`${item.productId}-${item.size}-${item.variant}`}
              className="bg-white rounded-2xl p-4 shadow-sm flex gap-4"
            >
              <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                <Image src={item.image} alt={item.productName} fill className="object-cover" sizes="80px" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{item.productName}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className="inline-block w-3 h-3 rounded-full border border-gray-200"
                        style={{ backgroundColor: item.variantColor }}
                      />
                      <span className="text-xs text-gray-500">{item.variant} · {item.size}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId, item.size, item.variant)}
                    className="text-gray-300 hover:text-red-400 ml-2 flex-shrink-0"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-2 py-1">
                    <button
                      onClick={() => updateQuantity(item.productId, item.size, item.variant, item.quantity - 1)}
                      className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 font-bold"
                    >
                      −
                    </button>
                    <span className="w-5 text-center text-sm font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.size, item.variant, item.quantity + 1)}
                      className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 font-bold"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-bold text-gray-900">{formatPrice(item.price * item.quantity)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="mt-4 bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Delsumma</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mb-3">
            <span>Frakt</span>
            <span className="text-green-600">Beräknas i kassan</span>
          </div>
          <div className="flex justify-between font-bold text-gray-900 text-lg border-t border-gray-100 pt-3">
            <span>Totalt</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
        </div>

        <Link
          href="/checkout"
          className="mt-4 w-full bg-[#1a3a6b] text-white py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 hover:bg-[#152f58] transition-colors active:scale-[0.98]"
        >
          Gå till kassan
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
