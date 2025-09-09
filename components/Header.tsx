import Link from 'next/link';
import React from 'react';

export default function Header({ current }: { current?: string }) {
  const items = [
     { href: '/auth/signup', label: 'Sign Up' },
    { href: '/register', label: 'Admin' },
    { href: '/verify-email', label: 'Verify Email' },
    { href: '/verify-phone', label: 'Verify Phone' },
    { href: '/kyc', label: 'KYC' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/profile', label: 'Profile' },
    { href: '/notifications', label: 'Notifications' },
    // { href: '/auth/signin', label: 'Sign In' },
   

  ];

  return (
    <header className="bg-indigo-700 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo / Title */}
        <div>
          <h1 className="text-xl font-bold text-white tracking-wide">
            LMS Admin
          </h1>
          <p className="text-xs text-indigo-200">Signup & KYC Portal</p>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex gap-1">
          {items.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                current === i.href
                  ? 'bg-white text-indigo-700 shadow'
                  : 'text-white hover:bg-indigo-600 hover:text-white'
              }`}
            >
              {i.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
