import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ImagePreview } from '@/components/ui/image-preview';

interface ProductBuyButtonProps {
  link: string;
}

export function ProductBuyButton({ link }: ProductBuyButtonProps) {
  return (
    <Button asChild size="xl" className="mt-4 w-full">
      <Link href={link ?? ''} target="_blank" rel="noopener noreferrer">
        Buy on Amazon
      </Link>
    </Button>
  );
}
