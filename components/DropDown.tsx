import React from 'react';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import { PlusSquareOutlined } from '@ant-design/icons';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <span>Adicionar elemento</span>
    ),
  },
];

const DropDown: React.FC = () => (
  <Space direction="vertical">
    <Space wrap>
      <Dropdown menu={{ items }} placement="bottomLeft">
        <PlusSquareOutlined className='text-3xl' />
      </Dropdown>
    </Space>
  </Space>
);

export default DropDown;