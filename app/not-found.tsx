import React from 'react';
import { NotFoundContent } from '@/components/layout/NotFoundContent';

export default function RootNotFound() {
  return (
    <div className="min-h-screen bg-[#090A0F] text-[#F8FAFC]">
      <NotFoundContent
        code="404"
        title="Page not found"
        description="That URL does not match any destination in the KAGE archive. Use the recovery links below, or head back to the landing page."
      />
    </div>
  );
}