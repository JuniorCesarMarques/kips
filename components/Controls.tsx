import DropDown from "@/components/DropDown";
import { FileAddOutlined } from "@ant-design/icons";

import { usePage } from "@/app/context/PagesContext";
import { useTarget } from "@/app/context/TargetContext";

import Select from "./Select";


export default function Controls() {

    const { pages, setPages } = usePage();
    const { editing } = useTarget();

    const lastPageId = pages[pages.length -1]?.id;
    const lasTLevelId = pages[pages.length -1]?.levels[pages[pages.length -1]?.levels.length - 1].id
    const lastCompId = pages[pages.length -1]?.levels[pages[pages.length -1]?.levels.length - 1].comps[pages[pages.length -1]?.levels[pages[pages.length -1]?.levels.length - 1]?.comps.length - 1].id;


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


const handleNewPage = () => {
    setPages([...pages, newPage]);
}

    return (
        <div className="w-full flex flex-col border p-2 cursor-pointer">
            <DropDown />
            <div className="px-50 flex gap-2">
                <FileAddOutlined onClick={() => handleNewPage()} className="text-3xl" />
                {editing?.type === "text" && <div>
                    <Select />
                </div>}
            </div>
        </div>
    )
}