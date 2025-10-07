import { usePage } from "@/app/context/PagesContext";
import { useIndex } from "@/app/context/IndexContext";
import { useState } from "react";

export default function PagesList() {
  const { pages, setPages } = usePage();
  const {currentIndex, setCurrentIndex } = useIndex();

  const [selected, setSelected] = useState<number | null>(null);

  const handleSelected = (index: number) => {
    setSelected(index);
    setCurrentIndex(index);
  };

  const newPage = {
    id: pages.length + 1,
    duration: 3000,
    levels: [
      {
        id: Date.now(), // gera um id único
        comps: [],
      },
    ],
  };

  const handleNewPage = () => {
    setSelected(null);
    setPages([...pages, newPage]);
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="w-60 h-screen border rounded-lg shadow-lg bg-white">
      {/* aqui limitamos o conteúdo a ocupar 100% da altura da tela */}

      <div className="h-full overflow-y-auto p-6 space-y-4">

        
        {/* Div da pagina em branco */}
        <div
          onClick={() => handleNewPage()}
          className={`h-50 w-30 border ${
            selected === null && "border-red-500 border-2"
          } flex justify-center items-center`}
        ></div>

        {pages.map((page, index) => (
          <div
            key={index}
            onClick={() => handleSelected(index)}
            className={`h-50 w-30 border ${
              index === selected && "border-red-500 border-2"
            } flex justify-center items-center`}
          >
            <p>{index}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
