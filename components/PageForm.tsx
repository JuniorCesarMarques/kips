'use client';

import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Page, Level, Comp } from '@/types';

import LevelControls from './LevelControls';

import { savePages } from '@/lib/savePages';

type PageFormProps = {
  formState: 'new' | 'edit';
  pages: Page[];
  setPages: React.Dispatch<React.SetStateAction<Page[]>>;
  currentIndex?: number;
  setCurrentIndex?: React.Dispatch<React.SetStateAction<number>>;
};

export default function PageForm({
  formState,
  pages,
  setPages,
  currentIndex = 0,
  setCurrentIndex,
}: PageFormProps) {
  const { register, handleSubmit, reset, setValue, watch } = useForm<Page>();

  // Local levels state para editar/add levels e comps
  const [levels, setLevels] = useState<Level[]>([]);

  // Carrega página no form + levels locais
  useEffect(() => {
    if (formState === 'edit' && pages.length > 0 && currentIndex < pages.length) {
      const page = pages[currentIndex];
      reset(page);
      setLevels(page.levels || []);
    } else {
      reset({ duration: 5000, levels: [] });
      setLevels([]);
    }
  }, [formState, currentIndex, pages, reset]);

  // Sincroniza levels no form antes de salvar
  const onSubmit: SubmitHandler<Page> = (data) => {
    const pageToSave: Page = {
      ...data,
      levels,
    };

    if (formState === 'edit') {
      setPages((prev) => prev.map((p, i) => (i === currentIndex ? pageToSave : p)));
    } else if (formState === 'new') {
      setPages((prev) => [...prev, pageToSave]);
      if (setCurrentIndex) setCurrentIndex(pages.length); // nova página no fim
      reset({ duration: 5000, levels: [] });
      setLevels([]);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto">
      <div className="mb-6">
        <label htmlFor="duration" className="block font-semibold mb-2">
          Duração (ms)
        </label>
        <input
          type="number"
          {...register('duration', { valueAsNumber: true })}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <LevelControls levels={levels} setLevels={setLevels} />

      <button
        type="submit"
        onClick={() => savePages(pages)}
        className="w-full py-3 mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition"
      >
        {formState === 'new' ? 'Começar' : 'Salvar Alterações'}
      </button>
    </form>
  );
}
