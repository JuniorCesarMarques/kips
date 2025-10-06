'use client';

import React from 'react';
import { Level, Comp } from '@/types';

type LevelControlsProps = {
  levels: Level[];
  setLevels: React.Dispatch<React.SetStateAction<Level[]>>;
};

export default function LevelControls({ levels, setLevels }: LevelControlsProps) {
  const addLevel = () => {
    const newId = levels.length > 0 ? levels[levels.length - 1].id + 1 : 1;
    setLevels([...levels, { id: newId, comps: [] }]);
  };

  const removeLevel = (index: number) => {
    const newLevels = [...levels];
    newLevels.splice(index, 1);
    setLevels(newLevels);
  };

  const addComponent = (levelIndex: number, type: Comp['type']) => {
    const level = levels[levelIndex];
    const newId = level.comps.length > 0 ? level.comps[level.comps.length - 1].id + 1 : 1;

    const newComp: Comp = { id: newId, type };
    const newLevels = [...levels];
    newLevels[levelIndex] = {
      ...level,
      comps: [...level.comps, newComp],
    };
    setLevels(newLevels);
  };

  const removeComponent = (levelIndex: number, compIndex: number) => {
    const newLevels = [...levels];
    newLevels[levelIndex].comps.splice(compIndex, 1);
    setLevels(newLevels);
  };

  const updateComponent = (
    levelIndex: number,
    compIndex: number,
    field: keyof Comp,
    value: any
  ) => {
    const newLevels = [...levels];
    const comp = newLevels[levelIndex].comps[compIndex];

    if ((field === 'title' || field === 'description') && typeof value === 'object') {
      newLevels[levelIndex].comps[compIndex] = {
        ...comp,
        [field]: { ...comp[field], ...value },
      };
    } else {
      newLevels[levelIndex].comps[compIndex] = {
        ...comp,
        [field]: value,
      };
    }

    setLevels(newLevels);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Níveis</h3>
        <button
          type="button"
          onClick={addLevel}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition"
        >
          + Adicionar Nível
        </button>
      </div>

      {levels.length === 0 && (
        <p className="text-gray-500 mb-6">Nenhum nível adicionado ainda.</p>
      )}

      {levels.map((level, levelIndex) => (
        <section
          key={level.id}
          className="mb-8 p-4 border border-gray-300 rounded shadow-sm bg-white"
        >
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold">Nível {levelIndex + 1}</h4>
            <button
              type="button"
              onClick={() => removeLevel(levelIndex)}
              className="text-red-600 hover:underline"
            >
              Remover Nível
            </button>
          </div>

          {level.comps.length === 0 && (
            <p className="text-gray-500 mb-4">Nenhum componente neste nível.</p>
          )}

          {level.comps.map((comp, compIndex) => (
            <div
              key={comp.id}
              className="mb-6 p-3 border border-gray-200 rounded bg-gray-50 shadow-inner"
            >
              <div className="flex justify-between items-center mb-2">
                <h5 className="font-semibold">
                  Componente {compIndex + 1} - {comp.type}
                </h5>
                <button
                  type="button"
                  onClick={() => removeComponent(levelIndex, compIndex)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Remover
                </button>
              </div>

              {/* FORM CAMPOS POR TIPO */}
              <div className="space-y-3">
                {/* Tipo desabilitado */}
                <div>
                  <label className="block font-medium mb-1">Tipo</label>
                  <select
                    disabled
                    value={comp.type}
                    className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
                  >
                    <option value="image">Imagem</option>
                    <option value="text">Texto</option>
                    <option value="video">Vídeo</option>
                    <option value="chart">Power BI</option>
                  </select>
                </div>

                {/* TEXT */}
                {comp.type === 'text' && (
                  <>
                    <input
                      type="text"
                      placeholder="Título"
                      value={comp.title?.content || ''}
                      onChange={(e) =>
                        updateComponent(levelIndex, compIndex, 'title', { content: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded"
                    />
                    <input
                      type="number"
                      placeholder="Tamanho do Título"
                      value={comp.title?.size ?? ''}
                      onChange={(e) =>
                        updateComponent(levelIndex, compIndex, 'title', { size: +e.target.value || 0 })
                      }
                      className="w-full px-3 py-2 border rounded"
                    />
                    <input
                      type="text"
                      placeholder="Descrição"
                      value={comp.description?.content || ''}
                      onChange={(e) =>
                        updateComponent(levelIndex, compIndex, 'description', { content: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded"
                    />
                    <input
                      type="number"
                      placeholder="Tamanho da Descrição"
                      value={comp.description?.size ?? ''}
                      onChange={(e) =>
                        updateComponent(levelIndex, compIndex, 'description', { size: +e.target.value || 0 })
                      }
                      className="w-full px-3 py-2 border rounded"
                    />
                  </>
                )}

                {/* IMAGE */}
                {comp.type === 'image' && (
                  <>
                    <input
                      type="text"
                      placeholder="URL da Imagem"
                      value={comp.url || ''}
                      onChange={(e) =>
                        updateComponent(levelIndex, compIndex, 'url', e.target.value)
                      }
                      className="w-full px-3 py-2 border rounded"
                    />
                    <input
                      type="number"
                      placeholder="Largura"
                      value={comp.width ?? ''}
                      onChange={(e) =>
                        updateComponent(levelIndex, compIndex, 'width', +e.target.value || null)
                      }
                      className="w-full px-3 py-2 border rounded"
                    />
                    <input
                      type="number"
                      placeholder="Altura"
                      value={comp.height ?? ''}
                      onChange={(e) =>
                        updateComponent(levelIndex, compIndex, 'height', +e.target.value || null)
                      }
                      className="w-full px-3 py-2 border rounded"
                    />
                  </>
                )}

                {/* VIDEO */}
                {comp.type === 'video' && (
                  <>
                    <input
                      type="text"
                      placeholder="URL do Vídeo"
                      value={comp.url || ''}
                      onChange={(e) =>
                        updateComponent(levelIndex, compIndex, 'url', e.target.value)
                      }
                      className="w-full px-3 py-2 border rounded"
                    />
                    <input
                      type="number"
                      placeholder="Largura (vw)"
                      value={comp.width ?? ''}
                      onChange={(e) =>
                        updateComponent(levelIndex, compIndex, 'width', +e.target.value || null)
                      }
                      className="w-full px-3 py-2 border rounded"
                    />
                  </>
                )}

                {/* CHART (Power BI) */}
                {comp.type === 'chart' && (
                  <>
                    <input
                      type="text"
                      placeholder="URL do Power BI"
                      value={comp.url || ''}
                      onChange={(e) =>
                        updateComponent(levelIndex, compIndex, 'url', e.target.value)
                      }
                      className="w-full px-3 py-2 border rounded"
                    />
                    <input
                      type="number"
                      placeholder="Largura (vw)"
                      value={comp.width ?? ''}
                      onChange={(e) =>
                        updateComponent(levelIndex, compIndex, 'width', +e.target.value || null)
                      }
                      className="w-full px-3 py-2 border rounded"
                    />
                  </>
                )}
              </div>
            </div>
          ))}

          <div className="flex flex-wrap gap-3 mt-4">
            <button
              type="button"
              onClick={() => addComponent(levelIndex, 'image')}
              className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition"
            >
              + Imagem
            </button>
            <button
              type="button"
              onClick={() => addComponent(levelIndex, 'text')}
              className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition"
            >
              + Texto
            </button>
            <button
              type="button"
              onClick={() => addComponent(levelIndex, 'video')}
              className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition"
            >
              + Vídeo
            </button>
            <button
              type="button"
              onClick={() => addComponent(levelIndex, 'chart')}
              className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition"
            >
              + Power BI
            </button>
          </div>
        </section>
      ))}
    </div>
  );
}
