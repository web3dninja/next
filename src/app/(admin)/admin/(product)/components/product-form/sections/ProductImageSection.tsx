import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ImagePreview } from '@/components/ui/image-preview';

interface ProductImageSectionProps {
  imageUrl: string;
  link: string;
}

export function ProductImageSection({ imageUrl, link }: ProductImageSectionProps) {
  return (
    <div className="mx-auto w-80 sm:w-64">
      <ImagePreview
        value={imageUrl}
        className="relative w-full overflow-hidden rounded-lg pb-[100%]"
      />

      <Button asChild size="xl" className="mt-4 w-full">
        <Link href={link ?? ''} target="_blank" rel="noopener noreferrer">
          Buy on Amazon
        </Link>
      </Button>
    </div>
  );
}
