import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getPosts } from "@/lib/data";
import CreatePostForm from "./components/CreatePostForm";
import DeletePostButton from "./components/DeletePostButton";

export default async function BlogPage() {
  const posts = await getPosts();
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-3xl p-8">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/">← Home</Link>
        </Button>

        <h1 className="text-3xl font-bold text-black dark:text-white mb-6">
          Blog
        </h1>

        <CreatePostForm />

        <ul className="space-y-3 mt-6">
          {posts.map((post) => (
            <li key={post.id} className="flex items-center gap-2">
              <Link
                href={`/blog/${post.id}`}
                className="flex-1 block p-4 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                <span className="text-black dark:text-white">{post.title}</span>
              </Link>
              <DeletePostButton postId={post.id} />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
