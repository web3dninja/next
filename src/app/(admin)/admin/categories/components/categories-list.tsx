'use client';

import { useState } from 'react';
import type { CategoryWithRelations } from '@/lib/data/category';
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from '@/components/ui/item';
import { SearchInput } from '@/components/ui/search-input';
import { EmptyState } from '@/components/ui/empty-state';
import { Badge } from '@/components/ui/badge';
import { FolderIcon, FolderTreeIcon } from 'lucide-react';

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

  const getCategoryPath = (category: CategoryWithRelations): string => {
    const path: string[] = [];
    let current: CategoryWithRelations | null = category;

    while (current) {
      path.unshift(current.name);
      current = current.parent as CategoryWithRelations | null;
    }

    return path.join(' > ');
  };

  return (
    <>
      <SearchInput
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search categories..."
      />

      <ItemGroup className="gap-4">
        {filteredCategories.map(category => (
          <Item key={category.id} variant="outline">
            <ItemContent>
              <div className="flex items-center gap-2">
                {category.parentId ? (
                  <FolderIcon className="size-4 text-zinc-500 dark:text-zinc-400" />
                ) : (
                  <FolderTreeIcon className="size-4 text-zinc-500 dark:text-zinc-400" />
                )}
                <ItemTitle>{category.name}</ItemTitle>
              </div>
              <ItemDescription>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    Slug: {category.slug}
                  </span>
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
                  {category._count && category._count.products > 0 && (
                    <Badge variant="default" className="text-xs">
                      {category._count.products} products
                    </Badge>
                  )}
                </div>
                {category.parent && (
                  <div className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">
                    Path: {getCategoryPath(category)}
                  </div>
                )}
              </ItemDescription>
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
      <EmptyState show={filteredCategories.length === 0}>
        No categories found
      </EmptyState>
    </>
  );
}

