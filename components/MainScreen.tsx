"use client";

import { useEffect, useState } from "react";
import { usePage } from "@/app/context/PagesContext";

import { useIndex } from "@/app/context/IndexContext";

import { useEdit } from "@/app/context/EditContext";
import TextComponent from "./TextComponent";
import ImageComponent from "./ImageComponent";

export default function MainScreen() {
  const { currentIndex, setCurrentIndex } = useIndex();
  const { edit } = useEdit();
  const { pages } = usePage();


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

  console.log("Pagina atual", currentIndex);

  return (
    <>
      <div className="flex flex-col justify-baseline px-4 w-full overflow-hidden h-full flex-1">
        {pages[currentIndex]?.levels.map((level, index) => (
          <div
            key={index}
            className="flex flex-row gap-4 mb-3 justify-center items-center h-full"
          >
            {level.comps.map((comp, index) => (
              <div className="flex justify-center bg-white" key={index}>
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
