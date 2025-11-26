'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { CategoryWithRelations } from '@/types/category';
import { Item, ItemContent, ItemDescription, ItemGroup, ItemTitle } from '@/components/ui/item';
import { SearchInput } from '@/components/ui/search-input';
import { EmptyState } from '@/components/ui/empty-state';
import { Badge } from '@/components/ui/badge';
import { FolderIcon, FolderTreeIcon } from 'lucide-react';
import { getCategoryPath } from '@/helpers/category';

interface CategoriesListProps {
  categories: CategoryWithRelations[];
}

export function CategoriesList({ categories }: CategoriesListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = categories.filter(
    category =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.slug.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <SearchInput value={searchTerm} onChange={setSearchTerm} placeholder="Search categories..." />

      <ItemGroup className="gap-4">
        {filteredCategories.map(category => (
          <Item key={category.id} variant="outline" asChild>
            <Link href={`/admin/category/${category.slug}`}>
              <ItemContent>
                <div className="flex items-center gap-2">
                  {category.parentId ? (
                    <FolderIcon className="size-4 text-zinc-500 dark:text-zinc-400" />
                  ) : (
                    <FolderTreeIcon className="size-4 text-zinc-500 dark:text-zinc-400" />
                  )}
                  <ItemTitle>
                    {category.name}
                    {category._count && category._count.products > 0 && (
                      <Badge variant="default" className="text-xs">
                        {category._count.products} products
                      </Badge>
                    )}
                  </ItemTitle>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <ItemDescription>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      Slug: {category.slug}
                    </span>
                  </ItemDescription>

                  {category.parent && (
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      • Parent: {category.parent.name}
                    </span>
                  )}
                  {category.children && category.children.length > 0 && (
                    <Badge variant="outline" className="text-xs">
                      {category.children.length} subcategories
                    </Badge>
                  )}
                </div>
                {category.parent && (
                  <div className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
                    Path: {getCategoryPath(category)}
                  </div>
                )}
              </ItemContent>
            </Link>
          </Item>
        ))}
      </ItemGroup>
      <EmptyState show={filteredCategories.length === 0}>No categories found</EmptyState>
    </>
  );
}
