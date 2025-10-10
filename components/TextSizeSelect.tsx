import React from 'react';
import { Select, Space } from 'antd';

import { useTarget } from "@/app/context/TargetContext";
import { usePage } from "@/app/context/PagesContext";
import { useIndex } from "@/app/context/IndexContext";

import { Text } from '@/types';

const App: React.FC = () => {
  const { targetComp, targetLevel} = useTarget();
  const { pages, setPages } = usePage();
  const { currentIndex } = useIndex();

  const handleChange = (value: string) => {

    setPages(pages.map((page) => {
      if(page.id !== pages[currentIndex].id) return page

      const updatedLevels = page.levels.map(level => {
        if(level.id !== targetLevel?.id) return level


        const updatedComps = level.comps.map(comp => {
          if(comp.id !== targetComp?.id) return comp

          return {
            ...comp,
            title: {content: (targetComp?.title as Text).content , size: Number(value)}
          }
          
        })

        return {
          ...level,
          comps: updatedComps
        }

      })

      return {
        ...page,
        levels: updatedLevels
      }
    }))

  };

  return (
    <Space wrap>
      <Select
        onChange={handleChange}
        showSearch
        defaultValue="60"
        style={{ width: 60 }}
        options={[
          { value: '12', label: '12px' },
          { value: '14', label: '14px' },
          { value: '16', label: '16px' },
          { value: '18', label: '18px' },
          { value: '24', label: '24px' },
          { value: '32', label: '32px' },
          { value: '48', label: '48px' },
          { value: '60', label: '60px' },
          { value: '72', label: '72px' }
        ]}
      />
    </Space>
  );
};

export default App;
