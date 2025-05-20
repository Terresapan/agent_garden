'use client';

import * as React from 'react';
import './globals.css';
import { ReactNode, useEffect } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <html lang="en">
      <body className="bg-background text-white">{children}</body>
    </html>
  );
}
