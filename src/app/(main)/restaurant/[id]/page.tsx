'use client';

import { useQuery } from '@tanstack/react-query';
import { restaurantService } from '@/services/restaurant.service';
import { useParams, useRouter } from 'next/navigation';
import { Star, Clock, Truck, ChevronLeft, Plus, Minus } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function RestaurantDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);

  const { data: restaurant, isLoading: resLoading } = useQuery({
    queryKey: ['restaurant', id],
    queryFn: () => restaurantService.getRestaurantDetails(id as string),
  });

  const { data: menu, isLoading: menuLoading } = useQuery({
    queryKey: ['menu', id],
    queryFn: () => restaurantService.getMenu(id as string),
  });

  const getItemQuantity = (productId: string) => {
    return items.find((i) => i.productId === productId)?.quantity || 0;
  };

  if (resLoading) return <div className="loading">Yükleniyor...</div>;

  return (
    <div className="restaurant-detail">
      <div className="detail-header">
        <button className="back-btn" onClick={() => router.back()}>
          <ChevronLeft size={24} />
        </button>
        <div className="res-cover">🍽️</div>
      </div>

      <div className="res-main-info card">
        <h1>{restaurant?.name}</h1>
        <p className="res-address">{restaurant?.address}</p>
        
        <div className="res-stats">
          <div className="stat">
            <Star size={16} color="var(--accent)" fill="var(--accent)" />
            <span>{restaurant?.rating || '4.5'}</span>
            <small>({restaurant?.reviewCount || '100+'})</small>
          </div>
          <div className="stat">
            <Clock size={16} />
            <span>25-35 dk</span>
          </div>
          <div className="stat">
            <Truck size={16} />
            <span>{restaurant?.deliveryFee > 0 ? `₺${restaurant.deliveryFee}` : 'Ücretsiz'}</span>
          </div>
        </div>
      </div>

      <div className="menu-container">
        {menu?.categories?.map((cat: any) => (
          <div key={cat.id} className="menu-section">
            <h2>{cat.name}</h2>
            <div className="product-list">
              {cat.products?.map((prod: any) => (
                <div key={prod.id} className="product-card card">
                  <div className="prod-info">
                    <h3>{prod.name}</h3>
                    <p>{prod.description}</p>
                    <div className="prod-price">
                       {prod.discountPrice ? (
                         <>
                           <span className="current">₺{prod.discountPrice}</span>
                           <span className="old">₺{prod.price}</span>
                         </>
                       ) : (
                         <span className="current">₺{prod.price}</span>
                       )}
                    </div>
                  </div>
                  <div className="prod-action">
                    <div className="prod-image-placeholder">🍔</div>
                    {getItemQuantity(prod.id) > 0 ? (
                      <div className="quantity-control">
                         <button onClick={() => useCartStore.getState().updateQuantity(prod.id, getItemQuantity(prod.id) - 1)}><Minus size={16} /></button>
                         <span>{getItemQuantity(prod.id)}</span>
                         <button onClick={() => useCartStore.getState().addItem({
                           id: `${prod.id}-${Date.now()}`,
                           productId: prod.id,
                           name: prod.name,
                           price: prod.discountPrice || prod.price,
                           quantity: 1,
                           restaurantId: restaurant.id,
                           restaurantName: restaurant.name
                         })}><Plus size={16} /></button>
                      </div>
                    ) : (
                      <button 
                        className="add-btn"
                        onClick={() => addItem({
                          id: `${prod.id}-${Date.now()}`,
                          productId: prod.id,
                          name: prod.name,
                          price: prod.discountPrice || prod.price,
                          quantity: 1,
                          restaurantId: restaurant.id,
                          restaurantName: restaurant.name
                        })}
                      >
                        <Plus size={20} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .restaurant-detail { padding-bottom: 5rem; }
        
        .detail-header { position: relative; height: 180px; margin: -1rem -1rem 0 -1rem; }
        .back-btn { position: absolute; top: 1rem; left: 1rem; z-index: 10; width: 40px; height: 40px; border-radius: 50%; background: white; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .res-cover { width: 100%; height: 100%; background: var(--secondary); display: flex; align-items: center; justify-content: center; font-size: 4rem; color: white; }

        .res-main-info { margin-top: -2rem; position: relative; z-index: 5; text-align: center; border-radius: var(--radius-lg); padding: 1.5rem; }
        .res-main-info h1 { font-size: 1.5rem; margin-bottom: 0.25rem; }
        .res-address { font-size: 0.875rem; color: var(--text-muted); margin-bottom: 1.25rem; }
        
        .res-stats { display: flex; justify-content: center; gap: 2rem; border-top: 1px solid #f1f5f9; padding-top: 1.25rem; }
        .stat { display: flex; align-items: center; gap: 6px; font-weight: 700; font-size: 0.875rem; color: var(--text-main); }
        .stat small { font-weight: 400; color: var(--text-light); }

        .menu-section { margin-top: 2rem; }
        .menu-section h2 { font-size: 1.25rem; margin-bottom: 1rem; color: var(--secondary); border-left: 4px solid var(--primary); padding-left: 0.75rem; }
        
        .product-list { display: flex; flex-direction: column; gap: 1rem; }
        .product-card { display: flex; gap: 1rem; padding: 1rem; align-items: center; }
        .prod-info { flex: 1; }
        .prod-info h3 { font-size: 1rem; margin-bottom: 4px; }
        .prod-info p { font-size: 0.8125rem; color: var(--text-muted); line-height: 1.4; margin-bottom: 8px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        
        .prod-price { font-weight: 800; display: flex; align-items: center; gap: 0.5rem; }
        .prod-price .current { color: var(--text-main); font-size: 1rem; }
        .prod-price .old { color: var(--text-light); text-decoration: line-through; font-size: 0.875rem; font-weight: 500; }

        .prod-action { position: relative; }
        .prod-image-placeholder { width: 85px; height: 85px; background: #f8fafc; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-size: 2.5rem; margin-bottom: 10px; }
        
        .add-btn { position: absolute; bottom: -8px; right: -8px; width: 32px; height: 32px; background: var(--primary); color: white; border-radius: 8px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3); }
        
        .quantity-control { position: absolute; bottom: -8px; right: -8px; background: white; border: 1px solid var(--primary); border-radius: 8px; display: flex; align-items: center; gap: 0.75rem; padding: 4px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .quantity-control button { background: none; border: none; color: var(--primary); display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; cursor: pointer; }
        .quantity-control span { font-weight: 800; font-size: 0.875rem; min-width: 20px; text-align: center; }
      `}</style>
    </div>
  );
}
