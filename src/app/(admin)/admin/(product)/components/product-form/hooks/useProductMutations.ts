import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createProductAction, updateProductAction } from '@/actions/product';
import type { ProductFormData } from '@/lib/schemas/product';
import type { Product } from '@/types/product';

interface UseProductMutationsProps {
  mode: 'create' | 'update';
  product?: Product;
}

export function useProductMutations({ mode, product }: UseProductMutationsProps) {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: (data: ProductFormData) => createProductAction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product created successfully!');
    },
    onError: error => {
      toast.error(String(error));
    },
  });

  const update = useMutation({
    mutationFn: (data: ProductFormData) => updateProductAction(product!.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', product!.id] });
      toast.success('Product updated successfully!');
    },
    onError: error => {
      toast.error(String(error));
    },
  });

  const isPending = create.isPending || update.isPending;

  const mutate = mode === 'create' ? create.mutate : update.mutate;

  return { mutate, isPending };
}
