import type { Metadata } from 'next';
import { Fraunces, DM_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import ChatButton from '@/components/ChatButton';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  axes: ['opsz', 'SOFT', 'WONK'],
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-geist',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'FindStudio, Sewa Alat & Studio untuk Kreator',
  description:
    'Platform terpadu untuk fotografer, videografer, dan sinematografer. Sewa kamera, lensa, drone, studio, dan jasa editor, semua dalam satu tempat.',
  keywords: ['sewa kamera', 'sewa studio', 'rental lensa', 'jasa editor', 'kreator konten'],
  icons: { icon: '/favicon.png' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${fraunces.variable} ${dmSans.variable} ${jetbrains.variable}`}>
      <body className="grain min-h-screen antialiased">
        {children}
        <ChatButton />
      </body>
    </html>
  );
}
