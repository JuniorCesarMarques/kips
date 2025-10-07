import { Comp } from "@/types";
import { useState } from "react";

type TextComponentProps = {
  comp: Comp;
};

export default function TextComponent({ comp }: TextComponentProps) {
  const [editing, setEditing] = useState<boolean>();

  const [text, setText] = useState<string>(comp.title.content);

  return (
    <div onClick={() => setEditing(true)} className="flex flex-col">
      {editing ? (
        <input
          className="text-center font-bold"
          style={{ fontSize: `${comp.title?.size}px` }}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      ) : (
        <p
          style={{ fontSize: `${comp.title?.size}px` }}
          className="text-center font-bold"
        >
          {comp.title?.content}
        </p>
      )}
      <p
        style={{ fontSize: `${comp.description?.size}px` }}
        className="text-center"
      >
        {comp.description?.content}
      </p>
    </div>
  );
}
