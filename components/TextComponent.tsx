import { Comp } from "@/types";

import { useTarget } from "@/app/context/TargetContext";


type TextComponentProps = {
  comp: Comp;
};

export default function TextComponent({ comp }: TextComponentProps) {
  const { editing, setEditing } = useTarget();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!editing)return;
    setEditing({
      ...editing,
      title: {
        ...editing.title!,
        content: e.target.value,
      },
    });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!editing)return;
    setEditing({
      ...editing,
      description: {
        ...editing.description!,
        content: e.target.value,
      },
    });
  };


  return (
    <div onClick={() => setEditing(comp)} className="flex flex-col cursor-pointer">
      {editing?.id === comp.id ? (
        <>
          <input
            onBlur={() => setEditing(null)}
            className="text-center font-bold"
            style={{ fontSize: `${comp.title?.size || 16}px` }}
            type="text"
            value={editing?.title?.content || ""}
            onChange={handleTitleChange}
          />
          <input
            className="text-center"
            style={{ fontSize: `${comp.description?.size || 14}px` }}
            type="text"
            value={editing?.description?.content || ""}
            onChange={handleDescriptionChange}
          />
        </>
      ) : (
        <>
          <p
            style={{ fontSize: `${comp.title?.size || 16}px` }}
            className="text-center font-bold"
          >
            {comp.title?.content}
          </p>
          <p
            style={{ fontSize: `${comp.description?.size || 14}px` }}
            className="text-center"
          >
            {comp.description?.content}
          </p>
        </>
      )}
    </div>
  );
}
