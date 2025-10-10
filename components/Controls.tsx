import DropDown from "@/components/DropDown";
import { FileAddOutlined } from "@ant-design/icons";

import { usePage } from "@/app/context/PagesContext";
import { useTarget } from "@/app/context/TargetContext";
import { useIndex } from "@/app/context/IndexContext";

import { CiText } from "react-icons/ci";
import { MdOndemandVideo } from "react-icons/md";
import { FaRegChartBar } from "react-icons/fa";
import { RiImageAddFill } from "react-icons/ri";


import Select from "./TextSizeSelect";
import { Page } from "@/types";
import { Comp } from "@/types";


export default function Controls() {

    const { pages, setPages } = usePage();
    const { targetComp, targetLevel, targetPage } = useTarget();
    const {currentIndex} = useIndex();

    const lastPage = pages[pages.length - 1];
    const lasTLevel = lastPage?.levels[lastPage?.levels.length - 1]
    const lastComp = lastPage?.levels[lastPage?.levels.length - 1].comps[lastPage?.levels[lastPage?.levels.length - 1]?.comps.length - 1]


// Página em branco
const newPage: Page = {
  id: lastPage?.id + 1,
  status: "empty",
  duration: 3000,
  levels: [
    {
      id: lasTLevel?.id + 1,
      comps: [
        {
            id: lastComp?.id + 1,
            type: "",
            url: "",
            width: null,
            height: null,
            title: {content: "", size: null},
        }
      ] // Nenhum componente por enquanto
    }
  ]
};

// Cria o novo componente de texto e seta o estado da página
 const handleAddText = () => {
  const newTextComp: Comp = {
    id: (lastComp?.id as number) + 1,
    url: "",
    width: null,
    height: null,
    description: null,
    type: "text",
    title: { content: "Texto", size: 60 },
  };

  const updatedPages = pages.map((page, pageIndex) => {

    if (pageIndex !== currentIndex) return page // mantém outras páginas iguais

    const updatedLevels = page.levels.map(level => {
      if (level.id !== targetLevel?.id) return level

      return {
        ...level,
        comps: [...level.comps, newTextComp]
      }
    })

    return {
      ...page,
      levels: updatedLevels,
      status: "editing" as const,
    };

  });

setPages(updatedPages);

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
                  {targetComp?.type === "text" && <div>
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