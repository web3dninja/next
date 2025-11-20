import Link from "next/link";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { getPost, posts } from "@/lib/data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-3xl p-8">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/blog">← Blog</Link>
        </Button>

        <h1 className="text-3xl font-bold text-black dark:text-white mb-4">
          {post.title}
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">{post.content}</p>
      </main>
    </div>
  );
}

// Generate static paths (optional)
export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}
