import { Checkbox } from '@/components/ui/checkbox';

export function Brands({
  allBrands,
  onFilterChange,
  filters,
}: {
  allBrands: string[];
  onFilterChange: (key: string, value: any) => void;
  filters: { brands: string[] };
}) {
  return allBrands.map(brand => (
    <div key={brand} className="flex items-center space-x-2">
      <Checkbox
        id={`brand-${brand}`}
        checked={filters.brands?.includes(brand)}
        onCheckedChange={() => {
          const currentBrands = filters.brands || [];
          const newBrands = currentBrands.includes(brand)
            ? currentBrands.filter((b: string) => b !== brand)
            : [...currentBrands, brand];
          onFilterChange('brands', newBrands);
        }}
      />
      <label
        htmlFor={`brand-${brand}`}
        className="flex-1 cursor-pointer text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {brand}
      </label>
    </div>
  ));
}
