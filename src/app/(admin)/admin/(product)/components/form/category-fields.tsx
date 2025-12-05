import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { SelectInput } from '@/components/ui/inputs/select-input';
import type { ProductFormData } from '@/lib/schemas';
import type { Category } from '@/types/category';

interface CategoryFieldProps {
  form: UseFormReturn<ProductFormData>;
  isPending: boolean;
  leafCategories: Category[];
  selectedOption: { value: string; key: string | number } | null;
}

export function CategoryField({
  form,
  isPending,
  leafCategories,
  selectedOption,
}: CategoryFieldProps) {
  return (
    <div className="flex gap-4">
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
