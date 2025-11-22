import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getPosts } from '@/lib/data';
import CreatePostForm from './components/CreatePostForm';
import DeletePostButton from './components/DeletePostButton';

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="content">
      <div className="w-full max-w-3xl p-8">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/">← Home</Link>
        </Button>

        <h1 className="mb-6 text-3xl font-bold text-black dark:text-white">Blog</h1>

        <CreatePostForm />

        <ul className="mt-6 space-y-3">
          {posts.map(post => (
            <li key={post.id} className="flex items-center gap-2">
              <Link
                href={`/blog/${post.id}`}
                className="block flex-1 rounded-lg border border-zinc-200 p-4 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
              >
                <span className="text-black dark:text-white">{post.title}</span>
              </Link>
              <DeletePostButton postId={post.id} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
