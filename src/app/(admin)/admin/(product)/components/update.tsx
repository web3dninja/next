'use client';

import { useUpdateMutation } from '../hooks/useUpdateMutation';
import { Category } from '@/types/category';
import { Product } from '@/types/product';
import { ProductFormData, productSchema } from '@/lib/schemas';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductDetailsFields } from './form/product-details-fields';
import { PriceCategoryFields } from './form/category-fields';
import { RedditKeywordsField } from './form/reddit-keywords-field';
import { Button } from '@/components/ui/button';
import { getCategoryOption } from '@/helpers/category';
import { FormWrapper } from './form/wrapper';

interface UpdateProductFormProps {
  product: Product;
  categories: Category[];
}

export function UpdateProductForm({ product, categories }: UpdateProductFormProps) {
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      categoryId: product.categoryId,
      redditKeyword: product.redditKeyword,
      amazonProductId: product.amazonProductId,
      link: product.link ?? '',
    },
  });

  const { mutate, isPending } = useUpdateMutation({ product });

  return (
    <Form {...form}>
      <FormWrapper onSubmit={form.handleSubmit(data => mutate(data))}>
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
            {isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </FormWrapper>
    </Form>
  );
}
