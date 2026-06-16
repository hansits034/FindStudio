'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { getUser } from '@/lib/api';

export default function ChatButton() {
  const pathname = usePathname();
  const [isClientUser, setIsClientUser] = useState(false);

  useEffect(() => {
    setIsClientUser(getUser()?.role === 'CLIENT');
  }, [pathname]);

  const isVendorOrAdmin = pathname.startsWith('/dashboard/vendor') || pathname.startsWith('/dashboard/admin');

  if (isVendorOrAdmin || !isClientUser) return null;

  return (
    <Link
      href="/messages"
      aria-label="Chat"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-amber-400 text-ink-900 shadow-[0_8px_32px_rgba(249,177,122,0.4)] hover:scale-110 hover:shadow-[0_8px_40px_rgba(249,177,122,0.6)] transition-all duration-200"
    >
      <MessageCircle className="w-6 h-6" strokeWidth={2} />
    </Link>
  );
}
