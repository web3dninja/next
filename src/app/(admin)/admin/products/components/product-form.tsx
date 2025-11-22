'use client';

import { useRouter } from 'next/navigation';
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
import { createProductAction, updateProductAction } from '../product.actions';
import { Product } from '@/lib/data';

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  brand: z.string().min(1, 'Brand is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.string().min(1, 'Price is required'),
  link: z.string().min(1, 'Link is required'),
  image: z.string().min(1, 'Image URL is required'),
  category: z.string().min(1, 'Category is required'),
});

type ProductFormData = Omit<Product, 'id'>;

interface ProductFormProps {
  mode: 'create' | 'update';
  product?: Product;
}

export function ProductForm({ mode, product }: ProductFormProps) {
  const router = useRouter();

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
    },
  });

  const imageUrl = form.watch('image');

  const { mutate: createMutation, isPending: isCreating } = useMutation({
    mutationFn: (data: ProductFormData) => createProductAction(data),
    onSuccess: () => {
      toast.success('Product created successfully!');
      router.push('/admin/products');
    },
    onError: error => {
      toast.error(String(error));
    },
  });

  const { mutate: updateMutation, isPending: isUpdating } = useMutation({
    mutationFn: (data: ProductFormData) => updateProductAction(product!.id, data),
    onSuccess: () => {
      toast.success('Product updated successfully!');
      router.push('/admin/products');
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto max-w-165 space-y-4">
        <div className="flex gap-6">
          <div className="shrink-0 space-y-2">
            <ImagePreview value={imageUrl} className="size-64" />
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
