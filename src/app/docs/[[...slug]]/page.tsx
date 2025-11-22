import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { docsContent } from "../screens";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

// Navigation structure for sidebar
const navItems = [
  { href: "/docs", label: "Overview", path: "" },
  { href: "/docs/intro", label: "Introduction", path: "intro" },
  { href: "/docs/guides", label: "Guides", path: "guides" },
  { href: "/docs/guides/routing", label: "Routing", path: "guides/routing", indent: true },
  { href: "/docs/guides/data-fetching", label: "Data Fetching", path: "guides/data-fetching", indent: true },
  { href: "/docs/guides/styling", label: "Styling", path: "guides/styling", indent: true },
  { href: "/docs/api", label: "API Reference", path: "api" },
  { href: "/docs/examples", label: "Examples", path: "examples" },
];

export default async function DocsPage({ params }: PageProps) {
  const { slug } = await params;
  const path = slug ? slug.join("/") : "";

  const pageData = docsContent[path];

  if (!pageData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="container mx-auto max-w-4xl p-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-4 mb-6">
          <Button asChild variant="ghost" size="sm">
            <Link href="/">← Home</Link>
          </Button>
          {path && (
            <>
              <span className="text-zinc-300 dark:text-zinc-700">/</span>
              <Button asChild variant="ghost" size="sm">
                <Link href="/docs">Docs</Link>
              </Button>
            </>
          )}
        </div>

        {/* Page title */}
        <h1 className="text-3xl font-bold text-black dark:text-white mb-6">
          {pageData.title}
        </h1>

        {/* Page content */}
        {pageData.content}

        {/* Sidebar navigation */}
        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Documentation
          </h3>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 text-sm rounded-md ${
                  item.indent ? "pl-6" : ""
                } ${
                  path === item.path
                    ? "bg-zinc-200 dark:bg-zinc-800 text-black dark:text-white"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
