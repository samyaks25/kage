'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search } from 'lucide-react';

interface SearchTriggerProps {
  onSearch: (query: string) => void;
}

/**
 * Subtle expandable search — a quiet icon that expands into an
 * input field. Never a permanently dominant boxed input.
 */
export const SearchTrigger: React.FC<SearchTriggerProps> = ({ onSearch }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isExpanded) {
      inputRef.current?.focus();
    }
  }, [isExpanded]);

  const collapse = () => {
    setIsExpanded(false);
    setQuery('');
  };

  const submit = () => {
    onSearch(query.trim());
    collapse();
  };

  return (
    <div className="flex items-center">
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.span
            key="search-input"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 190, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') submit();
                if (e.key === 'Escape') collapse();
              }}
              onBlur={collapse}
              placeholder="Search titles..."
              aria-label="Search anime"
              className="h-9 w-48 px-3 bg-[#12141D] border border-[#334155] border-r-0 rounded-l-[3px] text-sm text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:border-[#FF2E4D]/60"
            />
          </motion.span>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => (isExpanded ? submit() : setIsExpanded(true))}
        aria-label={isExpanded ? 'Submit search' : 'Open search'}
        className={`h-9 w-9 flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D] ${
          isExpanded
            ? 'bg-[#FF2E4D] hover:bg-[#FF4D66] text-white rounded-r-[3px]'
            : 'text-[#94A3B8] hover:text-[#F8FAFC] rounded-[3px]'
        }`}
      >
        <Search className="w-4 h-4" />
      </button>
    </div>
  );
};
