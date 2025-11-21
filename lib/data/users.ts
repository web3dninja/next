// Users data and functions

export interface User {
  id: number;
  name: string;
  email: string;
}

// Initial users data
const initialUsers: User[] = [
  { id: 1, name: "John Smith", email: "john.smith@example.com" },
  { id: 2, name: "Sarah Johnson", email: "sarah.johnson@example.com" },
  { id: 3, name: "Michael Brown", email: "michael.brown@example.com" },
  { id: 4, name: "Emily Davis", email: "emily.davis@example.com" },
  { id: 5, name: "David Wilson", email: "david.wilson@example.com" },
];

// Use global to persist data in dev mode (HMR safe)
const globalForUsers = globalThis as unknown as {
  users: User[] | undefined;
};

export const users = globalForUsers.users ?? initialUsers;

if (process.env.NODE_ENV !== "production") {
  globalForUsers.users = users;
}

// Data access functions
export async function getUsers(): Promise<User[]> {
  // Simulate delay (like from DB)
  await new Promise((resolve) => setTimeout(resolve, 100));
  return users;
}

export async function getUser(id: number): Promise<User | null> {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return users.find((u) => u.id === id) || null;
}

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
