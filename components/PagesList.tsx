import { usePage } from "@/app/context/PagesContext";
import { useIndex } from "@/app/context/IndexContext";
import { useState } from "react";

import { MdDeleteOutline } from "react-icons/md";
import MainScreen from "./MainScreen";

export default function PagesList() {
  const { pages, setPages } = usePage();
  const { currentIndex, setCurrentIndex } = useIndex();

  const [selected, setSelected] = useState<number | null>(currentIndex);

  const [closeButton, setCloseButton] = useState<number | null>(null);

  const handleSelected = (id: number) => {
    console.log(id)
    setSelected(id);
    setCurrentIndex(id);
  };

  return (
    <div className="w-60 h-screen border rounded-lg shadow-lg bg-white">
      {/* aqui limitamos o conteúdo a ocupar 100% da altura da tela */}

      <div className="h-full overflow-y-auto p-6 space-y-4">
        {pages
          .filter((page) => page.status === "empty" || page.status === "editing")
          .slice()
          .reverse()
          .map((page, index) => (
            <div
              onMouseEnter={() => setCloseButton(page.id)}
              onMouseLeave={() => setCloseButton(null)}
              className={`relative h-50 w-30 border ${
                page.id === selected && "border-red-500 border-2"
              } flex justify-center items-center`}
              key={index}
              onClick={() => handleSelected(page.id)}
            >
              <MainScreen thumbNail pagesListIndex={page.id}/>
              {closeButton === page.id && (
                <span className="absolute top-2 right-2">
                  <MdDeleteOutline className="cursor-pointer" size={20} />
                </span>
              )}
            </div>
          ))}

        {pages
          .filter((page) => page.status === "done")
          .map((page, index) => (
            <div
              key={index}
              onMouseLeave={() => setCloseButton(null)}
              onMouseEnter={() => setCloseButton(page.id)}
              onClick={() => handleSelected(page.id)}
              className={`relative h-50 w-30 border ${
                page.id === selected && "border-red-500 border-2"
              } flex justify-center overflow-hidden items-center`}
            >
              {closeButton === page.id && (
                <span className="absolute top-2 right-2">
                  <MdDeleteOutline className="cursor-pointer" size={20} />
                </span>
              )}
              <div>
                <MainScreen thumbNail pagesListIndex={page.id}/>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
