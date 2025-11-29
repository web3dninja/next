'use client';

import { Label } from '@/components/ui/label';
import { Brands } from './brands';

export interface BrandsFilterProps {
  allBrands: string[];
  selectedBrands: string[];
  onBrandsChange: (brands: string[]) => void;
}

export function BrandsFilter({ allBrands, selectedBrands, onBrandsChange }: BrandsFilterProps) {
  const handleFilterChange = (value: string[]) => {
    onBrandsChange(value);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold">Brands</Label>
      </div>

      <Brands
        allBrands={allBrands}
        onFilterChange={handleFilterChange}
        filters={{ brands: selectedBrands }}
      />
    </div>
  );
}
