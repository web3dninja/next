import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createProductAction, updateProductAction } from '@/actions/product';
import type { ProductFormData } from '@/lib/schemas';

export function useCreateMutation() {
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

  return create;
}
