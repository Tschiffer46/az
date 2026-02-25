'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';

type DeliveryType = 'home' | 'club';
type PaymentMethod = 'swish' | 'klarna';
type Step = 1 | 2 | 3;

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<Step>(1);
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('home');
  const [address, setAddress] = useState({ name: '', street: '', city: '', zip: '', email: '' });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('swish');
  const [isProcessing, setIsProcessing] = useState(false);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <p className="text-gray-600 mb-4">Din kundvagn är tom</p>
        <Link href="/store/uppakra-if" className="bg-[#1a3a6b] text-white px-6 py-3 rounded-2xl font-semibold">
          Tillbaka till butiken
        </Link>
      </div>
    );
  }

  const shippingCost = deliveryType === 'home' ? 49 : 0;
  const orderTotal = totalPrice + shippingCost;

  const handleConfirm = async () => {
    setIsProcessing(true);
    // Simulate processing
    await new Promise((resolve) => setTimeout(resolve, 1500));
    clearCart();
    router.push('/confirmation');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 bg-white shadow-sm px-4 h-16 flex items-center gap-4">
        <Link href="/cart" className="text-gray-500 hover:text-gray-700">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <h1 className="text-lg font-bold text-gray-900">Kassa</h1>
      </header>

      {/* Step indicator */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  s === step
                    ? 'bg-[#1a3a6b] text-white'
                    : s < step
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {s < step ? '✓' : s}
              </div>
              <span className={`text-xs hidden sm:block ${s === step ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
                {s === 1 ? 'Leverans' : s === 2 ? 'Betalning' : 'Bekräfta'}
              </span>
              {s < 3 && <div className={`h-px flex-1 w-8 ${s < step ? 'bg-green-500' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-5">
        {/* Step 1: Delivery */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Välj leveranssätt</h2>

            <div className="grid grid-cols-2 gap-3">
              {[
                { type: 'home' as DeliveryType, label: 'Hemleverans', desc: '49 kr · 3–5 dagar', icon: '🏠' },
                { type: 'club' as DeliveryType, label: 'Hämta i klubben', desc: 'Gratis · Nästa match', icon: '⚽' },
              ].map((opt) => (
                <button
                  key={opt.type}
                  onClick={() => setDeliveryType(opt.type)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all ${
                    deliveryType === opt.type ? 'border-[#1a3a6b] bg-blue-50' : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="text-2xl mb-2">{opt.icon}</div>
                  <div className="font-semibold text-gray-900 text-sm">{opt.label}</div>
                  <div className="text-xs text-gray-500 mt-1">{opt.desc}</div>
                </button>
              ))}
            </div>

            {deliveryType === 'home' && (
              <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
                <h3 className="font-semibold text-gray-800">Leveransadress</h3>
                {[
                  { key: 'name', label: 'Fullt namn', placeholder: 'Erik Andersson', type: 'text' },
                  { key: 'email', label: 'E-post', placeholder: 'erik@example.com', type: 'email' },
                  { key: 'street', label: 'Gatuadress', placeholder: 'Storgatan 12', type: 'text' },
                  { key: 'zip', label: 'Postnummer', placeholder: '245 31', type: 'text' },
                  { key: 'city', label: 'Stad', placeholder: 'Staffanstorp', type: 'text' },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="text-xs font-medium text-gray-600 block mb-1">{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={address[field.key as keyof typeof address]}
                      onChange={(e) => setAddress((a) => ({ ...a, [field.key]: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#1a3a6b] transition-colors"
                    />
                  </div>
                ))}
              </div>
            )}

            {deliveryType === 'club' && (
              <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
                <h3 className="font-semibold text-gray-800">Kontaktinfo</h3>
                {[
                  { key: 'name', label: 'Fullt namn', placeholder: 'Erik Andersson', type: 'text' },
                  { key: 'email', label: 'E-post', placeholder: 'erik@example.com', type: 'email' },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="text-xs font-medium text-gray-600 block mb-1">{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={address[field.key as keyof typeof address]}
                      onChange={(e) => setAddress((a) => ({ ...a, [field.key]: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#1a3a6b] transition-colors"
                    />
                  </div>
                ))}
                <div className="bg-blue-50 rounded-xl p-3 text-xs text-blue-700">
                  📍 Uppåkra IF Klubbhus — Du får en e-post när din beställning är redo för upphämtning.
                </div>
              </div>
            )}

            <button
              onClick={() => setStep(2)}
              className="w-full bg-[#1a3a6b] text-white py-4 rounded-2xl font-bold hover:bg-[#152f58] transition-colors"
            >
              Fortsätt till betalning
            </button>
          </div>
        )}

        {/* Step 2: Payment */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Välj betalningssätt</h2>

            <div className="space-y-3">
              {[
                {
                  method: 'swish' as PaymentMethod,
                  label: 'Swish',
                  desc: 'Betala direkt med Swish',
                  badge: '🟢 Populärt',
                  icon: '📱',
                },
                {
                  method: 'klarna' as PaymentMethod,
                  label: 'Klarna',
                  desc: 'Betala nu, senare eller dela upp',
                  badge: null,
                  icon: '💳',
                },
              ].map((opt) => (
                <button
                  key={opt.method}
                  onClick={() => setPaymentMethod(opt.method)}
                  className={`w-full p-4 rounded-2xl border-2 text-left flex items-center gap-4 transition-all ${
                    paymentMethod === opt.method ? 'border-[#1a3a6b] bg-blue-50' : 'border-gray-200 bg-white'
                  }`}
                >
                  <span className="text-2xl">{opt.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900">{opt.label}</span>
                      {opt.badge && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{opt.badge}</span>}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      paymentMethod === opt.method ? 'border-[#1a3a6b]' : 'border-gray-300'
                    }`}
                  >
                    {paymentMethod === opt.method && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#1a3a6b]" />
                    )}
                  </div>
                </button>
              ))}

              <div className="p-4 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 flex items-center gap-4 opacity-60">
                <span className="text-2xl">💳</span>
                <div>
                  <span className="font-semibold text-gray-500">Kortbetalning</span>
                  <span className="ml-2 text-xs bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full">Kommer snart</span>
                  <p className="text-xs text-gray-400 mt-0.5">Visa, Mastercard</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-4 rounded-2xl font-bold border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Tillbaka
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-2 flex-grow-[2] bg-[#1a3a6b] text-white py-4 rounded-2xl font-bold hover:bg-[#152f58] transition-colors"
              >
                Granska order
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Review & Confirm */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Granska din order</h2>

            {/* Items */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-3 text-sm">Artiklar</h3>
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={`${item.productId}-${item.size}-${item.variant}`} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.productName} <span className="text-gray-400">({item.variant}, {item.size}) ×{item.quantity}</span>
                    </span>
                    <span className="font-medium text-gray-900">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 mt-3 pt-3 space-y-1">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Frakt</span>
                  <span>{shippingCost === 0 ? 'Gratis' : formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-900">
                  <span>Totalt</span>
                  <span>{formatPrice(orderTotal)}</span>
                </div>
              </div>
            </div>

            {/* Delivery summary */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm">Leverans</h3>
              <p className="text-sm text-gray-600">
                {deliveryType === 'home' ? `🏠 Hemleverans till ${address.street || 'angiven adress'}` : '⚽ Upphämtning i klubbhuset'}
              </p>
            </div>

            {/* Payment summary */}
            <div className="bg-white rounded-2xl p-4 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm">Betalning</h3>
              <p className="text-sm text-gray-600">
                {paymentMethod === 'swish' ? '📱 Swish' : '💳 Klarna'}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-4 rounded-2xl font-bold border-2 border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
                disabled={isProcessing}
              >
                Tillbaka
              </button>
              <button
                onClick={handleConfirm}
                disabled={isProcessing}
                className="flex-2 flex-grow-[2] bg-[#1a3a6b] text-white py-4 rounded-2xl font-bold hover:bg-[#152f58] transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Behandlar...
                  </>
                ) : (
                  `Bekräfta — ${formatPrice(orderTotal)}`
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
