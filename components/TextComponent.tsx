import { Comp } from "@/types";

import { useTarget } from "@/app/context/TargetContext";
import { usePage } from "@/app/context/PagesContext";
import { useState } from "react";


type TextComponentProps = {
  comp: Comp;
};

export default function TextComponent({ comp }: TextComponentProps) {

  const { targetLevel, targetComp, setTargetComp, setTargetLevel } = useTarget();
  const { pages, setPages } = usePage();
  const [selected, setSelected] = useState<number>();

  console.log(targetLevel, "TARGET LEVEL")

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!targetComp)return;
    setTargetComp({
      ...targetComp,
      title: {
        ...targetComp.title!,
        content: e.target.value,
      },
    });

    setPages([...pages, ])

  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!targetComp)return;
    setTargetComp({
      ...targetComp,
      description: {
        ...targetComp.description!,
        content: e.target.value,
      },
    });
  };

  console.log("EDITING", targetComp)


  return (
    <div onClick={() => setTargetComp(comp)} className="flex flex-col cursor-pointer">
      {comp?.id === targetComp?.id ? (
        <>
          <input
            className="text-center font-bold"
            style={{ fontSize: `${comp?.title?.size || 16}px` }}
            type="text"
            value={targetComp?.title?.content}
            onChange={handleTitleChange}
          />
          <input
            className="text-center"
            style={{ fontSize: `${comp?.description?.size || 14}px` }}
            type="text"
            value={targetComp?.description?.content || ""}
            onChange={handleDescriptionChange}
          />
        </>
      ) : (
        <>
          <p
            onClick={() => setSelected(comp.id)}
            style={{ fontSize: `${comp?.title?.size || 16}px` }}
            className={`text-center font-bold`}
          >
            {comp?.title?.content}
          </p>
          <p
            style={{ fontSize: `${comp?.description?.size || 14}px` }}
            className="text-center"
          >
            {comp?.description?.content}
          </p>
        </>
      )}
    </div>
  );
}
