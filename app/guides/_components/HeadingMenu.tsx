import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Editor } from "@tiptap/react";
import { type Level } from "@tiptap/extension-heading";
import { Heading1, Heading2, Heading3 } from "lucide-react";
import { useEffect } from "react";

const headings = [
  {
    value: "1",
    level: 1,
    icon: <Heading1 className={"h-4 w-4"} />,
  },
  {
    value: "2",
    level: 2,
    icon: <Heading2 className={"h-4 w-4"} />,
  },
  {
    value: "3",
    level: 3,
    icon: <Heading3 className={"h-4 w-4"} />,
  },
];

export default function HeadingMenu({ editor }: { editor: Editor }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  useEffect(() => {
    editor.on("update", ({ editor }) => {
      if (!editor.isActive("heading")) return setValue("");
    });
  }, [editor]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between bg-transparent border-0 px-2 hover:bg-muted"
        >
          {value
            ? headings.find((framework) => framework.value === value)?.icon
            : "Size"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0 border-border">
        <Command>
          <CommandList>
            <CommandGroup>
              {headings.map((heading) => (
                <CommandItem
                  key={heading.value}
                  value={heading.value}
                  onSelect={(currentValue) => {
                    editor
                      .chain()
                      .focus()
                      .toggleHeading({ level: heading.level as Level })
                      .run();
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === heading.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {heading.icon}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}