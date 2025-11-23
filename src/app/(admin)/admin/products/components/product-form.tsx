'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
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
import { Product } from '@/lib/data';
import Link from 'next/link';

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  brand: z.string().min(1, 'Brand is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.string().min(1, 'Price is required'),
  link: z.string().min(1, 'Link is required'),
  image: z.string().min(1, 'Image URL is required'),
  category: z.string().min(1, 'Category is required'),
  redditKeywords: z.array(z.string().min(1)).min(1, 'At least one Reddit keyword is required'),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  mode: 'create' | 'update';
  product?: Product;
}

export function ProductForm({ mode, product }: ProductFormProps) {
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name ?? '',
      brand: product?.brand ?? '',
      description: product?.description ?? '',
      price: product?.price ?? '',
      link: product?.link ?? '',
      image: product?.image ?? '',
      category: product?.category ?? '',
      redditKeywords: product?.redditKeyword
        ? product.redditKeyword.split('-').filter(Boolean)
        : [],
    },
  });

  const imageUrl = form.watch('image');

  const { mutate: createMutation, isPending: isCreating } = useMutation({
    mutationFn: (data: Omit<Product, 'id' | 'redditStats'>) => createProductAction(data),
    onSuccess: () => {
      toast.success('Product created successfully!');
    },
    onError: error => {
      toast.error(String(error));
    },
  });

  const { mutate: updateMutation, isPending: isUpdating } = useMutation({
    mutationFn: (data: Omit<Product, 'id' | 'redditStats'>) =>
      updateProductAction(product!.id, data),
    onSuccess: () => {
      toast.success('Product updated successfully!');
    },
    onError: error => {
      toast.error(String(error));
    },
  });

  const isPending = isCreating || isUpdating;

  const onSubmit = (data: ProductFormData) => {
    const { redditKeywords, ...restData } = data;
    const formattedData: Omit<Product, 'id' | 'redditStats'> = {
      ...restData,
      redditKeyword: redditKeywords.join('-'),
    };

    if (mode === 'create') {
      createMutation(formattedData);
    } else {
      updateMutation(formattedData);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto max-w-4xl space-y-4">
        <div className="flex gap-6">
          <div className="mx-auto w-80 sm:w-64">
            <ImagePreview
              value={imageUrl}
              className="relative w-full overflow-hidden rounded-lg pb-[100%]"
            />

            <Button asChild size="xl" className="mt-4 w-full">
              <Link href={product?.link ?? ''} target="_blank" rel="noopener noreferrer">
                Buy on Amazon
              </Link>
            </Button>
          </div>

          <div className="flex-1 space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Product name" disabled={isPending} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
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
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Electronics, Clothing, etc."
                        disabled={isPending}
                        {...field}
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

            <Button type="submit" className="w-full" disabled={isPending}>
              {mode === 'create'
                ? isPending
                  ? 'Creating...'
                  : 'Create Product'
                : isPending
                  ? 'Updating...'
                  : 'Update Product'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
