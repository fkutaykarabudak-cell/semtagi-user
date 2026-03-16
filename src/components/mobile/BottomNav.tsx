'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Map, ShoppingCart, User, ListOrdered } from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Ana Sayfa', href: '/' },
  { icon: Map, label: 'Keşfet', href: '/explore' },
  { icon: ShoppingCart, label: 'Sepetim', href: '/cart' },
  { icon: ListOrdered, label: 'Siparişler', href: '/orders' },
  { icon: User, label: 'Profil', href: '/profile' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        
        return (
          <Link key={item.href} href={item.href} className={`nav-item ${isActive ? 'active' : ''}`}>
            <Icon size={22} />
            <span>{item.label}</span>
          </Link>
        );
      })}

      <style jsx>{`
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          max-width: 500px;
          height: var(--bottom-nav-height);
          background-color: var(--bg-surface);
          border-top: 1px solid #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 0 1rem;
          z-index: 100;
        }

        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          color: var(--text-light);
          text-decoration: none;
          font-size: 0.625rem;
          font-weight: 600;
          transition: all 0.2s;
          flex: 1;
        }

        .nav-item:active {
          transform: scale(0.9);
        }

        .nav-item.active {
          color: var(--primary);
        }
      `}</style>
    </nav>
  );
}
