import React from 'react';
import { Film } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No anime entries found",
  description = "Try adjusting your filters or search keywords to discover titles in your universe.",
  actionText,
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-12 h-12 rounded-[3px] bg-[#1A1D2A] flex items-center justify-center mb-5 text-[#64748B]">
        <Film className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold text-[#F8FAFC] mb-1">{title}</h3>
      <p className="text-sm text-[#94A3B8] max-w-md mb-6">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 bg-[#FF2E4D] hover:bg-[#FF4D66] text-white text-sm font-semibold rounded-[6px] transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
