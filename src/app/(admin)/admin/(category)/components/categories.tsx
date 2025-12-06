'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { CategoryWithCount } from '@/types/category';
import { SearchInput } from '@/components/ui/search-input';
import { EmptyState } from '@/components/ui/empty-state';
import { PlusIcon } from 'lucide-react';
import { buildCategoryTree } from '@/helpers/category';
import { BackButton } from '@/components/ui/back-button';
import { Button } from '@/components/ui/button';
import { CategoriesList } from './categories-list';

interface CategoriesProps {
  categories: CategoryWithCount[];
}

export function Categories({ categories }: CategoriesProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = useMemo(
    () =>
      categories.filter(
        category =>
          category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          category.slug.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [categories, searchTerm],
  );

  const filteredTree = useMemo(
    () => buildCategoryTree(filteredCategories),
    [filteredCategories],
  ) as CategoryWithCount[];

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <div className="content-header container">
        <BackButton href="/admin" label="Admin" />
        <h1>Categories</h1>
        <div className="flex-1" />
        <SearchInput
          value={searchTerm}
          onChange={onSearchChange}
          placeholder="Search categories..."
        />
        <Button variant="outline" size="md" asChild>
          <Link href="/admin/categories/create">
            <PlusIcon className="mr-2 size-4" />
            Add Category
          </Link>
        </Button>
      </div>

      <div className="content container">
        <CategoriesList categories={filteredTree} />
        <EmptyState show={filteredTree?.flat().length === 0}>No categories found</EmptyState>
      </div>
    </>
  );
}
