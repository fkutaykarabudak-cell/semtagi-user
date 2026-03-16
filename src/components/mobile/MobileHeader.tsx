'use client';

import { MapPin, Bell } from 'lucide-react';

export default function MobileHeader() {
  return (
    <header className="header">
      <div className="location-info">
        <MapPin size={16} color="var(--primary)" />
        <div className="location-text">
          <span className="location-label">Teslimat Adresi</span>
          <span className="location-value">Bahçelievler, İstanbul</span>
        </div>
      </div>

      <button className="notification-btn">
        <Bell size={20} />
        <span className="badge"></span>
      </button>

      <style jsx>{`
        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          background: white;
          position: sticky;
          top: 0;
          z-index: 90;
        }

        .location-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .location-text {
          display: flex;
          flex-direction: column;
        }

        .location-label {
          font-size: 0.625rem;
          color: var(--text-muted);
          text-transform: uppercase;
          font-weight: 700;
          letter-spacing: 0.025em;
        }

        .location-value {
          font-size: 0.875rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .notification-btn {
          position: relative;
          color: var(--text-main);
          background: #f8fafc;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .badge {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 8px;
          height: 8px;
          background: var(--error);
          border-radius: 50%;
          border: 2px solid white;
        }
      `}</style>
    </header>
  );
}
