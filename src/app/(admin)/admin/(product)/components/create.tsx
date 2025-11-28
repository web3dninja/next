'use client';

import { useEffect } from 'react';
import { DEFAULT_PRODUCT_FORM_DATA, ProductFormData, productSchema } from '@/lib/schemas';
import { useCreateMutation } from '../hooks/useCreateMutation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Category } from '@/types/category';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { ProductDetailsFields } from './form/product-details-fields';
import { PriceCategoryFields } from './form/price-category-fields';
import { RedditKeywordsField } from './form/reddit-keywords-field';
import { getCategoryOption } from '@/helpers/category';
import { ProductBuyButton } from './form/buy-button';
import { ImagePreview } from '@/components/ui/image-preview';
import { FormWrapper } from './form/wrapper';
import { generateProductSlug } from '@/helpers/product';

interface CreateProductFormProps {
  categories: Category[];
}

export function CreateProductForm({ categories }: CreateProductFormProps) {
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: DEFAULT_PRODUCT_FORM_DATA,
  });

  const { mutate, isPending } = useCreateMutation();

  const [imageUrl, link] = form.watch(['image', 'link']);
  const [brand, name] = form.watch(['brand', 'name']);

  useEffect(() => {
    const nextSlug = generateProductSlug(brand, name);
    form.setValue('slug', nextSlug);
  }, [brand, name]);

  return (
    <Form {...form}>
      <FormWrapper onSubmit={form.handleSubmit(data => mutate(data))}>
        <div className="mx-auto w-80 sm:w-64">
          <ImagePreview
            value={imageUrl}
            className="relative w-full overflow-hidden rounded-lg pb-[100%]"
          />
          <ProductBuyButton link={link} />
        </div>
        <div className="flex-1 space-y-4">
          <ProductDetailsFields form={form} isPending={isPending} />

          <PriceCategoryFields
            form={form}
            isPending={isPending}
            leafCategories={categories}
            selectedOption={getCategoryOption(categories, form.watch('categoryId'))}
          />

          <RedditKeywordsField form={form} isPending={isPending} />

          <Button type="submit" className="w-full" size="xl" disabled={isPending}>
            {isPending ? 'Saving...' : 'Create Product'}
          </Button>
        </div>
      </FormWrapper>
    </Form>
  );
}
