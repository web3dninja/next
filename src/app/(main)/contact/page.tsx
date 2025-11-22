import Link from 'next/link';
import { BackButton } from '@/components/ui/back-button';

// Static route - /contact
export default function ContactPage() {
  return (
    <>
      <div className="container">
        <BackButton href="/" label="Home" />
      </div>

      <div className="content">
        <h1 className="title">Contact</h1>
      <p className="text-zinc-600 dark:text-zinc-400">Email: contact@example.com</p>
      <p className="text-zinc-600 dark:text-zinc-400">Phone: +1 (555) 123-4567</p>
      </div>
    </>
  );
}
