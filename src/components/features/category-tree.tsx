'use client';

import { useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import type { CategoryWithCount } from '@/types/category';
import { getChildrenCategorySlugs, getCategoryTreeProductsCount } from '@/helpers/category';
import { Badge } from '../ui/badge';
import { useFiltersContext } from '@/modules/filters/context';

interface CategoryTreeProps {
  tree: CategoryWithCount[];
  currentSlug?: string;
}

function CategoryMenuItem({
  category,
  tree,
}: {
  category: CategoryWithCount;
  tree: CategoryWithCount[];
}) {
  const { onFilterChange } = useFiltersContext();

  const categoryPath = getChildrenCategorySlugs(category);

  if (category.children && category.children.length > 0) {
    return (
      <DropdownMenuSub>
        <DropdownMenuSubTrigger
          onClick={() => {
            onFilterChange('category', categoryPath);
          }}
        >
          {category.name} <Badge variant="outline">{getCategoryTreeProductsCount(category)}</Badge>
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent>
          {category.children.map(child => (
            <CategoryMenuItem key={child.id} category={child} tree={tree} />
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuSub>
    );
  }

  return (
    <DropdownMenuItem onClick={() => onFilterChange('category', categoryPath)}>
      {category.name}
    </DropdownMenuItem>
  );
}

export function CategoryTree({ tree, currentSlug }: CategoryTreeProps) {
  const currentCategory = useMemo(
    () => tree.find(category => (currentSlug ? category.slug === currentSlug : false)),
    [tree, currentSlug],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-50 justify-between">
          {currentCategory?.name ?? 'Categories'}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {tree.map(category => (
          <CategoryMenuItem key={category.id} category={category} tree={tree} />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
