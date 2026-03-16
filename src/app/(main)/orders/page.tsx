'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { orderService } from '@/services/order.service';
import { useSocket } from '@/hooks/useSocket';
import { useEffect } from 'react';
import { ShoppingBag, ChevronRight, Clock, MapPin, CheckCircle2, Truck, CookingPot, Timer } from 'lucide-react';
import Link from 'next/link';

const statusMap: Record<string, { label: string; icon: any; color: string; desc: string }> = {
  PENDING: { label: 'Onay Bekliyor', icon: Timer, color: '#f59e0b', desc: 'Restoranın siparişini onaylaması bekleniyor.' },
  ACCEPTED: { label: 'Hazırlanıyor', icon: CookingPot, color: '#10b981', desc: 'Restoran siparişini onayladı ve hazırlamaya başladı.' },
  PREPARING: { label: 'Mutfakta', icon: CookingPot, color: '#10b981', desc: 'Lezzetlerin hazırlanıyor, az kaldı!' },
  ON_THE_WAY: { label: 'Yolda', icon: Truck, color: '#3b82f6', desc: 'Kurye siparişini aldı, sana doğru geliyor.' },
  DELIVERED: { label: 'Teslim Edildi', icon: CheckCircle2, color: '#10b981', desc: 'Afiyet olsun! Siparişin başarıyla teslim edildi.' },
  CANCELLED: { label: 'İptal Edildi', icon: CheckCircle2, color: '#ef4444', desc: 'Siparişin maalesef iptal edildi.' },
};

export default function OrdersPage() {
  const queryClient = useQueryClient();
  const socket = useSocket();

  const { data: orders, isLoading } = useQuery({
    queryKey: ['my-orders'],
    queryFn: orderService.getUserOrders,
  });

  useEffect(() => {
    if (!socket) return;

    socket.on('order_status_changed', (data: { orderId: string; status: string }) => {
      queryClient.invalidateQueries({ queryKey: ['my-orders'] });
      // Notification sound or visual alert can be added here
    });

    return () => {
      socket.off('order_status_changed');
    };
  }, [socket, queryClient]);

  if (isLoading) return <div className="loading">Siparişlerin yükleniyor...</div>;

  return (
    <div className="orders-page">
      <div className="page-header">
        <h1>Siparişlerim</h1>
        <p className="order-count">Toplam {orders?.length || 0} Sipariş</p>
      </div>

      <div className="orders-list">
        {!orders || orders.length === 0 ? (
          <div className="empty-orders">
            <ShoppingBag size={60} color="#e2e8f0" />
            <p>Henüz bir siparişin bulunmuyor.</p>
          </div>
        ) : (
          orders.map((order: any) => {
            const status = statusMap[order.status] || statusMap.PENDING;
            const StatusIcon = status.icon;

            return (
              <div key={order.id} className="order-card card">
                <div className="order-card-header">
                  <div className="res-info">
                    <span className="res-name">{order.restaurant.name}</span>
                    <span className="order-date">{new Date(order.createdAt).toLocaleDateString('tr-TR')}</span>
                  </div>
                  <span className="order-price">₺{order.totalAmount.toFixed(2)}</span>
                </div>

                <div className="status-timeline">
                   <div className="status-main" style={{ color: status.color }}>
                     <StatusIcon size={20} />
                     <strong>{status.label}</strong>
                   </div>
                   <p className="status-desc">{status.desc}</p>
                </div>

                <div className="order-items-preview">
                  {order.items.slice(0, 2).map((item: any) => (
                    <span key={item.id}>{item.quantity}x {item.productName}</span>
                  ))}
                  {order.items.length > 2 && <span className="more">+{order.items.length - 2} ürün daha</span>}
                </div>

                <div className="order-footer">
                  <Link href={`/orders/${order.id}`} className="details-link">
                    Detayları Gör <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>

      <style jsx>{`
        .orders-page { display: flex; flex-direction: column; gap: 1.5rem; padding-bottom: 2rem; }
        .page-header h1 { font-size: 1.5rem; }
        .order-count { font-size: 0.875rem; color: var(--text-muted); font-weight: 500; }

        .orders-list { display: flex; flex-direction: column; gap: 1rem; }
        
        .order-card { display: flex; flex-direction: column; gap: 1.25rem; padding: 1.25rem; border-left: 4px solid var(--primary); }
        
        .order-card-header { display: flex; justify-content: space-between; align-items: flex-start; }
        .res-info { display: flex; flex-direction: column; }
        .res-name { font-weight: 700; font-size: 1rem; color: var(--text-main); }
        .order-date { font-size: 0.75rem; color: var(--text-light); }
        .order-price { font-weight: 800; color: var(--text-main); font-size: 1rem; }

        .status-timeline { background: #f8fafc; padding: 1rem; border-radius: var(--radius-md); border: 1px dashed #e2e8f0; }
        .status-main { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem; }
        .status-desc { font-size: 0.8125rem; color: var(--text-muted); line-height: 1.3; }

        .order-items-preview { display: flex; flex-wrap: wrap; gap: 0.5rem; font-size: 0.8125rem; color: var(--text-muted); }
        .order-items-preview span:not(.more)::after { content: '•'; margin-left: 0.5rem; opacity: 0.5; }
        .order-items-preview span:last-child::after { content: ''; }
        .more { font-weight: 700; color: var(--primary); }

        .order-footer { border-top: 1px solid #f1f5f9; padding-top: 1rem; display: flex; justify-content: flex-end; }
        .details-link { display: flex; align-items: center; gap: 4px; font-size: 0.875rem; color: var(--primary); font-weight: 700; text-decoration: none; }

        .empty-orders { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 4rem 0; gap: 1rem; color: var(--text-light); text-align: center; }
      `}</style>
    </div>
  );
}
