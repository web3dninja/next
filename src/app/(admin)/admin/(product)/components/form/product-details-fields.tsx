import { UseFormReturn } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import type { ProductFormData } from '@/lib/schemas';

interface ProductDetailsFieldsProps {
  form: UseFormReturn<ProductFormData>;
  isPending: boolean;
}

export function ProductDetailsFields({ form, isPending }: ProductDetailsFieldsProps) {
  return (
    <>
      <FormField
        control={form.control}
        name="amazonProductId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Amazon Product ID (ASIN)</FormLabel>
            <FormControl>
              <Input placeholder="e.g. B085LT31HP" disabled={isPending} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="link"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Custom Link (optional)</FormLabel>
            <FormControl>
              <Input placeholder="https://example.com/product" disabled={isPending} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
