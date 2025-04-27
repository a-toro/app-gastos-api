"use client";

import type React from "react";

import { useState, useEffect, forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface CurrencyInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value"
  > {
  label?: string;
  currency?: string;
  locale?: string;
  value?: number;
  onChange?: (value: number) => void;
  error?: string;
  description?: string;
  decimalPlaces?: number;
}

const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  (
    {
      label,
      currency = "USD",
      locale = "en-US",
      onChange,
      className,
      error,
      description,
      value = 0,
      decimalPlaces = 2,
      ...props
    },
    ref
  ) => {
    // Track both the formatted display value and the raw editing value
    const [displayValue, setDisplayValue] = useState("");
    const [editingValue, setEditingValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const formatter = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces,
    });

    // Format the display value when not focused
    useEffect(() => {
      if (!isFocused) {
        setDisplayValue(formatter.format(value));
      }
    }, [value, isFocused, formatter]);

    // When value changes externally, update the editing value if focused
    useEffect(() => {
      if (isFocused) {
        setEditingValue(value.toString());
      }
    }, [value, isFocused]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      // Allow only digits, a single decimal point, and a leading minus sign
      // This regex allows for typing a decimal point
      const validInput = /^-?\d*\.?\d*$/.test(inputValue);

      if (validInput || inputValue === "") {
        setEditingValue(inputValue);

        // Convert to number and call onChange
        if (inputValue === "" || inputValue === "-" || inputValue === ".") {
          // Don't update the value for incomplete inputs
          return;
        } else {
          const numericValue = Number.parseFloat(inputValue);
          if (!isNaN(numericValue)) {
            onChange?.(numericValue);
          }
        }
      }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      // When focused, show the raw number for easier editing
      setEditingValue(value.toString());
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      // When blurred, format the value
      setDisplayValue(formatter.format(value));

      // If the editing value is incomplete, reset it
      if (editingValue === "" || editingValue === "-" || editingValue === ".") {
        onChange?.(0);
      }

      props.onBlur?.(e);
    };

    return (
      <div className="grid w-full gap-1.5">
        {label && <Label htmlFor={props.id}>{label}</Label>}
        <Input
          ref={ref}
          value={isFocused ? editingValue : displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          inputMode="decimal"
          className={cn(error && "border-destructive", className)}
          {...props}
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    );
  }
);

CurrencyInput.displayName = "CurrencyInput";

export { CurrencyInput };
