import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { TagsInput } from '@/components/ui/tags-input';

interface RedditKeywordsFieldProps {
  tags: string[];
  setTags: (tags: string[]) => void;
  isPending: boolean;
}

export function RedditKeywordsField({ tags, setTags, isPending }: RedditKeywordsFieldProps) {
  return (
    <FormItem>
      <FormLabel>Reddit Keywords</FormLabel>
      <FormControl>
        <TagsInput value={tags} onChange={setTags} disabled={isPending} />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
