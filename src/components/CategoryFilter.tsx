'use client';
import { categories } from '@/data/products';

interface CategoryFilterProps {
  selected: string;
  onChange: (category: string) => void;
  primaryColor: string;
  secondaryColor: string;
}

export default function CategoryFilter({ selected, onChange, primaryColor, secondaryColor }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((cat) => {
        const isActive = selected === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onChange(cat.id)}
            className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
            style={
              isActive
                ? { backgroundColor: primaryColor, color: '#ffffff' }
                : { backgroundColor: '#f3f4f6', color: '#374151' }
            }
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
