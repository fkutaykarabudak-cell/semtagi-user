'use client';

import { useQuery } from '@tanstack/react-query';
import { restaurantService } from '@/services/restaurant.service';
import { Star, Truck, Clock, Info, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const categories = [
  { id: '1', name: 'Kebap', icon: '🌯' },
  { id: '2', name: 'Pizza', icon: '🍕' },
  { id: '3', name: 'Burger', icon: '🍔' },
  { id: '4', name: 'Tatlı', icon: '🍰' },
  { id: '5', name: 'Ev Yemeği', icon: '🍲' },
  { id: '6', name: 'İçecek', icon: '🥤' },
];

export default function HomePage() {
  const { data: restaurants } = useQuery({
    queryKey: ['restaurants-home'],
    queryFn: () => restaurantService.getRestaurants(),
  });

  return (
    <div className="home-page">
      <section className="welcome-section">
        <h1>Acıktıysan,<br />Hemen Söyle! 😋</h1>
        <p>Mahallendeki en iyi lezzetler komisyonsuz kapında.</p>
      </section>

      <section className="categories-section">
        <div className="section-header">
          <h2>Kategoriler</h2>
          <Link href="/categories">Tümü <ChevronRight size={16} /></Link>
        </div>
        <div className="categories-grid">
          {categories.map((cat) => (
            <div key={cat.id} className="category-item">
              <div className="cat-icon">{cat.icon}</div>
              <span>{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="nearby-section">
        <div className="section-header">
          <h2>Yakınındaki Restoranlar</h2>
          <Link href="/explore">Haritada Gör <ChevronRight size={16} /></Link>
        </div>
        <div className="restaurant-cards">
          {restaurants?.length > 0 ? (
            restaurants.map((res: any) => (
              <Link key={res.id} href={`/restaurant/${res.id}`} className="res-card-home card">
                <div className="res-image-placeholder">🍽️</div>
                <div className="res-info-compact">
                  <div className="res-name-row">
                    <h3>{res.name}</h3>
                    <div className="rating">⭐ {res.rating || '4.5'}</div>
                  </div>
                  <div className="res-delivery">
                    <span className="info-item"><Clock size={12} /> 25-35 dk</span>
                    <span className="info-item"><Truck size={12} /> {res.deliveryFee > 0 ? `₺${res.deliveryFee}` : 'Ücretsiz'}</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            // Sample data fallback if no real data from API yet
            [1, 2, 3].map((i) => (
              <div key={i} className="res-card-home card">
                <div className="res-image-placeholder">🥘</div>
                <div className="res-info-compact">
                   <h3>Restoran Adı {i}</h3>
                   <div className="res-delivery">
                    <span className="info-item"><Star size={12} color="var(--accent)" /> 4.7</span>
                    <span className="info-item"><Clock size={12} /> 20 dk</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <style jsx>{`
        .home-page { display: flex; flex-direction: column; gap: 2rem; padding-bottom: 2rem; }
        
        .welcome-section h1 { font-size: 2rem; margin-bottom: 0.5rem; line-height: 1.1; }
        .welcome-section p { color: var(--text-muted); font-size: 0.9375rem; }

        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
        .section-header h2 { font-size: 1.125rem; }
        .section-header a { font-size: 0.875rem; color: var(--primary); font-weight: 600; display: flex; align-items: center; text-decoration: none; }

        .categories-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.75rem; }
        .category-item { background: white; padding: 1.25rem 0; border-radius: var(--radius-lg); display: flex; flex-direction: column; align-items: center; gap: 0.5rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.03); border: 1px solid #f8fafc; }
        .cat-icon { font-size: 1.75rem; }
        .category-item span { font-size: 0.8125rem; font-weight: 700; color: var(--text-main); }

        .restaurant-cards { display: flex; flex-direction: column; gap: 1rem; }
        .res-card-home { display: flex; gap: 1rem; padding: 0.75rem; text-decoration: none; color: inherit; }
        .res-image-placeholder { width: 90px; height: 90px; background: #f1f5f9; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: center; font-size: 2.5rem; }
        .res-info-compact { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 0.5rem; }
        .res-name-row { display: flex; justify-content: space-between; align-items: center; }
        .res-name-row h3 { font-size: 1rem; }
        .rating { font-size: 0.875rem; font-weight: 700; color: var(--text-main); }
        .res-delivery { display: flex; gap: 1rem; }
        .info-item { display: flex; align-items: center; gap: 4px; font-size: 0.75rem; color: var(--text-muted); font-weight: 500; }
      `}</style>
    </div>
  );
}
