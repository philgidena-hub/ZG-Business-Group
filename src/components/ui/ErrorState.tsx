'use client';

import { cn } from '@/lib/utils';
import { Text } from './Typography';

// =====================================================
// Error State Component
// Reusable error display with retry functionality
// =====================================================

export interface ErrorStateProps {
  /** Error message to display */
  message?: string;
  /** Callback when retry button is clicked */
  onRetry?: () => void;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Additional className */
  className?: string;
}

export function ErrorState({
  message = 'Something went wrong. Please try again later.',
  onRetry,
  size = 'md',
  className,
}: ErrorStateProps) {
  const sizes = {
    sm: {
      icon: 'w-10 h-10',
      padding: 'py-8',
      text: 'text-sm',
      button: 'px-4 py-1.5 text-xs',
    },
    md: {
      icon: 'w-16 h-16',
      padding: 'py-16',
      text: 'text-base',
      button: 'px-6 py-2 text-sm',
    },
    lg: {
      icon: 'w-20 h-20',
      padding: 'py-24',
      text: 'text-lg',
      button: 'px-8 py-3 text-base',
    },
  };

  const s = sizes[size];

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        s.padding,
        className
      )}
      role="alert"
      aria-live="polite"
    >
      {/* Warning Icon */}
      <svg
        className={cn(s.icon, 'text-neutral-300 mb-4')}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
        />
      </svg>

      {/* Message */}
      <Text color="muted" className={cn('mb-4 max-w-md', s.text)}>
        {message}
      </Text>

      {/* Retry Button */}
      {onRetry && (
        <button
          onClick={onRetry}
          className={cn(
            'font-medium text-earth-anchor border border-earth-anchor rounded',
            'hover:bg-earth-anchor hover:text-white transition-colors',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-highland-gold focus-visible:ring-offset-2',
            s.button
          )}
        >
          Try Again
        </button>
      )}
    </div>
  );
}

// =====================================================
// Empty State Component
// For when there's no data to display
// =====================================================

export interface EmptyStateProps {
  /** Title */
  title?: string;
  /** Description */
  description?: string;
  /** Icon type */
  icon?: 'inbox' | 'search' | 'folder' | 'document';
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Additional className */
  className?: string;
  /** Action element */
  action?: React.ReactNode;
}

const emptyIcons = {
  inbox: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-17.364 0V6.375c0-1.036.84-1.875 1.875-1.875h14.25c1.035 0 1.875.84 1.875 1.875v7.125m-17.364 0h17.364m-17.364 0c-1.035 0-1.875.84-1.875 1.875v.938c0 1.035.84 1.875 1.875 1.875h14.25c1.035 0 1.875-.84 1.875-1.875v-.938c0-1.035-.84-1.875-1.875-1.875"
    />
  ),
  search: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    />
  ),
  folder: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
    />
  ),
  document: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
    />
  ),
};

export function EmptyState({
  title = 'No data found',
  description,
  icon = 'inbox',
  size = 'md',
  className,
  action,
}: EmptyStateProps) {
  const sizes = {
    sm: {
      icon: 'w-10 h-10',
      padding: 'py-8',
      title: 'text-base',
      description: 'text-sm',
    },
    md: {
      icon: 'w-16 h-16',
      padding: 'py-16',
      title: 'text-lg',
      description: 'text-base',
    },
    lg: {
      icon: 'w-20 h-20',
      padding: 'py-24',
      title: 'text-xl',
      description: 'text-lg',
    },
  };

  const s = sizes[size];

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        s.padding,
        className
      )}
    >
      {/* Icon */}
      <svg
        className={cn(s.icon, 'text-neutral-300 mb-4')}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1}
        aria-hidden="true"
      >
        {emptyIcons[icon]}
      </svg>

      {/* Title */}
      <p className={cn('font-medium text-earth-anchor mb-2', s.title)}>
        {title}
      </p>

      {/* Description */}
      {description && (
        <Text color="muted" className={cn('max-w-md mb-4', s.description)}>
          {description}
        </Text>
      )}

      {/* Action */}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

export default ErrorState;
