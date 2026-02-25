'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { mockOrders, Order } from '@/data/orders';
import { products } from '@/data/products';
import { clubs } from '@/data/clubs';
import QRCodeDisplay from '@/components/QRCodeDisplay';
import { formatPrice } from '@/lib/utils';

type Period = 'week' | 'month' | 'quarter';

function getFilteredOrders(orders: Order[], period: Period): Order[] {
  const now = new Date();
  const cutoff = new Date(now);
  if (period === 'week') cutoff.setDate(now.getDate() - 7);
  else if (period === 'month') cutoff.setMonth(now.getMonth() - 1);
  else cutoff.setMonth(now.getMonth() - 3);
  return orders.filter((o) => new Date(o.createdAt) >= cutoff);
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-green-100 text-green-700',
};

const statusLabels: Record<string, string> = {
  pending: 'Väntar',
  processing: 'Behandlas',
  shipped: 'Skickad',
  delivered: 'Levererad',
};

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [period, setPeriod] = useState<Period>('month');
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'qr'>('overview');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !user) {
      router.push('/login');
    }
  }, [user, router, mounted]);

  if (!mounted || !user) return null;

  if (user.role !== 'az-staff') {
    router.push('/dashboard/club');
    return null;
  }

  const filteredOrders = getFilteredOrders(mockOrders, period);
  const totalRevenue = filteredOrders.reduce((s, o) => s + o.total, 0);
  const orderCount = filteredOrders.length;

  // Revenue by category
  const categoryRevenue: Record<string, number> = {};
  filteredOrders.forEach((order) => {
    order.items.forEach((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (product) {
        const cat = product.category;
        categoryRevenue[cat] = (categoryRevenue[cat] || 0) + item.price * item.quantity;
      }
    });
  });
  const maxCatRevenue = Math.max(...Object.values(categoryRevenue), 1);

  // Top products
  const productSales: Record<string, { name: string; qty: number; revenue: number }> = {};
  filteredOrders.forEach((order) => {
    order.items.forEach((item) => {
      if (!productSales[item.productId]) {
        productSales[item.productId] = { name: item.productName, qty: 0, revenue: 0 };
      }
      productSales[item.productId].qty += item.quantity;
      productSales[item.productId].revenue += item.price * item.quantity;
    });
  });
  const topProducts = Object.values(productSales).sort((a, b) => b.revenue - a.revenue).slice(0, 5);

  const storeUrl = mounted ? `${window.location.origin}/store/uppakra-if` : '/store/uppakra-if';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#1b5e20] text-white px-4 py-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-white text-[#1b5e20] font-black text-sm flex items-center justify-center">Az</div>
                <span className="font-bold text-lg">Dashboard</span>
              </div>
              <p className="text-white/60 text-xs mt-0.5">Az Staff — Alla klubbar</p>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/store/uppakra-if" className="text-white/70 hover:text-white text-sm">
                🛍 Butik
              </Link>
              <Link href="/login" className="text-white/70 hover:text-white text-sm">
                Logga ut
              </Link>
            </div>
          </div>

          {/* Period filter */}
          <div className="flex gap-2">
            {(['week', 'month', 'quarter'] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  period === p ? 'bg-white text-[#1b5e20]' : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {p === 'week' ? 'Vecka' : p === 'month' ? 'Månad' : 'Kvartal'}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 flex">
          {[
            { id: 'overview', label: 'Översikt' },
            { id: 'orders', label: 'Ordrar' },
            { id: 'qr', label: 'QR-koder' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-[#1b5e20] text-[#1b5e20]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-5">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-5">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Intäkter', value: formatPrice(totalRevenue), icon: '💰', color: 'text-green-600' },
                { label: 'Ordrar', value: orderCount.toString(), icon: '📦', color: 'text-blue-600' },
                { label: 'Snittorder', value: orderCount ? formatPrice(Math.round(totalRevenue / orderCount)) : '0 kr', icon: '📊', color: 'text-purple-600' },
                { label: 'Klubbar', value: clubs.length.toString(), icon: '⚽', color: 'text-orange-600' },
              ].map((kpi) => (
                <div key={kpi.label} className="bg-white rounded-2xl p-4 shadow-sm">
                  <div className="text-2xl mb-2">{kpi.icon}</div>
                  <div className={`text-xl font-bold ${kpi.color}`}>{kpi.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{kpi.label}</div>
                </div>
              ))}
            </div>

            {/* Category Revenue */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Intäkter per kategori</h3>
              <div className="space-y-3">
                {Object.entries(categoryRevenue)
                  .sort(([, a], [, b]) => b - a)
                  .map(([cat, rev]) => (
                    <div key={cat} className="flex items-center gap-3">
                      <span className="text-xs text-gray-500 w-24 capitalize">{cat}</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#1b5e20] transition-all"
                          style={{ width: `${(rev / maxCatRevenue) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-gray-700 w-20 text-right">{formatPrice(rev)}</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Toppsäljare</h3>
              <div className="space-y-3">
                {topProducts.map((p, i) => (
                  <div key={p.name} className="flex items-center gap-3">
                    <span className="text-gray-400 text-sm font-bold w-5">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{p.name}</p>
                      <p className="text-xs text-gray-400">{p.qty} sålda</p>
                    </div>
                    <span className="text-sm font-bold text-gray-900">{formatPrice(p.revenue)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <h3 className="font-bold text-gray-900">Ordrar ({filteredOrders.length})</h3>
            </div>
            <div className="divide-y divide-gray-50">
              {filteredOrders.map((order) => (
                <div key={order.id} className="px-4 py-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-bold text-gray-700">{order.id}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[order.status]}`}>
                          {statusLabels[order.status]}
                        </span>
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                          {order.deliveryType === 'home' ? '🏠 Hem' : '⚽ Klubb'}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-800 mt-1">{order.customerName}</p>
                      <p className="text-xs text-gray-400">{order.customerEmail}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {order.items.map((i) => `${i.productName} (${i.size})`).join(', ')}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-bold text-gray-900">{formatPrice(order.total)}</p>
                      <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString('sv-SE')}</p>
                      <p className="text-xs text-gray-400">{order.paymentMethod === 'swish' ? '📱 Swish' : '💳 Klarna'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* QR TAB */}
        {activeTab === 'qr' && (
          <div className="space-y-5">
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Butik QR-koder</h3>
              <div className="flex flex-wrap gap-6 justify-center">
                {clubs.map((club) => (
                  <QRCodeDisplay
                    key={club.id}
                    value={`${mounted ? window.location.origin : ''}/store/${club.slug}`}
                    size={150}
                    label={club.name}
                    primaryColor={club.primaryColor}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
