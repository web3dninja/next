import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { notFound } from 'next/navigation';
import { getPostById } from '@/lib/data';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const postId = parseInt(id);

  if (isNaN(postId) || postId <= 0) {
    notFound();
  }

  const post = await getPostById(postId);

  if (!post) {
    notFound();
  }

  return (
    <div className="content">
      <div className="w-full max-w-3xl p-8">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/blog">← Blog</Link>
        </Button>

        <h1 className="mb-4 text-3xl font-bold text-black dark:text-white">{post.title}</h1>
        <p className="text-zinc-600 dark:text-zinc-400">{post.content || 'No content available'}</p>
      </div>
    </div>
  );
}
