'use client';

import { useCartStore } from '@/store/cartStore';
import { ShoppingBag, Trash2, Plus, Minus, CreditCard, Banknote, MapPin, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { orderService } from '@/services/order.service';

const paymentMethods = [
  { id: 'CASH_ON_DELIVERY', label: 'Kapıda Nakit', icon: Banknote },
  { id: 'CARD_ON_DELIVERY', label: 'Kapıda Kart', icon: CreditCard },
  { id: 'MEAL_CARD', label: 'Yemek Kartı', icon: CreditCard },
];

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, getTotal, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState('CASH_ON_DELIVERY');
  const [isOrdered, setIsOrdered] = useState(false);

  const checkoutMutation = useMutation({
    mutationFn: (data: any) => orderService.createOrder(data),
    onSuccess: () => {
      setIsOrdered(true);
      clearCart();
      setTimeout(() => {
        router.push('/orders');
      }, 3000);
    },
  });

  const handleCheckout = () => {
    if (items.length === 0) return;

    checkoutMutation.mutate({
      restaurantId: items[0].restaurantId,
      items: items.map(i => ({ productId: i.productId, quantity: i.quantity })),
      paymentMethod,
      deliveryType: 'DELIVERY',
      addressId: 'dummy-address-id', // Simplified for demo
    });
  };

  if (isOrdered) {
    return (
      <div className="success-screen">
        <div className="success-icon">🎉</div>
        <h1>Siparişin Alındı!</h1>
        <p>Restoran siparişini hazırlamaya başlıyor. Afiyet olsun!</p>
        <button className="btn btn-primary mt-sm" onClick={() => router.push('/orders')}>Siparişlerime Git</button>
        
        <style jsx>{`
          .success-screen { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 60vh; text-align: center; gap: 1rem; }
          .success-icon { font-size: 5rem; }
          .success-screen p { color: var(--text-muted); padding: 0 2rem; }
        `}</style>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="empty-cart">
        <ShoppingBag size={80} color="var(--text-light)" />
        <h2>Sepetin Boş</h2>
        <p>Görünüşe göre henüz bir ürün eklememişsin.</p>
        <button className="btn btn-primary" onClick={() => router.push('/')}>Alışverişe Başla</button>
        
        <style jsx>{`
          .empty-cart { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 60vh; gap: 1.5rem; color: var(--text-muted); text-align: center; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="page-header-simple">
        <button className="back-btn-inline" onClick={() => router.back()}><ChevronLeft size={24} /></button>
        <h1>Sepetim</h1>
      </div>

      <div className="restaurant-tag">
        <span className="label">Restoran:</span>
        <span className="name">{items[0].restaurantName}</span>
      </div>

      <div className="cart-items-list">
        {items.map((item) => (
          <div key={item.productId} className="cart-item card">
            <div className="item-img">🥘</div>
            <div className="item-details">
              <h3>{item.name}</h3>
              <p>₺{item.price.toFixed(2)}</p>
            </div>
            <div className="item-actions">
              <div className="quantity-picker">
                <button onClick={() => updateQuantity(item.productId, item.quantity - 1)}><Minus size={16} /></button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}><Plus size={16} /></button>
              </div>
              <button className="remove-btn" onClick={() => removeItem(item.productId)}><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
      </div>

      <div className="payment-section">
        <h2>Ödeme Yöntemi</h2>
        <div className="payment-options">
          {paymentMethods.map((method) => {
            const Icon = method.icon;
            return (
              <button 
                key={method.id} 
                className={`payment-btn ${paymentMethod === method.id ? 'active' : ''}`}
                onClick={() => setPaymentMethod(method.id)}
              >
                <Icon size={20} />
                <span>{method.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="checkout-summary card">
        <div className="summary-row">
          <span>Toplam:</span>
          <strong>₺{getTotal().toFixed(2)}</strong>
        </div>
        <button 
          className="btn btn-primary checkout-btn" 
          onClick={handleCheckout} 
          disabled={checkoutMutation.isPending}
        >
          {checkoutMutation.isPending ? 'Sipariş Veriliyor...' : 'Siparişi Tamamla'}
        </button>
      </div>

      <style jsx>{`
        .cart-page { display: flex; flex-direction: column; gap: 1.5rem; padding-bottom: 2rem; }
        
        .page-header-simple { display: flex; align-items: center; gap: 1rem; }
        .back-btn-inline { background: none; border: none; color: var(--text-main); cursor: pointer; }
        
        .restaurant-tag { background: var(--primary-light); color: var(--primary); padding: 0.75rem 1rem; border-radius: var(--radius-md); font-weight: 700; font-size: 0.875rem; display: flex; gap: 0.5rem; }
        .restaurant-tag .label { opacity: 0.8; font-weight: 500; }

        .cart-items-list { display: flex; flex-direction: column; gap: 0.75rem; }
        .cart-item { display: flex; align-items: center; gap: 1rem; padding: 0.875rem; }
        .item-img { width: 45px; height: 45px; background: #f8fafc; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
        .item-details { flex: 1; }
        .item-details h3 { font-size: 0.9375rem; margin-bottom: 2px; }
        .item-details p { font-size: 0.875rem; font-weight: 700; color: var(--primary); }

        .item-actions { display: flex; align-items: center; gap: 0.75rem; }
        .quantity-picker { display: flex; align-items: center; gap: 0.75rem; background: #f1f5f9; padding: 4px 8px; border-radius: 8px; }
        .quantity-picker button { background: none; border: none; color: var(--text-main); display: flex; align-items: center; cursor: pointer; }
        .quantity-picker span { font-weight: 700; font-size: 0.875rem; min-width: 15px; text-align: center; }
        .remove-btn { color: var(--error); background: #fee2e2; border: none; width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer; }

        .payment-section h2 { font-size: 1.125rem; margin-bottom: 1rem; }
        .payment-options { display: flex; flex-direction: column; gap: 0.75rem; }
        .payment-btn { display: flex; align-items: center; gap: 1rem; padding: 1rem; background: white; border: 1px solid #e2e8f0; border-radius: var(--radius-md); font-weight: 600; color: var(--text-main); transition: all 0.2s; cursor: pointer; }
        .payment-btn.active { border-color: var(--primary); background: var(--primary-light); color: var(--primary); }

        .checkout-summary { margin-top: 1rem; display: flex; flex-direction: column; gap: 1.25rem; border-top: 4px solid var(--primary); }
        .summary-row { display: flex; justify-content: space-between; align-items: center; }
        .summary-row span { font-size: 1rem; color: var(--text-muted); }
        .summary-row strong { font-size: 1.5rem; color: var(--text-main); }
        .checkout-btn { width: 100%; height: 3.5rem; font-size: 1.125rem; }
      `}</style>
    </div>
  );
}
