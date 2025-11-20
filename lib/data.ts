// Shared data and functions for server components
// Can be imported directly in Server Components without fetch

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  subcategories?: Category[];
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  content: string;
}

// Users data
export const users: User[] = [
  { id: 1, name: "John Smith", email: "john.smith@example.com" },
  { id: 2, name: "Sarah Johnson", email: "sarah.johnson@example.com" },
  { id: 3, name: "Michael Brown", email: "michael.brown@example.com" },
  { id: 4, name: "Emily Davis", email: "emily.davis@example.com" },
  { id: 5, name: "David Wilson", email: "david.wilson@example.com" },
];

// Posts data
export const posts: Post[] = [
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

// Categories data
export const categories: Record<string, Category> = {
  electronics: {
    id: "electronics",
    name: "Electronics",
    description: "Smartphones, laptops, tablets and accessories",
    subcategories: [
      { id: "phones", name: "Phones", description: "Smartphones of all brands" },
      { id: "laptops", name: "Laptops", description: "Laptops for work and gaming" },
      { id: "tablets", name: "Tablets", description: "Tablets and e-readers" },
    ],
  },
  clothing: {
    id: "clothing",
    name: "Clothing",
    description: "Men's and women's clothing",
    subcategories: [
      { id: "men", name: "Men's", description: "Clothing for men" },
      { id: "women", name: "Women's", description: "Clothing for women" },
    ],
  },
  home: {
    id: "home",
    name: "Home & Garden",
    description: "Products for home and garden",
  },
};

// Data access functions for Server Components
export async function getUsers(): Promise<User[]> {
  // Simulate delay (like from DB)
  await new Promise((resolve) => setTimeout(resolve, 100));
  return users;
}

export async function getUser(id: number): Promise<User | null> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return users.find((u) => u.id === id) || null;
}

export async function getCategories(): Promise<Category[]> {
  return Object.values(categories);
}

export async function getCategory(id: string): Promise<Category | null> {
  return categories[id] || null;
}

export function getServerDate(): string {
  return new Date().toLocaleString("en-US");
}

// Posts functions
export async function getPosts(): Promise<Post[]> {
  return posts;
}

export async function getPost(slug: string): Promise<Post | null> {
  return posts.find((p) => p.slug === slug) || null;
}

export async function getPostById(id: number): Promise<Post | null> {
  return posts.find((p) => p.id === id) || null;
}

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

// Users mutation functions
export async function addUser(user: Omit<User, "id">): Promise<User> {
  const newUser: User = {
    id: users.length + 1,
    ...user,
  };
  users.push(newUser);
  return newUser;
}

export async function updateUser(id: number, data: Partial<Omit<User, "id">>): Promise<User | null> {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;

  users[index] = { ...users[index], ...data };
  return users[index];
}

export async function deleteUser(id: number): Promise<User | null> {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;

  return users.splice(index, 1)[0];
}
