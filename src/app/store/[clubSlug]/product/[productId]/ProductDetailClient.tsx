'use client';
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import QRCodeDisplay from '@/components/QRCodeDisplay';
import { Club } from '@/data/clubs';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';

interface ProductDetailClientProps {
  club: Club;
  product: Product;
}

export default function ProductDetailClient({ club, product }: ProductDetailClientProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addItem({
      productId: product.id,
      productName: product.name,
      size: selectedSize,
      variant: selectedVariant.name,
      variantColor: selectedVariant.color,
      quantity,
      price: product.price,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const productUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/store/${club.slug}/product/${product.id}`
    : `/store/${club.slug}/product/${product.id}`;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar club={club} />

      <div className="max-w-2xl mx-auto">
        {/* Back button */}
        <div className="px-4 pt-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Tillbaka
          </button>
        </div>

        {/* Product image */}
        <div className="relative aspect-square bg-white mx-0 sm:mx-4 sm:rounded-2xl overflow-hidden mt-3 shadow-sm">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 640px"
            priority
          />
        </div>

        {/* Product info */}
        <div className="px-4 py-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{product.brand}</p>
              <h1 className="text-2xl font-bold text-gray-900 mt-1">{product.name}</h1>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-2xl font-bold text-gray-900">{formatPrice(product.price)}</p>
              <p className="text-xs text-gray-400">inkl. moms</p>
            </div>
          </div>

          <p className="text-gray-600 text-sm mt-3 leading-relaxed">{product.description}</p>

          {/* Color variants */}
          <div className="mt-5">
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Färg: <span className="font-normal text-gray-600">{selectedVariant.name}</span>
            </p>
            <div className="flex gap-3 flex-wrap">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedVariant(variant)}
                  className={`w-10 h-10 rounded-full border-4 transition-all ${
                    selectedVariant.id === variant.id
                      ? 'scale-110'
                      : 'border-transparent hover:scale-105'
                  }`}
                  style={{
                    backgroundColor: variant.color,
                    borderColor: selectedVariant.id === variant.id ? club.primaryColor : 'transparent',
                    boxShadow: variant.color === '#ffffff' ? 'inset 0 0 0 1px #e5e7eb' : undefined,
                  }}
                  title={variant.name}
                />
              ))}
            </div>
          </div>

          {/* Size selector */}
          <div className="mt-5">
            <p className="text-sm font-semibold text-gray-700 mb-2">Storlek</p>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
                    selectedSize === size
                      ? 'text-white border-transparent'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                  }`}
                  style={
                    selectedSize === size
                      ? { backgroundColor: club.primaryColor, borderColor: club.primaryColor }
                      : {}
                  }
                >
                  {size}
                </button>
              ))}
            </div>
            {!selectedSize && (
              <p className="text-xs text-amber-600 mt-2">Välj en storlek för att fortsätta</p>
            )}
          </div>

          {/* Quantity */}
          <div className="mt-5 flex items-center gap-4">
            <p className="text-sm font-semibold text-gray-700">Antal</p>
            <div className="flex items-center gap-3 bg-white rounded-xl border border-gray-200 px-3 py-1">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-gray-700 font-bold text-lg"
              >
                −
              </button>
              <span className="w-6 text-center font-semibold text-gray-800">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-gray-700 font-bold text-lg"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to cart button */}
          <button
            onClick={handleAddToCart}
            disabled={!selectedSize}
            className={`mt-6 w-full py-4 rounded-2xl text-base font-bold transition-all ${
              !selectedSize
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : added
                ? 'text-white'
                : 'text-white active:scale-[0.98]'
            }`}
            style={
              selectedSize && !added
                ? { backgroundColor: club.primaryColor }
                : added
                ? { backgroundColor: '#16a34a' }
                : {}
            }
          >
            {added ? '✓ Tillagd i kundvagn' : `Lägg i kundvagn — ${formatPrice(product.price * quantity)}`}
          </button>

          {/* QR Code toggle */}
          <button
            onClick={() => setShowQR((v) => !v)}
            className="mt-4 w-full py-3 rounded-2xl text-sm font-medium border-2 text-gray-600 border-gray-200 hover:border-gray-300 transition-all"
          >
            {showQR ? 'Dölj QR-kod' : 'Visa QR-kod för denna produkt'}
          </button>

          {showQR && (
            <div className="mt-4 flex justify-center">
              <QRCodeDisplay
                value={productUrl}
                size={180}
                label={`${product.name} — Scanna för att köpa`}
                primaryColor={club.primaryColor}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
