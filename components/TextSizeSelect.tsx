import React from 'react';
import { Select, Space } from 'antd';

import { useTarget } from "@/app/context/TargetContext";
import { usePage } from "@/app/context/PagesContext";
import { useIndex } from "@/app/context/IndexContext";

const App: React.FC = () => {
  const { editing } = useTarget();
  const { pages, setPages } = usePage();
  const { currentIndex } = useIndex();

  const handleChange = (value: string) => {
    const currentPage = pages[currentIndex];

    const currentLevel = currentPage.levels.find(level =>
      level.comps.some(comp => comp.id === editing?.id)
    );

    if (!currentLevel) return;

    const currentCompIndex = currentLevel.comps.findIndex(comp => comp.id === editing?.id);
    if (currentCompIndex === -1) return;

    const currentComp = currentLevel.comps[currentCompIndex];

    // Atualiza o comp com novo tamanho de fonte
    const updatedComp = {
      ...currentComp,
      title: {
        content: currentComp.title?.content ?? "",
        size: Number(value),
      },
    };

    const updatedComps = [...currentLevel.comps];
    updatedComps[currentCompIndex] = updatedComp;

    const updatedLevel = { ...currentLevel, comps: updatedComps };

    const levelIndex = currentPage.levels.findIndex(level =>
      level.comps.some(comp => comp.id === editing?.id)
    );

    const updatedLevels = [...currentPage.levels];
    updatedLevels[levelIndex] = updatedLevel;

    const updatedPage = { ...currentPage, levels: updatedLevels };

    const updatedPages = [...pages];
    updatedPages[currentIndex] = updatedPage;

    setPages(updatedPages);
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
