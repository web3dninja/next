import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Checkbox } from '@/components/ui/checkbox';

export function Brands({
  allBrands,
  onFilterChange,
  filters,
}: {
  allBrands: string[];
  onFilterChange: (value: any) => void;
  filters: { brands: string[] };
}) {
  return (
    <ToggleGroup
      type="multiple"
      orientation="vertical"
      value={filters.brands}
      onValueChange={onFilterChange}
      spacing={0.5}
      className="w-full flex-col items-stretch"
    >
      {allBrands.map(brand => (
        <ToggleGroupItem
          key={brand}
          value={brand}
          className="justify-start gap-2 rounded-none"
          asChild
        >
          <div>
            <Checkbox checked={filters.brands.includes(brand)} />
            {brand}
          </div>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
