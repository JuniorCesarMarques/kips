import DropDown from "@/components/DropDown";
import { FileAddOutlined } from "@ant-design/icons";


export default function Controls() {
    return (
        <div className="w-full flex flex-col border p-2 cursor-pointer">
            <DropDown />
            <div className="px-50">
                <FileAddOutlined className="text-3xl" />
            </div>
        </div>
    )
}