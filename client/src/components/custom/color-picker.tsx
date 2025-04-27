"use client";

import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
// import { Button } from "react-day-picker";
// import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { HexColorPicker } from "react-colorful";

export function ColorPicker() {
  const [color, setColor] = useState("#544cca");
  console.log({ color });
  return (
    <Popover>
      <PopoverTrigger>
        <Button
          size="icon"
          className="rounded-full"
          style={{ backgroundColor: color }}
        >
          <div />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto">
        <HexColorPicker className="w-full" color={color} onChange={setColor} />
        {/* <Input type="color" /> */}
      </PopoverContent>
    </Popover>
  );
}
