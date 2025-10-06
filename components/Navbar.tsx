"use client";

import { useSwitch } from "@/app/context/SwitchContext";

import { Space, Switch } from 'antd';
import Menu from "./Menu";

export default function Navbar() {

  const { checked, setChecked } = useSwitch();

  const onChange = () => {
    setChecked(!checked);

  };

  return (
    <nav className="flex gap-2 fixed top-0 ml-2">
      {!checked && <Menu />}
      <Space direction="vertical">
          <Switch onChange={onChange} checkedChildren="Apresentação" unCheckedChildren="Edição" defaultChecked />
      </Space>
    </nav>

  )
}
