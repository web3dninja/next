'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import type { Product } from '@/types/product';
import type { Category } from '@/types/category';
import { Card, CardContent } from '@/components/ui/card';
import { productSchema, type ProductFormData } from '@/lib/schemas/product';
import { useProductMutations } from './product-form/hooks/useProductMutations';
import { useRedditKeywordTags } from './product-form/hooks/useRedditKeywordTags';
import { useCategorySelection } from './product-form/hooks/useCategorySelection';
import { ProductImageSection } from './product-form/sections/ProductImageSection';
import { ProductDetailsFields } from './product-form/sections/ProductDetailsFields';
import { PriceCategoryFields } from './product-form/sections/PriceCategoryFields';
import { RedditKeywordsField } from './product-form/sections/RedditKeywordsField';

interface ProductFormProps {
  mode: 'create' | 'update';
  product?: Product;
  categories: Category[];
}

export function ProductForm({ mode, product, categories }: ProductFormProps) {
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

  const { mutate, isPending } = useProductMutations({ mode, product });
  const { tags, setTags } = useRedditKeywordTags(product?.redditKeyword ?? '', form);

  const [imageUrl, link, categoryId] = form.watch(['image', 'link', 'categoryId']);
  const { leafCategories, selectedOption } = useCategorySelection(categories, categoryId);

  const onSubmit = (data: ProductFormData) => mutate(data);

  return (
    <Form {...form}>
      <Card className="mx-auto max-w-4xl">
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-6">
            <ProductImageSection imageUrl={imageUrl} link={link} />

            <div className="flex-1 space-y-4">
              <ProductDetailsFields form={form} isPending={isPending} />

              <PriceCategoryFields
                form={form}
                isPending={isPending}
                leafCategories={leafCategories}
                selectedOption={selectedOption}
              />

              <RedditKeywordsField tags={tags} setTags={setTags} isPending={isPending} />

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
