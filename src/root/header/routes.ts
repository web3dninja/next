import { RouteWithDropdown } from '@/types/header.type';

export const routes: RouteWithDropdown[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  {
    href: '/blog',
    label: 'Blog',
    dropdown: [
      { href: '/blog/1', label: 'Intro to Next.js' },
      { href: '/blog/2', label: 'Server Components' },
      { href: '/blog/3', label: 'App Router' },
    ],
  },
  {
    href: '/docs',
    label: 'Docs',
    dropdown: [
      { href: '/docs/intro', label: 'Introduction' },
      { href: '/docs/guides/routing', label: 'Routing' },
    ],
  },
  {
    href: '/products',
    label: 'Products',
    dropdown: [
      { href: '/products/electronics', label: 'Electronics' },
      { href: '/products/electronics/phones', label: 'Phones' },
      { href: '/products/clothing', label: 'Clothing' },
    ],
  },
  {
    href: '/pricing',
    label: 'Pricing',
    dropdown: [
      { href: '/pricing', label: 'Pricing' },
      { href: '/features', label: 'Features' },
    ],
  },
];
