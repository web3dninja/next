'use client';

import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

export interface PriceRange {
  min: number;
  max: number;
}

export interface PriceRangeFilterProps {
  priceRange: PriceRange;
  currentRange: [number, number] | null | undefined;
  onPriceChange: (range: [number, number]) => void;
}

export function PriceRangeFilter({
  priceRange,
  currentRange,
  onPriceChange,
}: PriceRangeFilterProps) {
  const minValue =
    currentRange?.[0] !== null && currentRange?.[0] !== undefined
      ? currentRange[0]
      : priceRange.min;
  const maxValue =
    currentRange?.[1] !== null && currentRange?.[1] !== undefined
      ? currentRange[1]
      : priceRange.max;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold">Price Range</Label>
        <span className="text-muted-foreground text-sm">
          ${minValue} - ${maxValue}
        </span>
      </div>

      <div className="space-y-2">
        <Slider
          min={priceRange.min}
          max={priceRange.max}
          step={10}
          minStepsBetweenThumbs={1}
          value={[minValue, maxValue]}
          onValueChange={(values: number[]) => {
            onPriceChange([values[0], values[1]]);
          }}
          className="w-full"
        />
      </div>
    </div>
  );
}
