'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQuery } from '@tanstack/react-query';
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
import { BackButton } from '@/components/ui/back-button';
import { ImagePreview } from '@/components/ui/image-preview';
import { updateProductAction, getProductAction } from '../actions';
import { use } from 'react';

const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  brand: z.string().min(1, 'Brand is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.string().min(1, 'Price is required'),
  link: z.string().min(1, 'Link is required'),
  image: z.string().min(1, 'Image URL is required'),
  category: z.string().min(1, 'Category is required'),
});

type ProductFormData = z.infer<typeof productSchema>;

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function UpdateProductPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const productId = parseInt(id);

  const { data: product, isLoading: productLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductAction(productId),
  });

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      brand: '',
      description: '',
      price: '',
      link: '',
      image: '',
      category: '',
    },
  });

  const imageUrl = form.watch('image');

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        brand: product.brand,
        description: product.description,
        price: product.price,
        link: product.link,
        image: product.image,
        category: product.category,
      });
    }
  }, [product, form]);

  const { mutate: updateMutation, isPending } = useMutation({
    mutationFn: (data: ProductFormData) => updateProductAction(productId, data),
    onSuccess: () => {
      toast.success('Product updated successfully!');
      router.push('/admin/products');
    },
    onError: error => {
      toast.error(String(error));
    },
  });

  const onSubmit = (data: ProductFormData) => {
    updateMutation(data);
  };

  if (productLoading) {
    return (
      <>
        <div className="container">
          <BackButton href="/admin/products" label="Back to Products" />
        </div>
        <div className="content">
          <p className="text-zinc-500 dark:text-zinc-400">Loading...</p>
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <div className="container">
          <BackButton href="/admin/products" label="Back to Products" />
        </div>
        <div className="content">
          <p className="text-zinc-500 dark:text-zinc-400">Product not found</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="container">
        <BackButton href="/admin/products" label="Back to Products" />
      </div>

      <div className="content">
        <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">Update Product</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-3xl">
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
                  {isPending ? 'Updating...' : 'Update Product'}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
