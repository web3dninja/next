export function Header({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <header className="border-border sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60 dark:border-zinc-800 dark:bg-black/95 dark:supports-backdrop-filter:bg-black/60">
      <div className="container mx-auto flex h-14 items-center gap-2 px-4">{children}</div>
    </header>
  );
}
