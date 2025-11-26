'use client';

import { useState, useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { REDDIT_KEYWORD_DELIMITER } from '@/lib/services';
import type { ProductFormData } from '@/lib/schemas';

export function useRedditKeywordTags(initialKeyword: string, form: UseFormReturn<ProductFormData>) {
  const [tags, setTags] = useState<string[]>(() => {
    return initialKeyword
      ? initialKeyword.split(REDDIT_KEYWORD_DELIMITER).map(tag => tag.trim())
      : [];
  });

  useEffect(() => {
    const tagsString = tags.join(REDDIT_KEYWORD_DELIMITER);
    form.setValue('redditKeyword', tagsString);
  }, [tags, form]);

  return { tags, setTags };
}
