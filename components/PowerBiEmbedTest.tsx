"use client"

import { useEffect } from "react"
import { usePage } from "@/app/context/PagesContext";

import { useSwitch } from "@/app/context/SwitchContext";

import { Pagination } from 'antd';

import { useIndex } from "@/app/context/IndexContext";


export default function PowerBiEmbedTest ()  {

  const { currentIndex, setCurrentIndex } = useIndex();

  console.log(currentIndex, "CURRENT INDEX")


  const { checked } = useSwitch();

  const { pages, setPages } = usePage();

  console.log(pages)

    useEffect(() => {
    fetch("/pages.json")
      .then(res => res.json())
      .then(data => setPages(data))

  }, [setPages]);


    const onChange = (page: number) => {
     setCurrentIndex(page - 1);
  }

  useEffect(() => {

    const currentScreen =  pages[currentIndex];

    if(pages.length === 0) return

    const timer = setTimeout(() => {

      if (checked) {
        setCurrentIndex((prevIndex) =>
          prevIndex === pages.length - 1 ? 0 : prevIndex + 1
        );
      }

    }, currentScreen?.duration);

    return () => clearTimeout(timer)
  }, [currentIndex, checked, pages, setCurrentIndex]);

  console.log("Pagina atual", currentIndex)


  return (
    <>
      <div className="flex flex-col justify-baseline px-4 w-full overflow-hidden h-full flex-1">
        {pages[currentIndex]?.levels.map((level, index) => (
          <div key={index} className="flex flex-row gap-4 mb-3 justify-center items-center h-full">
            {level.comps.map((comp, index) => (
              <div className="flex justify-center bg-white" key={index}>
                {comp.type === "chart" && (
                  <iframe
                    src={comp.url}
                    style={{ aspectRatio: '16 / 9', width: `${comp.width}vw` }}
                    allowFullScreen
                  />
                )}
                <div>
                  {comp.type === "image" && (
                    <div className="flex flex-col items-end">
                      <iframe height={comp.height} width={comp.width} src={comp.url}
                        title="chart"></iframe>
                    </div>
                  )}
                </div>
                {comp.type === "video" && (
                  <iframe src={comp.url}
                    style={{ aspectRatio: '16 / 9', width: `${comp.width}vw` }}
                    width={`${comp.width}%`} title="31_10_2024, 11_17_16 - ScreenRec - Projeto de Vídeo 7.webm"
                    allow="autoplay; encrypted-media"
                  ></iframe>
                )}
                {comp.type === "text" && (
                  <div className="flex flex-col">
                    <h1
                      style={{ fontSize: `${comp.title?.size}px` }}
                      className="text-center font-bold"
                    >
                      {comp.title?.content}
                    </h1>
                    <p
                      style={{ fontSize: `${comp.description?.size}px` }}
                      className="text-center"
                    >
                      {comp.description?.content}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <footer className="text-center bg-white border-t-1 border-zinc-300 text-zinc-900 flex justify-end items-center gap-10 bottom-0 w-full max-h-10">
            { <div className="flex flex-col justify-end items-center">
                <Pagination defaultPageSize={1} total={pages.length} onChange={onChange} />
            </div>}
          <div className="flex items-center">
            Desenvolvido por
            <img src="/logo-bmi.jpg"/>
          </div>
      </footer>
    </>
  )
}
