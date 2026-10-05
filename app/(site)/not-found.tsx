import React from 'react';
import { NotFoundContent } from '@/components/layout/NotFoundContent';

export default function SiteNotFound() {
  return (
    <NotFoundContent
      title="This record is not in the archive"
      description="The title, article or profile you requested does not exist in this build. Try the discover index or browse the current season instead."
    />
  );
}