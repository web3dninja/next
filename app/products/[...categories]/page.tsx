import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getCategory, getServerDate } from "@/lib/data";

// Catch-all route - /products/[...categories]
// Matches: /products/electronics, /products/electronics/phones, /products/electronics/phones/iphone
// Does NOT match: /products (needs at least one segment)

interface PageProps {
  params: Promise<{ categories: string[] }>;
}

export default async function ProductCategoryPage({ params }: PageProps) {
  const { categories } = await params;
  const mainCategoryId = categories[0];
  const category = await getCategory(mainCategoryId);
  const serverDate = await getServerDate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-3xl p-8">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/">← Home</Link>
        </Button>

        <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
          {category ? category.name : "Category"}
        </h1>

        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6">
          Server date: {serverDate}
        </p>

        {category && (
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            {category.description}
          </p>
        )}

        <div className="space-y-4">
          {/* Breadcrumb */}
          <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-900">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">
              Category path:
            </p>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full bg-zinc-200 dark:bg-zinc-800 text-sm"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Subcategories */}
          {category?.subcategories && categories.length === 1 && (
            <div>
              <h2 className="text-lg font-semibold text-black dark:text-white mb-3">
                Subcategories
              </h2>
              <div className="grid gap-3 md:grid-cols-2">
                {category.subcategories.map((sub) => (
                  <Link
                    key={sub.id}
                    href={`/products/${mainCategoryId}/${sub.id}`}
                    className="block p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                  >
                    <p className="font-medium text-black dark:text-white">
                      {sub.name}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {sub.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <p className="text-zinc-600 dark:text-zinc-400">
            URL: /products/{categories.join("/")}
          </p>
        </div>

        <div className="mt-6 space-y-2">
          <p className="text-sm font-medium text-black dark:text-white">
            All categories:
          </p>
          <ul className="space-y-1 text-sm text-zinc-500 dark:text-zinc-400">
            <li>
              <Link href="/products/electronics" className="hover:underline">
                Electronics
              </Link>
            </li>
            <li>
              <Link
                href="/products/electronics/phones"
                className="hover:underline"
              >
                Electronics → Phones
              </Link>
            </li>
            <li>
              <Link href="/products/clothing" className="hover:underline">
                Clothing
              </Link>
            </li>
            <li>
              <Link href="/products/clothing/men" className="hover:underline">
                Clothing → Men's
              </Link>
            </li>
            <li>
              <Link href="/products/home" className="hover:underline">
                Home & Garden
              </Link>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
