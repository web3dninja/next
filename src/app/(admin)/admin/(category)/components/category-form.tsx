'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { createCategoryAction, updateCategoryAction } from '@/actions/category';
import type { Category } from '@/types/category';
import { useEffect, useMemo } from 'react';
import { SelectInput } from '@/components/ui/inputs/select-input';
import { generateSlug, getDescendantCategoryIds } from '@/helpers/product.helper';
import { getCategoryOption } from '@/helpers/category';
import { categorySchema, type CategoryFormData } from '@/lib/schemas';

interface CategoryFormProps {
  mode: 'create' | 'update';
  category?: Category;
  categories: Category[];
  onSuccess?: () => void;
}

export function CategoryForm({ mode, category, categories, onSuccess }: CategoryFormProps) {
  const queryClient = useQueryClient();

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name ?? '',
      slug: category?.slug ?? '',
      icon: category?.icon ?? null,
      parentId: category?.parentId ?? null,
    },
  });

  const watchedName = form.watch('name');
  const watchedParentId = form.watch('parentId');

  const selectedOption = useMemo(() => {
    return getCategoryOption(categories, watchedParentId ?? category?.parentId ?? null);
  }, [categories, watchedParentId]);

  useEffect(() => {
    const slug = generateSlug(watchedName || '');

    form.setValue('slug', slug);
  }, [watchedName, form]);

  const excludedIds = category ? getDescendantCategoryIds(categories, category.id) : [];
  const availableParents = categories.filter(c => !excludedIds.includes(c.id));

  const { mutate: createMutation, isPending: isCreating } = useMutation({
    mutationFn: (data: CategoryFormData) => createCategoryAction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category created successfully!');
      onSuccess?.();
    },
    onError: error => {
      toast.error(String(error));
    },
  });

  const { mutate: updateMutation, isPending: isUpdating } = useMutation({
    mutationFn: (data: CategoryFormData) => updateCategoryAction(category!.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['category', category!.id] });
      toast.success('Category updated successfully!');
      onSuccess?.();
    },
    onError: error => {
      toast.error(String(error));
    },
  });

  const isPending = isCreating || isUpdating;

  const onSubmit = (data: CategoryFormData) => {
    if (mode === 'create') {
      createMutation(data);
    } else {
      updateMutation(data);
    }
  };

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Category name" disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="category-slug" disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon (optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="icon-name"
                      disabled={isPending}
                      {...field}
                      value={field.value ?? ''}
                      onChange={e => field.onChange(e.target.value || null)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="parentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent Category (optional)</FormLabel>
                  <FormControl>
                    <SelectInput
                      option={selectedOption}
                      placeholder="Select parent category..."
                      options={[
                        { value: 'None (Root Category)', key: 0 },
                        ...availableParents.map(cat => ({
                          value: cat.name,
                          key: cat.id,
                        })),
                      ]}
                      onChange={option =>
                        field.onChange(option?.key === 0 ? null : (option?.key ?? null))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" size="xl" disabled={isPending}>
              {isPending ? 'Saving...' : 'Save Category'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
