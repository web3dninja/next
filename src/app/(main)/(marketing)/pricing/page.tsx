import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Route Group - (marketing)
// URL: /pricing (without "marketing" in URL)
// Groups routes logically without affecting URL

export default function PricingPage() {
  return (
    <div className="content">
      <div className="w-full max-w-3xl p-8">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/">← Home</Link>
        </Button>

        <h1 className="mb-6 text-3xl font-bold text-black dark:text-white">Pricing</h1>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
            <h3 className="font-semibold text-black dark:text-white">Free</h3>
            <p className="mt-2 text-2xl font-bold">$0</p>
            <p className="mt-2 text-sm text-zinc-500">For beginners</p>
          </div>

          <div className="rounded-lg border-2 border-black p-6 dark:border-white">
            <h3 className="font-semibold text-black dark:text-white">Pro</h3>
            <p className="mt-2 text-2xl font-bold">$29</p>
            <p className="mt-2 text-sm text-zinc-500">For professionals</p>
          </div>

          <div className="rounded-lg border border-zinc-200 p-6 dark:border-zinc-700">
            <h3 className="font-semibold text-black dark:text-white">Enterprise</h3>
            <p className="mt-2 text-2xl font-bold">Custom</p>
            <p className="mt-2 text-sm text-zinc-500">For companies</p>
          </div>
        </div>

        <p className="mt-6 text-sm text-zinc-500 dark:text-zinc-400">
          Route Group: (marketing) - does not affect URL
        </p>
      </div>
    </div>
  );
}
