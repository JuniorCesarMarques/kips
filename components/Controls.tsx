import DropDown from "@/components/DropDown";
import { FileAddOutlined } from "@ant-design/icons";

import { usePage } from "@/app/context/PagesContext";
import { useTarget } from "@/app/context/TargetContext";
import { CiText } from "react-icons/ci";
import { MdOndemandVideo } from "react-icons/md";
import { FaRegChartBar } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";


import Select from "./TextSizeSelect";


export default function Controls() {

    const { pages, setPages } = usePage();
    const { comp, targetLevel } = useTarget();

    const lastPage = pages[pages.length - 1];
    const lasTLevel = lastPage?.levels[pages[pages.length -1]?.levels.length - 1]
    const lastComp = pages[pages.length -1]?.levels[pages[pages.length -1]?.levels.length - 1].comps[pages[pages.length -1]?.levels[pages[pages.length -1]?.levels.length - 1]?.comps.length - 1]


    // Página em branco
const newPage = {
  id: lastPage?.id + 1,
  done: false,
  duration: 3000,
  levels: [
    {
      id: lasTLevel?.id + 1,
      comps: [
        {
            id: lastComp?.id + 1,
        }
      ] // Nenhum componente por enquanto
    }
  ]
};
 

// Cria o novo componente de texto e seta o estado da página
const handleAddText = () => {
  const newTextComp = {
    id: lastComp?.id + 1,
    type: "text",
    title: { content: comp?.title?.content || "Texto", size: 60 },
  };


  // Atualiza o último nível com o novo componente
  const updatedLevel = {
    ...lasTLevel,
    comps: [...lasTLevel.comps, newTextComp],
  };

  // Atualiza a última página com o nível atualizado
  const updatedPage = {
    ...lastPage,
    levels: [...lastPage.levels, updatedLevel],
  };

  setPages(pages.map(page =>
    page.id === updatedPage.id ? updatedPage : page
  ));
};



const handleNewPage = () => {
    setPages([...pages, newPage]);
}

    return (
        <div className="fixed top-0 mb-50 w-full z-1 flex flex-col bg-white border p-2">
            <DropDown />
            <div className="px-30 flex gap-20">
                <FileAddOutlined onClick={() => handleNewPage()} className="text-5xl" />

                {/* Tools */}
                <div className="flex items-center gap-2">
                  {comp?.type === "text" && <div>
                      <Select />
                  </div>}
                    <div className={`flex gap-1 ${!targetLevel && "opacity-50 pointer-events-none"}`}>
                      <CiText onClick={() => handleAddText()} size={25} />
                      <MdOndemandVideo size={25} />
                      <FaRegChartBar size={25} />
                      <RiImageAddFill size={25} />
                    </div>
                </div>
            </div>
        </div>
    )
}