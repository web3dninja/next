import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createProductAction, updateProductAction } from '@/actions/product';
import type { ProductFormData } from '@/lib/schemas';
import type { Product } from '@/types/product';

interface UseUpdateMutationProps {
  product?: Product;
}

export function useUpdateMutation({ product }: UseUpdateMutationProps) {
  const queryClient = useQueryClient();

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

  return update;
}
