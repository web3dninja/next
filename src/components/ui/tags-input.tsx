'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from './badge';
import { Input } from './input';

interface TagsInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function TagsInput({
  value,
  onChange,
  placeholder = 'Add tags...',
  className,
  disabled,
}: TagsInputProps) {
  const [inputValue, setInputValue] = React.useState('');

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !value.includes(trimmedTag)) {
      onChange([...value, trimmedTag]);
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (inputValue.trim()) {
        addTag(inputValue);
      }
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      removeTag(value[value.length - 1]);
    }
  };

  return (
    <div className={cn('space-y-2', className)}>
      <div className="border-input dark:bg-input/30 focus-within:border-ring focus-within:ring-ring/50 relative w-full rounded-md border bg-transparent px-3 py-2 shadow-xs transition-[color,box-shadow] focus-within:ring-[3px]">
        <div className="flex min-h-6 w-full flex-wrap gap-2">
          {value.map((tag, index) => (
            <Badge key={`${tag}-${index}`} variant="secondary" className="gap-1 pr-1">
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                disabled={disabled}
                className="hover:bg-secondary-foreground/20 focus:ring-ring ml-1 rounded-full focus:ring-2 focus:outline-none disabled:pointer-events-none"
              >
                <X className="size-3" />
              </button>
            </Badge>
          ))}
          <Input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={value.length === 0 ? placeholder : ''}
            disabled={disabled}
            className="-my-2 inline-flex min-w-[120px] flex-1 border-0 bg-transparent! p-0 shadow-none focus-visible:ring-0"
          />
        </div>
      </div>
    </div>
  );
}
