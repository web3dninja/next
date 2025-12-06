'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { cn } from '@/lib/utils';
import { Label } from './label';

interface SearchInputProps extends React.ComponentProps<'input'> {
  className?: string;
}

export function SearchInput({ className, ...props }: SearchInputProps) {
  return (
    <InputGroup className={cn('max-w-xs', className)}>
      <InputGroupAddon>
        <Label htmlFor="search" className="size-4">
          <Search />
        </Label>
      </InputGroupAddon>
      <InputGroupInput type="text" {...props} />
    </InputGroup>
  );
}
