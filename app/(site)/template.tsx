'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface SiteTemplateProps {
  children: React.ReactNode;
}

/**
 * Remounts on every navigation, giving each route a short editorial
 * entrance. Honours the OS reduced-motion preference.
 */
export default function SiteTemplate({ children }: SiteTemplateProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.25,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}