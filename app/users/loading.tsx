// Loading UI - shown while the page is loading
export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-black dark:border-white border-r-transparent"></div>
        <p className="mt-4 text-zinc-500 dark:text-zinc-400">Loading...</p>
      </div>
    </div>
  );
}
