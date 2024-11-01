import { type Editor } from "@tiptap/react";
import { Toggle } from "@/components/ui/toggle";
import { Bold, Italic, List, Strikethrough, ListOrdered } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import HeadingMenu from "@/app/guides/_components/HeadingMenu";

const ToolBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  return (
    <div className="border border-input rounded-md p-1 flex gap-1 items-center">
      <Toggle
        size={"sm"}
        className={"hover:text-foreground"}
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className={"h-4 w-4"} />
      </Toggle>
      <Toggle
        size={"sm"}
        className={"hover:text-foreground"}
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className={"h-4 w-4"} />
      </Toggle>
      <Toggle
        size={"sm"}
        className={"hover:text-foreground"}
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className={"h-4 w-4"} />
      </Toggle>
      <Separator orientation={"vertical"} className={"h-9 my-auto mx-1"} />
      <HeadingMenu editor={editor} />
      <Separator orientation={"vertical"} className={"h-9 my-auto mx-1"} />
      <Toggle
        size={"sm"}
        className={"hover:text-foreground"}
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className={"h-4 w-4"} />
      </Toggle>{" "}
      <Toggle
        size={"sm"}
        className={"hover:text-foreground"}
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className={"h-4 w-4"} />
      </Toggle>
    </div>
  );
};

export default ToolBar;