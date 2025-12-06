import { Item, ItemTitle, ItemContent, ItemGroup, ItemDescription } from '@/components/ui/item';
import Link from 'next/link';
import type { CategoryWithCount } from '@/types/category';
import { getCategoryPath } from '@/helpers/category';
import { Badge } from '@/components/ui/badge';
import { FolderIcon, FolderTreeIcon } from 'lucide-react';

interface CategoriesListProps {
  categories: CategoryWithCount[];
}

export function CategoriesList({ categories }: CategoriesListProps) {
  return (
    <div className="content container">
      <ItemGroup className="gap-4">
        {categories.map(category => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </ItemGroup>
    </div>
  );
}

function CategoryItem({ category }: { category: CategoryWithCount }) {
  return (
    <>
      <Item variant="outline" asChild>
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
      {category.children && category.children.length > 0 && (
        <div className="ml-6 border-l-2 border-zinc-200 pl-4 dark:border-zinc-800">
          <ItemGroup className="gap-2">
            {category.children.map(child => (
              <CategoryItem key={child.id} category={child} />
            ))}
          </ItemGroup>
        </div>
      )}
    </>
  );
}
