'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { generateOrderId } from '@/lib/utils';

export default function ConfirmationPage() {
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    setOrderId(generateOrderId());
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-sm w-full text-center">
        {/* Success icon */}
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">Order bekräftad!</h1>
        <p className="text-gray-500 mb-6">
          Tack för din beställning. Vi skickar en bekräftelse till din e-post.
        </p>

        <div className="bg-white rounded-2xl p-5 shadow-sm text-left mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500">Ordernummer</span>
            <span className="font-mono font-bold text-gray-900 text-sm">{orderId}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500">Status</span>
            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
              Behandlas
            </span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-500">Beräknad leverans</span>
            <span className="text-sm font-medium text-gray-900">3–5 arbetsdagar</span>
          </div>
          <div className="border-t border-gray-100 pt-4">
            <p className="text-xs text-gray-400 text-center">
              En orderbekräftelse har skickats till din e-postadress
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <Link
            href="/store/uppakra-if"
            className="w-full bg-[#1b5e20] text-white py-4 rounded-2xl font-bold flex items-center justify-center hover:bg-[#154a19] transition-colors"
          >
            Fortsätt handla
          </Link>
          <Link
            href="/"
            className="w-full py-3 rounded-2xl font-medium text-gray-600 border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors text-sm"
          >
            Tillbaka till startsidan
          </Link>
        </div>
      </div>
    </div>
  );
}
