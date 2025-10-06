'use client';

import React, { useState } from 'react';
import { Drawer } from 'antd';
import { MenuOutlined, FileOutlined } from '@ant-design/icons';

import Link from 'next/link';



const Menu = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);


  return (
    <>
      <MenuOutlined
        onClick={showDrawer}
        className="text-2xl cursor-pointer"
        aria-label="Abrir menu"
      />
      <Drawer
        placement="left"
        title="Página"
        closable={{ 'aria-label': 'Fechar menu' }}
        onClose={onClose}
        open={open}
        width={200}
      >
        <nav className="mb-5 flex justify-center">
          <ul className="flex gap-6 list-none p-0 m-0">
            <li>
              <Link href="/create">
                <FileOutlined className='text-3xl' />
              </Link>
              <p>Novo</p>
            </li>
          </ul>
        </nav>
      </Drawer>
    </>
  );
};

export default Menu;
