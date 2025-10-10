import React from 'react';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';

const items: MenuProps['items'] = [
  {
    label: (
      <p>Salvar</p>
    ),
    key: '0',
  },
];

const App: React.FC = () => (

  <Dropdown menu={{ items }} trigger={['click']}>
    <a onClick={(e) => e.preventDefault()}>
      <Space>
        Arquivo
      </Space>
    </a>
  </Dropdown>
);

export default App;