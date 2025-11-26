import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { logoutAction } from '@/actions/user';

export function useLogoutMutation() {
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: logoutAction,
    onSuccess: () => {
      queryClient.setQueryData(['user'], null);
      toast.success('You have been logged out!');
    },
    onError: error => {
      toast.error(String(error));
    },
  });

  return logoutMutation;
}
