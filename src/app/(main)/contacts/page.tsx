import Link from 'next/link';
import { Github, Linkedin, Mail, Phone, Send } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const contacts = [
  {
    label: 'Email',
    value: 'web3dninja@gmail.com',
    href: 'mailto:web3dninja@gmail.com',
    icon: Mail,
  },
  {
    label: 'Phone',
    value: '+66 06-4928-2447',
    href: 'tel:+660649282447',
    icon: Phone,
  },
  {
    label: 'Telegram',
    value: '@taramtamtam',
    href: 'https://t.me/taramtamtam',
    icon: Send,
  },
  {
    label: 'GitHub',
    value: 'github.com/web3dninja',
    href: 'https://github.com/web3dninja',
    icon: Github,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/vlad-turok-a00194276/',
    href: 'https://www.linkedin.com/in/vlad-turok-a00194276/',
    icon: Linkedin,
  },
];

export default function ContactPage() {
  return (
    <>
      <div className="content-header container">
        <h1>Contacts</h1>
      </div>

      <div className="content container">
        <Card className="mx-auto w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Let&apos;s get in touch</CardTitle>
            <CardDescription>
              Prefer telegram, but I’m quick on phone, email, and socials too.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {contacts.map(({ label, value, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="border-border/60 hover:border-primary hover:bg-primary/5 flex items-center gap-4 rounded-xl border p-3 transition"
              >
                <span className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full">
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="text-xs font-medium tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
                    {label}
                  </p>
                  <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    {value}
                  </p>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
