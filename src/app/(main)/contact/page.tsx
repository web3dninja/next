import { BackButton } from '@/components/ui/back-button';

// Static route - /contact
export default function ContactPage() {
  return (
    <>
      <div className="container flex gap-4">
        <BackButton href="/" label="Home" />
        <h1>Contact</h1>
      </div>

      <div className="content">
        <p className="text-zinc-600 dark:text-zinc-400">Email: contact@example.com</p>
        <p className="text-zinc-600 dark:text-zinc-400">Phone: +1 (555) 123-4567</p>
      </div>
    </>
  );
}
