import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { TagsInput } from '@/components/ui/tags-input';
import { ProductFormData } from '@/lib/schemas';
import { UseFormReturn } from 'react-hook-form';
import { useRedditKeywordTags } from '../../hooks/useRedditKeywordTags';

interface RedditKeywordsFieldProps {
  form: UseFormReturn<ProductFormData>;
  isPending: boolean;
}

export function RedditKeywordsField({ form, isPending }: RedditKeywordsFieldProps) {
  const { tags, setTags } = useRedditKeywordTags(form.watch('redditKeyword'), form);

  return (
    <FormField
      control={form.control}
      name="redditKeyword"
      render={() => (
        <FormItem>
          <FormLabel>Reddit Keywords</FormLabel>
          <FormControl>
            <TagsInput
              disabled={isPending}
              placeholder="Add tags..."
              value={tags}
              onChange={setTags}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
