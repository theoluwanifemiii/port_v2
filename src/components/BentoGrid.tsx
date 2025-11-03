import { ReactNode } from 'react';

interface BentoItemProps {
  children: ReactNode;
  className?: string;
  colSpan?: 1 | 2 | 3;
  rowSpan?: 1 | 2;
  variant?: 'default' | 'accent' | 'dark' | 'gradient';
}

export const BentoItem = ({
  children,
  className = '',
  colSpan = 1,
  rowSpan = 1,
  variant = 'default',
}: BentoItemProps) => {
  const baseClasses = 'rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg';

  const variantClasses = {
    default: 'bg-white border border-gray-200',
    accent: 'bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200',
    dark: 'bg-gray-900 text-white border border-gray-800',
    gradient: 'bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 text-white',
  };

  const colSpanClass = {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
  };

  const rowSpanClass = {
    1: 'row-span-1',
    2: 'row-span-2',
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${colSpanClass[colSpan]} ${rowSpanClass[rowSpan]} ${className}`}
    >
      {children}
    </div>
  );
};

interface BentoGridProps {
  children: ReactNode;
  cols?: number;
}

export const BentoGrid = ({ children, cols = 3 }: BentoGridProps) => {
  const gridColsClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  }[cols] || 'grid-cols-3';

  return (
    <div
      className={`grid ${gridColsClass} gap-4 md:gap-6 w-full auto-rows-fr`}
    >
      {children}
    </div>
  );
};
