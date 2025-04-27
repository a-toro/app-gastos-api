"use client";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useState } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";

export interface DatePickerProps {
  isError?: boolean;
  placeholder?: string;
  label?: string;
  date: Date;
  required?: boolean;
  messageError?: string;
  onChange?: (newDate: Date | undefined) => void;
  id?: string;
}

export default function DatePicker({
  label,
  isError,
  date,
  placeholder,
  required,
  messageError,
  onChange,
  id,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    date ? date : new Date()
  );
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="space-y-1">
            <Button
              id={id}
              type="button"
              variant="outline"
              // className="flex w-full justify-start text-left"
              className={cn(
                "w-full justify-start text-left font-normal",
                !selectedDate && "text-muted-foreground",
                isError && "border-destructive text-destructive"
              )}
            >
              <CalendarIcon className="mr-2 size-4" />
              {selectedDate ? (
                format(selectedDate, "PPP", { locale: es })
              ) : (
                <span>{placeholder}</span>
              )}
            </Button>
            {(required || isError) && messageError && (
              <div className="text-xs text-destructive ml-1">
                <span>{messageError}</span>
              </div>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="p-0"
          align="start"
          sideOffset={5}
          // style={{ width: "var(--radix-popover-trigger-width)" }}
        >
          <Calendar
            mode="single"
            onSelect={(value) => {
              if (onChange instanceof Function) {
                onChange(value);
              }
              setSelectedDate(value);
              setOpen(false);
            }}
            selected={selectedDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
