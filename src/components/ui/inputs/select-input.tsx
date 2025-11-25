'use client';

import { Input } from '../input';
import { Popover, PopoverAnchor, PopoverContent } from '../popover';
import { Command, CommandEmpty, CommandItem, CommandList } from '../command';
import { useEffect, useState } from 'react';

interface SelectOption {
  value: string;
  key: string | number;
}

interface SelectInputProps extends Omit<React.ComponentProps<typeof Input>, 'onChange' | 'value'> {
  option?: SelectOption;
  options: SelectOption[];
  onChange?: (option: SelectOption | undefined) => void;
}

export function SelectInput({ option, options, onChange = () => {}, ...props }: SelectInputProps) {
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState(option?.value ?? '');

  const onSelect = (value: string) => {
    setInputValue(value);
    setOpen(false);
  };
  useEffect(() => {
    const option = options.find(option => option.value.toLowerCase() === inputValue.toLowerCase());

    if (option) {
      onChange(option);
    } else {
      onChange(undefined);
    }
  }, [inputValue]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverAnchor asChild>
        <Input
          {...props}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
        />
      </PopoverAnchor>
      <PopoverContent
        className="w-(--radix-popover-trigger-width) p-1"
        onOpenAutoFocus={e => e.preventDefault()}
        onInteractOutside={e => e.preventDefault()}
      >
        <Command>
          <CommandEmpty>No options found.</CommandEmpty>
          <CommandList className="w-full">
            {options
              .filter(option => option.value.toLowerCase().includes(inputValue.toLowerCase()))
              .map(option => (
                <CommandItem
                  key={option.key}
                  value={option.value}
                  onMouseDown={e => e.preventDefault()}
                  onSelect={() => onSelect(option.value)}
                >
                  {option.value}
                </CommandItem>
              ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
