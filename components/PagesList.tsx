import { usePage } from "@/app/context/PagesContext";
import { useIndex } from "@/app/context/IndexContext";
import { useState } from "react";

export default function PagesList() {
  const { pages, setPages } = usePage();
  const { currentIndex, setCurrentIndex } = useIndex();

  const [selected, setSelected] = useState<number | null>(currentIndex);

  const handleSelected = (id: number) => {
    setSelected(id);
    setCurrentIndex(id);
  };


  return (
    <div className="w-60 h-screen border rounded-lg shadow-lg bg-white">
      {/* aqui limitamos o conteúdo a ocupar 100% da altura da tela */}


      <div className="h-full overflow-y-auto p-6 space-y-4">


        {pages.filter(page => !page.done).slice().reverse().map((page, index) => (
          <div className={`h-50 w-30 border ${
              page.id === selected && "border-red-500 border-2"
            } flex justify-center items-center`} key={index} onClick={() => handleSelected(page.id)}>

          </div>
        ))}

        {pages.filter(page => page.done).map((page, index) => (
          <div
            key={index}
            onClick={() => handleSelected(page.id)}
            className={`h-50 w-30 border ${
              page.id === selected && "border-red-500 border-2"
            } flex justify-center items-center`}
          >
            <p>{page.id + 1}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
