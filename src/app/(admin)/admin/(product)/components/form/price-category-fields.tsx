import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { SelectInput } from '@/components/ui/inputs/select-input';
import type { ProductFormData } from '@/lib/schemas/product';
import type { Category } from '@/types/category';

interface PriceCategoryFieldsProps {
  form: UseFormReturn<ProductFormData>;
  isPending: boolean;
  leafCategories: Category[];
  selectedOption: { value: string; key: string | number } | null;
}

export function PriceCategoryFields({
  form,
  isPending,
  leafCategories,
  selectedOption,
}: PriceCategoryFieldsProps) {
  return (
    <div className="flex gap-4">
      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>Price</FormLabel>
            <FormControl>
              <Input placeholder="99.99" disabled={isPending} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="categoryId"
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>Category</FormLabel>
            <FormControl>
              <SelectInput
                disabled={isPending}
                option={selectedOption}
                placeholder="Select category..."
                options={leafCategories.map(category => ({
                  value: category.name,
                  key: category.id,
                }))}
                onChange={option => field.onChange(option?.key)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
