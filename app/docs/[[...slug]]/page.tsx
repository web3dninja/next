import Link from "next/link";
import { Button } from "@/components/ui/button";

// Optional Catch-all route - /docs/[[...slug]]
// Matches: /docs, /docs/intro, /docs/intro/getting-started
// Difference from [...slug]: also matches base path /docs

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export default async function DocsPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-3xl p-8">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/">← Home</Link>
        </Button>

        <h1 className="text-3xl font-bold text-black dark:text-white mb-4">
          Documentation
        </h1>

        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-900">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">
              Current path:
            </p>
            {slug && slug.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {slug.map((segment, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full bg-zinc-200 dark:bg-zinc-800 text-sm"
                  >
                    {segment}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-black dark:text-white">
                Documentation home page
              </p>
            )}
          </div>

          <p className="text-zinc-600 dark:text-zinc-400">
            URL: /docs{slug ? `/${slug.join("/")}` : ""}
          </p>
        </div>

        <div className="mt-6 space-y-2">
          <p className="text-sm font-medium text-black dark:text-white">
            Examples:
          </p>
          <ul className="space-y-1 text-sm text-zinc-500 dark:text-zinc-400">
            <li>
              <Link href="/docs" className="hover:underline">
                /docs (home)
              </Link>
            </li>
            <li>
              <Link href="/docs/intro" className="hover:underline">
                /docs/intro
              </Link>
            </li>
            <li>
              <Link href="/docs/guides/routing" className="hover:underline">
                /docs/guides/routing
              </Link>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
