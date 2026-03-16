'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Map, ShoppingCart, User, ListOrdered, LogIn } from 'lucide-react';
import { useUserAuthStore } from '@/store/authStore';

export default function BottomNav() {
  const pathname = usePathname();
  const { user } = useUserAuthStore();

  const navItems = [
    { icon: Home, label: 'Ana Sayfa', href: '/' },
    { icon: Map, label: 'Keşfet', href: '/explore' },
    { icon: ShoppingCart, label: 'Sepetim', href: '/cart' },
    ...(user
      ? [
          { icon: ListOrdered, label: 'Siparişler', href: '/orders' },
          { icon: User, label: 'Profil', href: '/profile' },
        ]
      : [{ icon: LogIn, label: 'Giriş Yap', href: '/login' }]),
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        
        return (
          <Link key={item.href} href={item.href} className={`nav-item ${isActive ? 'active' : ''}`}>
            <div className={`icon-container ${isActive ? 'active-icon' : ''}`}>
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            </div>
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
          border-top: 1px solid rgba(0,0,0,0.05);
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 0 0.5rem;
          padding-bottom: env(safe-area-inset-bottom, 0px);
          z-index: 100;
          box-shadow: 0 -4px 20px rgba(0,0,0,0.03);
        }

        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 4px;
          color: var(--text-light);
          text-decoration: none;
          font-size: 0.65rem;
          font-weight: 600;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          flex: 1;
          height: 100%;
        }

        .icon-container {
          padding: 4px 12px;
          border-radius: 999px;
          transition: all 0.3s ease;
        }

        .active-icon {
          background-color: var(--primary-light);
          color: var(--primary);
        }

        .nav-item:active .icon-container {
          transform: scale(0.9);
        }

        .nav-item.active {
          color: var(--primary);
        }
        
        .nav-item.active span {
          font-weight: 700;
        }
      `}</style>
    </nav>
  );
}
