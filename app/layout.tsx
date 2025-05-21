'use client';

import * as React from 'react';
import './globals.css';
import { ReactNode } from 'react';
import { ThemeProvider } from '~/contexts/theme-context';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body className="bg-background text-white">{children}</body>
      </ThemeProvider>
    </html>
  );
}
