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
      <div>
        <Button asChild variant="ghost">
          <Link href="/blog">← Blog</Link>
        </Button>
      </div>

      <h1 className="title">{post.title}</h1>
      <p className="text-zinc-600 dark:text-zinc-400">{post.content || 'No content available'}</p>
    </div>
  );
}
