"use client";

import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "../ui/label";

interface BaseSelector {
  id: string;
  label?: string;
  value: string;
}

interface SelectorProps<T extends BaseSelector> {
  className?: string;
  data: T[];
  onSelectChange?: (item: T | null | undefined) => void;
  selectedId?: string;
  isError?: boolean;
  errorMessage?: string;
  label?: string;
}

export default function Selector<T extends BaseSelector>({
  //   className,
  data,
  onSelectChange,
  selectedId,
  isError,
  errorMessage,
  label,
}: SelectorProps<T>) {
  const inicialValue = data.find((item) => item.id === selectedId)?.value || "";
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(inicialValue);

  // if (!inicialValue && selectedId && onSelectChange instanceof Function) {
  //   onSelectChange(null);
  // }

  useEffect(() => {
    if (!inicialValue && selectedId && onSelectChange instanceof Function) {
      onSelectChange(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between",
              isError && "border-destructive text-destructive"
            )}
          >
            {value
              ? data.find((item) => item.value === value)?.label
              : "Seleccionar..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="p-0"
          style={{ width: "var(--radix-popover-trigger-width)" }}
        >
          <Command>
            <CommandInput placeholder="Buscar..." />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {data.map((item, index) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={(currentValue) => {
                      if (onSelectChange instanceof Function) {
                        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                        currentValue === value
                          ? onSelectChange(null)
                          : onSelectChange(data[index]);
                      }
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 size-4",
                        value === item.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {isError && errorMessage && (
        <div className="text-xs text-destructive ml-1">{errorMessage}</div>
      )}
    </div>
  );
}
