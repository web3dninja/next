'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { cn } from '@/lib/utils';
import { Label } from './label';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Search...',
  className,
}: SearchInputProps) {
  return (
    <InputGroup className={cn('w-full', className)}>
      <InputGroupAddon>
        <Label htmlFor="search" className="size-4">
          <Search />
        </Label>
      </InputGroupAddon>
      <InputGroupInput
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        id="search"
      />
    </InputGroup>
  );
}
