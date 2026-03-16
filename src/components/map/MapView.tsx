'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import L from 'leaflet';

// Fix for default marker icons in Leaflet + Next.js
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapViewProps {
  restaurants?: any[];
  center?: [number, number];
}

export default function MapView({ restaurants = [], center = [41.0082, 28.9784] }: MapViewProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return <div className="map-placeholder">Harita Yükleniyor...</div>;

  return (
    <div className="map-wrapper">
      <MapContainer 
        center={center} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {restaurants.map((res) => (
          <Marker key={res.id} position={[res.latitude, res.longitude]}>
            <Popup>
              <div className="res-popup">
                <strong>{res.name}</strong>
                <p>{res.address}</p>
                <div className="popup-footer">
                   <span>⭐ {res.rating}</span>
                   <button className="btn-sm">Menüye Git</button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      <style jsx>{`
        .map-wrapper {
          height: 100%;
          width: 100%;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-md);
        }
        .map-placeholder {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
          color: var(--text-muted);
        }
        .res-popup {
          padding: 0.25rem;
        }
        .res-popup strong { display: block; margin-bottom: 2px; }
        .res-popup p { font-size: 0.75rem; color: var(--text-muted); margin-bottom: 8px; }
        .popup-footer { display: flex; justify-content: space-between; align-items: center; gap: 1rem; }
        .btn-sm { background: var(--primary); color: white; border: none; padding: 2px 8px; border-radius: 4px; font-size: 0.7rem; cursor: pointer; }
      `}</style>
    </div>
  );
}
