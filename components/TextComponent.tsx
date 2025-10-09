import { Comp } from "@/types";

import { useTarget } from "@/app/context/TargetContext";
import { usePage } from "@/app/context/PagesContext";
import { useIndex } from "@/app/context/IndexContext";
import { useState } from "react";


type TextComponentProps = {
  comp: Comp;
};

export default function TextComponent({ comp }: TextComponentProps) {

  const { targetLevel, targetComp, setTargetComp } = useTarget();
  const { pages, setPages } = usePage();
  const { currentIndex } = useIndex();
  const [selected, setSelected] = useState<number>();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

  const updatedPages = pages.map((page, pageIndex) => {

    if (pageIndex !== currentIndex) return page // mantém outras páginas iguais

    const updatedLevels = page.levels.map(level => {
      if (level.id !== targetLevel?.id) return level

      const updatedComps = level.comps.map(comp => {
        if(comp.id !== targetComp?.id) return comp

        return {
          ...comp,
          title: { content: e.target.value, size: 60}
        }
      })

      return {
        ...level,
        comps: updatedComps
      }
    })

    return {
      ...page,
      levels: updatedLevels,
    };

  })



setPages(updatedPages)

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



  return (
    <div onClick={() => setTargetComp(comp)} className="flex flex-col cursor-pointer self-start">
      {comp?.id === targetComp?.id ? (
        <>
          <div className="relative">
            <input
              size={targetComp?.title?.content.length || 1}
              className="text-center font-bold"
              style={{ fontSize: `${comp?.title?.size || 16}px` }}
              type="text"
              value={comp?.title?.content}
              onChange={handleTitleChange}
            />
          </div>
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
