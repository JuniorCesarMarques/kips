"use client";

import { useEffect } from "react";
import { usePage } from "@/app/context/PagesContext";

import { useIndex } from "@/app/context/IndexContext";
import { useTarget } from "@/app/context/TargetContext";

import { useEdit } from "@/app/context/EditContext";
import TextComponent from "./TextComponent";
import ImageComponent from "./ImageComponent";

export default function MainScreen({pagesListIndex, thumbNail}: {pagesListIndex?: number, thumbNail?: boolean}) {
  const { currentIndex, setCurrentIndex } = useIndex();
  const { edit } = useEdit();
  const { setPages, pages } = usePage();
  const { targetPage, targetComp, targetLevel, setTargetLevel } = useTarget();

  useEffect(() => {
    setPages(pages.map(page => page.id === targetPage?.id ? targetPage : page))
  }, [targetComp])


  useEffect(() => {
    const currentScreen = pages[currentIndex];

    if (pages.length === 0) return;

    const timer = setTimeout(() => {
      if (!edit) {
        setCurrentIndex((prevIndex) =>
          prevIndex === pages.length - 1 ? 0 : prevIndex + 1
        );
      }
    }, currentScreen?.duration);

    return () => clearTimeout(timer);
  }, [currentIndex, edit, pages, setCurrentIndex]);

  console.log(targetComp)


  return (
    <>
      <div className={`${thumbNail && "scale-20"} flex flex-col justify-baseline px-4 w-full overflow-hidden h-full flex-1`}>
        {pages[thumbNail ? pagesListIndex as number : currentIndex]?.levels.map((level, index) => (
          <div
            onClick={() => setTargetLevel(level)}
            key={index}
            className={`flex flex-row gap-4 mb-3 ${targetLevel?.id  === level.id && !thumbNail && "border"} justify-center items-center h-full`}
          >
            {level.comps.map((comp, index) => (
              <div className="flex justify-center" key={index}>
                {comp.type === "chart" && (
                  <iframe
                    src={comp.url}
                    style={{ aspectRatio: "16 / 9", width: `${comp.width}vw` }}
                    allowFullScreen
                  />
                )}
                <div>
                  {comp.type === "image" && (
                    <ImageComponent comp={comp} />
                  )}
                </div>
                {comp.type === "video" && (
                  <iframe
                    src={comp.url}
                    style={{ aspectRatio: "16 / 9", width: `${comp.width}vw` }}
                    width={`${comp.width}%`}
                    title="31_10_2024, 11_17_16 - ScreenRec - Projeto de Vídeo 7.webm"
                    allow="autoplay; encrypted-media"
                  ></iframe>
                )}
                {comp.type === "text" && (
                  <TextComponent comp={comp} />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
