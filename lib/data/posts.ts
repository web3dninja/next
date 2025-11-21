// Posts data and functions

export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
}

// Initial posts data
const initialPosts: Post[] = [
  {
    id: 1,
    title: "Introduction to Next.js",
    slug: "intro-to-nextjs",
    content: "Next.js is a React framework for production...",
  },
  {
    id: 2,
    title: "Server Components",
    slug: "server-components",
    content: "Server Components allow you to render components on the server...",
  },
  {
    id: 3,
    title: "App Router",
    slug: "app-router",
    content: "App Router is a new way of routing in Next.js 13+...",
  },
];

// Use global to persist data in dev mode (HMR safe)
const globalForPosts = globalThis as unknown as {
  posts: Post[] | undefined;
};

export const posts = globalForPosts.posts ?? initialPosts;

if (process.env.NODE_ENV !== "production") {
  globalForPosts.posts = posts;
}

// Data access functions
export async function getPosts(): Promise<Post[]> {
  return posts;
}

export async function getPost(slug: string): Promise<Post | null> {
  return posts.find((p) => p.slug === slug) || null;
}

export async function getPostById(id: number): Promise<Post | null> {
  return posts.find((p) => p.id === id) || null;
}

// Mutation functions
export async function addPost(post: Omit<Post, "id">): Promise<Post> {
  const newPost: Post = {
    id: posts.length + 1,
    ...post,
  };
  posts.push(newPost);
  return newPost;
}

export async function updatePost(id: number, data: Partial<Omit<Post, "id">>): Promise<Post | null> {
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) return null;

  posts[index] = { ...posts[index], ...data };
  return posts[index];
}

export async function deletePost(id: number): Promise<Post | null> {
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) return null;

  return posts.splice(index, 1)[0];
}
