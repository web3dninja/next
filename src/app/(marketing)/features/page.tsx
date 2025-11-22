import Link from "next/link";
import { Button } from "@/components/ui/button";

// Route Group - (marketing)
// URL: /features

export default function FeaturesPage() {
  const features = [
    { title: "SSR", description: "Server-Side Rendering" },
    { title: "SSG", description: "Static Site Generation" },
    { title: "ISR", description: "Incremental Static Regeneration" },
    { title: "API Routes", description: "Built-in API endpoints" },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-3xl p-8">
        <Button asChild variant="ghost" className="mb-6">
          <Link href="/">← Home</Link>
        </Button>

        <h1 className="text-3xl font-bold text-black dark:text-white mb-6">
          Features
        </h1>

        <div className="grid gap-4 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-700"
            >
              <h3 className="font-semibold text-black dark:text-white">
                {feature.title}
              </h3>
              <p className="text-sm text-zinc-500 mt-1">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
