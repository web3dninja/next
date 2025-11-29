import { SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';

export function FilterHeader() {
  return (
    <SheetHeader>
      <div className="flex items-center justify-between">
        <SheetTitle>Filters & Sort</SheetTitle>
      </div>
      <SheetDescription>
        Powered by Fuse.js (search), Sift (filters), Radash (sort)
      </SheetDescription>
    </SheetHeader>
  );
}
