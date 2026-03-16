'use client';

import { useQuery } from '@tanstack/react-query';
import { restaurantService } from '@/services/restaurant.service';
import { Star, Truck, Clock, ChevronRight, Search, MapPin } from 'lucide-react';
import Link from 'next/link';

const categories = [
  { id: '1', name: 'Kebap', icon: '🌯', color: '#fef3c7' },
  { id: '2', name: 'Pizza', icon: '🍕', color: '#fee2e2' },
  { id: '3', name: 'Burger', icon: '🍔', color: '#ffedd5' },
  { id: '4', name: 'Tatlı', icon: '🍰', color: '#fce7f3' },
  { id: '5', name: 'Ev Yemeği', icon: '🍲', color: '#d1fae5' },
  { id: '6', name: 'İçecek', icon: '🥤', color: '#e0e7ff' },
];

export default function HomePage() {
  const { data: restaurants } = useQuery({
    queryKey: ['restaurants-home'],
    queryFn: () => restaurantService.getRestaurants(),
  });

  return (
    <div className="home-page">
      {/* Search Bar matching mobile app header style */}
      <div className="search-bar-wrap">
        <div className="search-input-box">
          <Search size={18} color="var(--text-light)" />
          <input type="text" placeholder="Restoran veya kampanya ara..." />
        </div>
      </div>

      <section className="welcome-section">
        <div className="welcome-content">
          <h1>Acıktıysan,<br />Hemen Söyle! 😋</h1>
          <p>Mahallendeki en iyi lezzetler komisyonsuz kapında.</p>
        </div>
        <div className="welcome-bg-circle"></div>
      </section>

      <section className="categories-section mt-md">
        <div className="section-header">
          <h2>Kategoriler</h2>
          <Link href="/categories" className="see-all">Tümü <ChevronRight size={16} /></Link>
        </div>
        <div className="categories-scroll">
          {categories.map((cat) => (
            <div key={cat.id} className="category-item">
              <div className="cat-icon-container" style={{ backgroundColor: cat.color }}>
                <span className="cat-icon">{cat.icon}</span>
              </div>
              <span className="cat-text">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="nearby-section mt-lg">
        <div className="section-header">
          <h2>Yakınındaki Restoranlar</h2>
          <Link href="/explore" className="see-all">Haritada Gör <ChevronRight size={16} /></Link>
        </div>
        <div className="restaurant-cards">
          {restaurants?.length > 0 ? (
            restaurants.map((res: any) => (
              <Link key={res.id} href={`/restaurant/${res.id}`} className="res-card-home card">
                <div className="res-image-placeholder">🍽️</div>
                <div className="res-info-compact">
                  <div className="res-name-row">
                    <h3>{res.name}</h3>
                    <div className="rating"><Star size={12} fill="var(--accent)" color="var(--accent)" /> {res.rating || '4.5'}</div>
                  </div>
                  <p className="res-desc">{res.description?.substring(0, 35) + '...' || 'Harika lezzetler seni bekliyor!'}</p>
                  <div className="res-delivery mt-sm">
                    <span className="info-badge"><Clock size={12} /> 25-35 dk</span>
                    <span className="info-badge"><Truck size={12} /> {res.deliveryFee > 0 ? `₺${res.deliveryFee}` : 'Ücretsiz'}</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            // Sample data fallback
            [1, 2, 3].map((i) => (
              <div key={i} className="res-card-home card">
                <div className="res-image-placeholder">🥘</div>
                <div className="res-info-compact">
                   <h3>Semt Restoranı {i}</h3>
                   <p className="res-desc">Ev yemekleri, tatlılar...</p>
                   <div className="res-delivery mt-sm">
                    <span className="info-badge"><Star size={12} fill="var(--primary)" color="var(--primary)" /> 4.7</span>
                    <span className="info-badge"><Clock size={12} /> 20 dk</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <style jsx>{`
        .home-page { 
          display: flex; flex-direction: column; gap: 0rem; 
        }

        .search-bar-wrap {
          margin-bottom: var(--space-lg);
          margin-top: calc(-1 * var(--space-sm)); 
        }

        .search-input-box {
          display: flex;
          align-items: center;
          background: var(--bg-surface);
          border: 1px solid rgba(0,0,0,0.05);
          box-shadow: 0 4px 12px rgba(0,0,0,0.02);
          padding: 0.75rem 1rem;
          border-radius: var(--radius-lg);
          gap: 0.5rem;
        }

        .search-input-box input {
          border: none;
          outline: none;
          background: transparent;
          flex: 1;
          font-size: 0.9375rem;
          color: var(--text-main);
          font-family: inherit;
        }

        .search-input-box input::placeholder {
          color: var(--text-light);
        }
        
        .welcome-section {
          position: relative;
          background: var(--primary-gradient);
          color: white;
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          overflow: hidden;
          margin-bottom: var(--space-md);
          box-shadow: var(--shadow-md);
        }

        .welcome-content {
          position: relative;
          z-index: 2;
        }

        .welcome-bg-circle {
          position: absolute;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          top: -20px;
          right: -30px;
          z-index: 1;
        }

        .welcome-section h1 { 
          color: white;
          font-size: 1.5rem; 
          margin-bottom: 0.25rem; 
          line-height: 1.2; 
        }
        
        .welcome-section p { 
          color: rgba(255,255,255,0.9); 
          font-size: 0.875rem; 
          font-weight: 500;
        }

        .section-header { 
          display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; 
        }
        
        .section-header h2 { font-size: 1.125rem; }
        
        .see-all { 
          font-size: 0.8125rem; 
          color: var(--primary); 
          font-weight: 700; 
          display: flex; 
          align-items: center; 
          text-decoration: none; 
          background: var(--primary-light);
          padding: 4px 10px;
          border-radius: 20px;
        }

        .categories-scroll { 
          display: flex; 
          gap: 1rem; 
          overflow-x: auto; 
          padding-bottom: 0.5rem;
          margin-right: calc(-1 * var(--space-md));
          padding-right: var(--space-md);
          scrollbar-width: none; /* Firefox */
        }
        .categories-scroll::-webkit-scrollbar { display: none; }

        .category-item { 
          display: flex; flex-direction: column; align-items: center; gap: 0.5rem; 
          min-width: 72px;
        }
        
        .cat-icon-container { 
          width: 60px; height: 60px; 
          border-radius: var(--radius-lg); 
          display: flex; align-items: center; justify-content: center; 
          font-size: 1.5rem; 
          box-shadow: inset 0 -2px 0 rgba(0,0,0,0.05); /* 3d pop effect */
        }
        
        .cat-text { font-size: 0.75rem; font-weight: 700; color: var(--text-main); }

        .restaurant-cards { display: flex; flex-direction: column; gap: 1rem; }
        .res-card-home { 
          display: flex; gap: 1rem; padding: 0.875rem; text-decoration: none; color: inherit; 
          align-items: center;
        }

        .res-image-placeholder { 
          width: 80px; height: 80px; 
          background: #f1f5f9; 
          border-radius: var(--radius-md); 
          display: flex; align-items: center; justify-content: center; font-size: 2.25rem; 
          flex-shrink: 0;
        }

        .res-info-compact { flex: 1; display: flex; flex-direction: column; gap: 4px; }
        .res-name-row { display: flex; justify-content: space-between; align-items: flex-start; }
        .res-name-row h3 { font-size: 1rem; margin:0; line-height: 1.2; }
        
        .rating { 
          display: flex; align-items: center; gap: 2px;
          font-size: 0.75rem; font-weight: 700; color: var(--text-main); 
        }

        .res-desc {
          font-size: 0.75rem;
          color: var(--text-muted);
          line-height: 1.3;
        }

        .res-delivery { display: flex; gap: 0.5rem; }
        
        .info-badge { 
          display: flex; align-items: center; gap: 4px; 
          font-size: 0.7rem; color: var(--text-muted); font-weight: 600; 
          background: var(--bg-main);
          padding: 4px 8px;
          border-radius: 6px;
        }
        
        .mt-md { margin-top: 1.5rem; }
        .mt-lg { margin-top: 2rem; }
      `}</style>
    </div>
  );
}
