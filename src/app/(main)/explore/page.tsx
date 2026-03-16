'use client';

import dynamic from 'next/dynamic';
import { Search, Map as MapIcon, List } from 'lucide-react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { restaurantService } from '@/services/restaurant.service';

// Dynamically import map to avoid SSR issues
const MapView = dynamic(() => import('@/components/map/MapView'), { 
  ssr: false,
  loading: () => <div className="map-loading">Harita Hazırlanıyor...</div>
});

const sampleRestaurants = [
  { id: '1', name: 'Lezzet Sofrası', address: 'Bahçelievler Mah. No:12', latitude: 40.9950, longitude: 28.8630, rating: 4.5 },
  { id: '2', name: 'Dürümcü Baba', address: 'Şirinevler Cad. 14/A', latitude: 40.9920, longitude: 28.8580, rating: 4.8 },
  { id: '3', name: 'Burger Arena', address: 'Yenidoğan Sk. 5', latitude: 41.0010, longitude: 28.8680, rating: 4.2 },
];

export default function ExplorePage() {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');

  return (
    <div className="explore-page">
      <div className="explore-header">
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Restoran veya yemek ara..." />
        </div>
        <button className="filter-toggle" onClick={() => setViewMode(viewMode === 'map' ? 'list' : 'map')}>
          {viewMode === 'map' ? <List size={20} /> : <MapIcon size={20} />}
        </button>
      </div>

      <div className="explore-content">
        {viewMode === 'map' ? (
          <div className="map-view-container">
            <MapView restaurants={sampleRestaurants} center={[40.9958, 28.8633]} />
          </div>
        ) : (
          <div className="list-view-container">
            <p className="results-count">Yakınındaki {sampleRestaurants.length} Restoran</p>
            <div className="restaurant-list">
              {sampleRestaurants.map(res => (
                <div key={res.id} className="res-card card">
                  <div className="res-img-placeholder">🍽️</div>
                  <div className="res-details">
                    <h3>{res.name}</h3>
                    <p>{res.address}</p>
                    <div className="res-meta">
                      <span className="rating">⭐ {res.rating}</span>
                      <span className="distance">650m</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .explore-page {
          height: calc(100vh - var(--bottom-nav-height) - 100px);
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .explore-header {
          display: flex;
          gap: 0.75rem;
          padding: 0 0.25rem;
        }
        .search-bar {
          flex: 1;
          position: relative;
        }
        .search-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-light);
        }
        .search-bar input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.75rem;
          border-radius: var(--radius-full);
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          font-size: 0.9375rem;
        }
        .filter-toggle {
          width: 46px;
          height: 46px;
          border-radius: var(--radius-full);
          background: var(--primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
        }
        .explore-content {
          flex: 1;
          position: relative;
        }
        .map-view-container {
          height: 100%;
          border-radius: var(--radius-lg);
          overflow: hidden;
        }
        .results-count {
          font-size: 0.875rem;
          color: var(--text-muted);
          margin-bottom: 1rem;
          font-weight: 500;
        }
        .restaurant-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .res-card {
          display: flex;
          gap: 1rem;
          padding: 0.75rem;
        }
        .res-img-placeholder {
          width: 80px;
          height: 80px;
          background: var(--primary-light);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
        }
        .res-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .res-details h3 { font-size: 1rem; margin-bottom: 2px; }
        .res-details p { font-size: 0.8125rem; color: var(--text-muted); margin-bottom: 8px; }
        .res-meta { display: flex; gap: 1rem; font-size: 0.75rem; font-weight: 700; }
        .rating { color: var(--accent); }
        .distance { color: var(--primary); }
      `}</style>
    </div>
  );
}
