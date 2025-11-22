import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { docsContent } from '../screens';
import { BackButton } from '@/components/ui/back-button';

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

// Navigation structure for sidebar
const navItems = [
  { href: '/docs', label: 'Overview', path: '' },
  { href: '/docs/intro', label: 'Introduction', path: 'intro' },
  { href: '/docs/guides', label: 'Guides', path: 'guides' },
  { href: '/docs/guides/routing', label: 'Routing', path: 'guides/routing', indent: true },
  {
    href: '/docs/guides/data-fetching',
    label: 'Data Fetching',
    path: 'guides/data-fetching',
    indent: true,
  },
  { href: '/docs/guides/styling', label: 'Styling', path: 'guides/styling', indent: true },
  { href: '/docs/api', label: 'API Reference', path: 'api' },
  { href: '/docs/examples', label: 'Examples', path: 'examples' },
];

export default async function DocsPage({ params }: PageProps) {
  const { slug } = await params;
  const path = slug ? slug.join('/') : '';

  const pageData = docsContent[path];

  if (!pageData) {
    notFound();
  }

  return (
    <>
      <div className="container">
        <BackButton href="/" label="Home" />
      </div>

      <div className="content">
        {/* Page title */}
        <h1>{pageData.title}</h1>

      {/* Page content */}
      {pageData.content}

      {/* Sidebar navigation */}
      <div className="mt-12 border-t border-zinc-200 pt-8 dark:border-zinc-800">
        <h3 className="mb-4 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Documentation
        </h3>
        <nav className="space-y-1">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded-md px-3 py-2 text-sm ${item.indent ? 'pl-6' : ''} ${
                path === item.path
                  ? 'bg-zinc-200 text-black dark:bg-zinc-800 dark:text-white'
                  : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
      </div>
    </>
  );
}
