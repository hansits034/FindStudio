import type { Metadata } from 'next';
import './globals.css';
import ChatButton from '@/components/ChatButton';

export const metadata: Metadata = {
  title: 'FindStudio, Sewa Alat & Studio untuk Kreator',
  description:
    'Platform terpadu untuk fotografer, videografer, dan sinematografer. Sewa kamera, lensa & filter, lighting & grip, drone & aksesoris, studio, dan jasa editor, semua dalam satu tempat.',
  keywords: ['sewa kamera', 'sewa studio', 'rental lensa', 'jasa editor', 'kreator konten'],
  icons: { icon: '/favicon.png' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" style={{ '--font-fraunces': 'Georgia, "Times New Roman", serif', '--font-geist': '"Segoe UI", system-ui, -apple-system, sans-serif', '--font-mono': 'Consolas, "SFMono-Regular", monospace' } as React.CSSProperties}>
      <body className="grain min-h-screen antialiased">
        {children}
        <ChatButton />
      </body>
    </html>
  );
}
