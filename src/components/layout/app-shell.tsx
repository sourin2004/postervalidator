'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { cn } from '@/lib/utils';

export function AppShell({ children, actions }: { children: React.ReactNode, actions?: React.ReactNode }) {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Validator' },
    { href: '/overview', label: 'Overview' },
    { href: '/documentation', label: 'Documentation' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/resource', label: 'Resource' },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <div className="mr-4 flex items-center">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold font-headline text-lg text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">
                PosterValidator
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'transition-colors hover:text-primary',
                    pathname === link.href ? 'text-foreground font-semibold' : 'text-muted-foreground'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end gap-2">
            {actions}
          </div>
        </div>
      </header>
      <main className="flex flex-1 flex-col items-center p-4 sm:p-8 md:p-12">
        {children}
      </main>
      <footer className="py-6 md:px-8 md:py-0 border-t border-border/40">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} PosterValidator. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
             <Link href="/terms" className="transition-colors hover:text-primary">Site Terms</Link>
             <Link href="/privacy" className="transition-colors hover:text-primary">Privacy</Link>
             <Link href="#" className="transition-colors hover:text-primary">Cookie Preference</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
