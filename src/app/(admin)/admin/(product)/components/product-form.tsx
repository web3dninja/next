'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import { TagsInput } from '@/components/ui/tags-input';
import { createProductAction, updateProductAction } from '../product.actions';
import { Product, ProductCreateInput } from '@/lib/data';
import { Category } from '@/lib/data/category';
import Link from 'next/link';
import { useEffect, useMemo } from 'react';
import { SelectInput } from '@/components/ui/inputs/select-input';
import { generateProductSlug, getLeafCategories } from '@/helpers/product.helper';
import { getCategoryOption } from '@/helper/category.helper';
import { REDDIT_KEYWORD_DELIMITER } from '@/lib/services/reddit/constants';
import { Card, CardContent } from '@/components/ui/card';

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  brand: z.string().min(1, 'Brand is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.string().min(1, 'Price is required'),
  link: z.string().min(1, 'Link is required'),
  image: z.string().min(1, 'Image URL is required'),
  categoryId: z.number().min(1, 'Category is required'),
  redditKeywords: z.array(z.string().min(1)).min(1, 'At least one Reddit keyword is required'),
});

type ProductFormData = z.infer<typeof productSchema>;

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
      redditKeywords: product?.redditKeyword
        ? product.redditKeyword
            .split(REDDIT_KEYWORD_DELIMITER)
            .map(keyword => keyword.trim())
            .filter(Boolean)
        : [],
    },
  });

  const [imageUrl, link, categoryId] = form.watch(['image', 'link', 'categoryId']);

  const selectedOption = useMemo(() => {
    return getCategoryOption(categories, categoryId ?? product?.categoryId ?? null);
  }, [categories, categoryId, product?.categoryId]);

  const leafCategories = getLeafCategories(categories);

  const { mutate: createMutation, isPending: isCreating } = useMutation({
    mutationFn: (data: ProductCreateInput) => createProductAction(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product created successfully!');
    },
    onError: error => {
      toast.error(String(error));
    },
  });

  const { mutate: updateMutation, isPending: isUpdating } = useMutation({
    mutationFn: (data: ProductCreateInput) => updateProductAction(product!.id, data),
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
    const { redditKeywords, ...restData } = data;
    const formattedData: ProductCreateInput = {
      ...restData,
      redditKeyword: redditKeywords.join(REDDIT_KEYWORD_DELIMITER),
    };

    if (mode === 'create') {
      createMutation(formattedData);
    } else {
      updateMutation(formattedData);
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

              <FormField
                control={form.control}
                name="redditKeywords"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reddit Keywords</FormLabel>
                    <FormControl>
                      <TagsInput
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Add keywords (e.g., AirFryer, Air Fryer)"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
