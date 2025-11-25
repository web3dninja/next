import { ProductCreateInput } from '@/lib/data/products';

export function validateProductData(data: Partial<ProductCreateInput>): void {
  if (!data.name || !data.brand || !data.price) {
    throw new Error('Name, brand, and price are required');
  }
}

export function validateProductId(id: number | undefined): void {
  if (!id) {
    throw new Error('ID is required');
  }
}

export function normalizeRedditKeyword(keyword: string): string {
  return keyword.toLowerCase().trim();
}
