import { Item, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item';
import { ItemMedia } from '@/components/ui/item';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Github, ExternalLink } from 'lucide-react';

export default async function Home() {
  return (
    <div className="content">
      <div className="w-full text-center sm:text-left">
        <div className="mb-4 inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          Portfolio Project
        </div>
        <h1 className="mb-4 text-4xl font-bold text-black sm:text-5xl dark:text-white">
          Product Discovery Platform
        </h1>
        <p className="mb-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          A full-stack e-commerce platform with Reddit sentiment analysis, hierarchical categories,
          and comprehensive admin dashboard. Built with modern web technologies and best practices.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/products">
              <ExternalLink className="mr-2 size-4" />
              View Products
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <a href="https://github.com/web3dninja/next" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 size-4" />
              View Source
            </a>
          </Button>
        </div>
      </div>

      {/* Key Features */}
      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-bold text-black dark:text-white">Key Features</h2>
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Item variant="outline">
            <ItemMedia variant="image">🤖</ItemMedia>
            <ItemContent>
              <ItemTitle>Reddit Sentiment Analysis</ItemTitle>
              <ItemDescription>
                Advanced sentiment analysis of Reddit discussions to provide product insights
              </ItemDescription>
            </ItemContent>
          </Item>

          <Item variant="outline">
            <ItemMedia variant="image">📁</ItemMedia>
            <ItemContent>
              <ItemTitle>Hierarchical Categories</ItemTitle>
              <ItemDescription>
                Multi-level category system with parent-child relationships
              </ItemDescription>
            </ItemContent>
          </Item>

          <Item variant="outline">
            <ItemMedia variant="image">👑</ItemMedia>
            <ItemContent>
              <ItemTitle>Admin Dashboard</ItemTitle>
              <ItemDescription>
                Complete CRUD operations for products, categories, and users
              </ItemDescription>
            </ItemContent>
          </Item>

          <Item variant="outline">
            <ItemMedia variant="image">🔍</ItemMedia>
            <ItemContent>
              <ItemTitle>Advanced Search</ItemTitle>
              <ItemDescription>
                Real-time search and filtering across products and categories
              </ItemDescription>
            </ItemContent>
          </Item>

          <Item variant="outline">
            <ItemMedia variant="image">🌙</ItemMedia>
            <ItemContent>
              <ItemTitle>Dark Mode</ItemTitle>
              <ItemDescription>Beautiful dark theme with smooth transitions</ItemDescription>
            </ItemContent>
          </Item>

          <Item variant="outline">
            <ItemMedia variant="image">📊</ItemMedia>
            <ItemContent>
              <ItemTitle>Analytics Integration</ItemTitle>
              <ItemDescription>Google Analytics for tracking user behavior</ItemDescription>
            </ItemContent>
          </Item>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="mt-12 w-full rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900">
        <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">Tech Stack</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="mb-3 text-sm font-semibold tracking-wide text-zinc-600 uppercase dark:text-zinc-400">
              Frontend
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS', 'Radix UI'].map(tech => (
                <span
                  key={tech}
                  className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold tracking-wide text-zinc-600 uppercase dark:text-zinc-400">
              Backend & Database
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Prisma ORM', 'PostgreSQL', 'Server Actions', 'JWT Auth'].map(tech => (
                <span
                  key={tech}
                  className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800 dark:bg-green-900 dark:text-green-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold tracking-wide text-zinc-600 uppercase dark:text-zinc-400">
              State Management
            </h3>
            <div className="flex flex-wrap gap-2">
              {['TanStack Query', 'React Hook Form', 'Zod Validation'].map(tech => (
                <span
                  key={tech}
                  className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold tracking-wide text-zinc-600 uppercase dark:text-zinc-400">
              Tools & APIs
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Reddit API', 'Google Analytics', 'ESLint', 'Prettier'].map(tech => (
                <span
                  key={tech}
                  className="rounded-full bg-orange-100 px-3 py-1 text-sm font-medium text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Architecture Highlights */}
      <div className="mt-12 w-full rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900">
        <h2 className="mb-4 text-2xl font-bold text-black dark:text-white">
          Architecture Highlights
        </h2>
        <ul className="space-y-3 text-zinc-600 dark:text-zinc-400">
          <li className="flex items-start gap-2">
            <span className="mt-1 text-green-600 dark:text-green-400">✓</span>
            <span>
              <strong>Server Components & Actions:</strong> Leveraging Next.js 16 App Router with
              server-side rendering and server actions for optimal performance
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 text-green-600 dark:text-green-400">✓</span>
            <span>
              <strong>Type Safety:</strong> End-to-end TypeScript with Prisma-generated types and
              Zod schema validation
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 text-green-600 dark:text-green-400">✓</span>
            <span>
              <strong>Parallel Routes & Intercepting Routes:</strong> Advanced Next.js routing
              patterns for modal dialogs and smooth navigation
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 text-green-600 dark:text-green-400">✓</span>
            <span>
              <strong>Optimistic UI Updates:</strong> React Query for efficient caching and
              optimistic updates
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 text-green-600 dark:text-green-400">✓</span>
            <span>
              <strong>Responsive Design:</strong> Mobile-first approach with Tailwind CSS and custom
              UI components
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
