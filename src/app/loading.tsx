// Loading UI - shown while the page is loading
export default function Loading() {
  return (
    <div className="my-auto text-center">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-black border-r-transparent dark:border-white"></div>
      <p className="mt-4 text-zinc-500 dark:text-zinc-400">Loading...</p>
    </div>
  );
}
