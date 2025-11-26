'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ImagePreview } from '@/components/ui/image-preview';
import { createProductAction, updateProductAction } from '@/actions/product';
import type { Product } from '@/types/product';
import type { Category } from '@/types/category';
import Link from 'next/link';
import { useMemo, useState, useEffect } from 'react';
import { SelectInput } from '@/components/ui/inputs/select-input';
import { TagsInput } from '@/components/ui/tags-input';
import { getLeafCategories } from '@/helpers/product.helper';
import { getCategoryOption } from '@/helpers/category';
import { Card, CardContent } from '@/components/ui/card';
import { productSchema, type ProductFormData } from '@/lib/schemas/product';
import { REDDIT_KEYWORD_DELIMITER } from '@/lib/services/reddit/constants';

interface ProductFormProps {
  mode: 'create' | 'update';
  product?: Product;
  categories: Category[];
}

export function ProductForm({ mode, product, categories }: ProductFormProps) {
  const queryClient = useQueryClient();

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name ?? '',
      slug: product?.slug ?? '',
      brand: product?.brand ?? '',
      description: product?.description ?? '',
      price: product?.price ?? '',
      link: product?.link ?? '',
      image: product?.image ?? '',
      categoryId: product?.categoryId ?? undefined,
      redditKeyword: product?.redditKeyword ?? '',
    },
  });

  const [tags, setTags] = useState<string[]>(() => {
    const keyword = product?.redditKeyword ?? '';
    return keyword ? keyword.split(REDDIT_KEYWORD_DELIMITER).map(tag => tag.trim()) : [];
  });

  useEffect(() => {
    const tagsString = tags.join(REDDIT_KEYWORD_DELIMITER);
    form.setValue('redditKeyword', tagsString);
  }, [tags, form]);

  const [imageUrl, link, categoryId] = form.watch(['image', 'link', 'categoryId']);

  const selectedOption = useMemo(() => {
    return getCategoryOption(categories, categoryId ?? product?.categoryId ?? null);
  }, [categories, categoryId, product?.categoryId]);

  const leafCategories = getLeafCategories(categories);

  const { mutate: createMutation, isPending: isCreating } = useMutation({
    mutationFn: (data: ProductFormData) => createProductAction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product created successfully!');
    },
    onError: error => {
      toast.error(String(error));
    },
  });

  const { mutate: updateMutation, isPending: isUpdating } = useMutation({
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

  const isPending = isCreating || isUpdating;

  const onSubmit = (data: ProductFormData) => {
    if (mode === 'create') {
      createMutation(data);
    } else {
      updateMutation(data);
    }
  };

  return (
    <Form {...form}>
      <Card className="mx-auto max-w-4xl">
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-6">
            <div className="mx-auto w-80 sm:w-64">
              <ImagePreview
                value={imageUrl}
                className="relative w-full overflow-hidden rounded-lg pb-[100%]"
              />

              <Button asChild size="xl" className="mt-4 w-full">
                <Link href={link ?? ''} target="_blank" rel="noopener noreferrer">
                  Buy on Amazon
                </Link>
              </Button>
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand</FormLabel>
                      <FormControl>
                        <Input placeholder="Brand name" disabled={isPending} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex-2">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Product name" disabled={isPending} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Path</FormLabel>
                    <FormControl>
                      <Input placeholder="product-slug" disabled={isPending} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Product description"
                        disabled={isPending}
                        {...field}
                        className="max-h-50"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input placeholder="99.99" disabled={isPending} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <SelectInput
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

              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" disabled={isPending} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/image.jpg"
                        disabled={isPending}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel>Reddit Keywords</FormLabel>
                <FormControl>
                  <TagsInput value={tags} onChange={setTags} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>

              <Button type="submit" className="w-full" size="xl" disabled={isPending}>
                {isPending ? 'Saving...' : 'Save Product'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </Form>
  );
}
