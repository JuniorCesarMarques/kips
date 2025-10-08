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
    const { editing } = useTarget();

    const lastPageId = pages[pages.length -1]?.id;
    const lasTLevelId = pages[pages.length -1]?.levels[pages[pages.length -1]?.levels.length - 1].id
    const lastCompId = pages[pages.length -1]?.levels[pages[pages.length -1]?.levels.length - 1].comps[pages[pages.length -1]?.levels[pages[pages.length -1]?.levels.length - 1]?.comps.length - 1].id;


    // Página em branco
const newPage = {
  id: lastPageId + 1,
  done: false,
  duration: 3000,
  levels: [
    {
      id: lasTLevelId + 1,
      comps: [
        {
            id: lastCompId + 1,
        }
      ] // Nenhum componente por enquanto
    }
  ]
};

const handleAddText = () => {

  const comp = pages[pages.length - 1].levels.map(level => level.comps.map(comp => comp));


  setPages([...pages, ])
}


const handleNewPage = () => {
    setPages([...pages, newPage]);
}

    return (
        <div className="fixed top-0 mb-50 w-full z-50 flex flex-col bg-white border p-2 cursor-pointer">
            <DropDown />
            <div className="px-30 flex gap-20">
                <FileAddOutlined onClick={() => handleNewPage()} className="text-5xl" />

                {/* Tools */}
                <div className="flex items-start gap-2">
                  {editing?.type === "text" && <div>
                      <Select />
                  </div>}
                    <CiText onClick={() => handleAddText()} size={25} />
                    <MdOndemandVideo size={25} />
                    <FaRegChartBar size={25} />
                    <RiImageAddFill size={25} />
                </div>
            </div>
        </div>
    )
}