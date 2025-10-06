"use client"

import { UseFormRegister, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { Comp, Page } from "@/types";
import CompTextFields from "@/components/CompTextFields";
import { useEffect } from "react";

type Props = {
  comp: Comp;
  compIndex: number;
  levelIndex: number;
  register: UseFormRegister<Page>;
  watch: UseFormWatch<Page>;
  setValue: UseFormSetValue<Page>;
  formState: string
};

export default function CompControls({ comp, compIndex, levelIndex, register, watch, setValue, formState }: Props) {

  console.log("formstate", formState)

  useEffect(() => {
    if(formState === "edit") {
      console.log("Entrou em novo")
    setValue(`levels.${levelIndex}.comps.${compIndex}.type`, comp.type);
    setValue(`levels.${levelIndex}.comps.${compIndex}.width`, comp.width);
    setValue(`levels.${levelIndex}.comps.${compIndex}.url`, comp.url);
    }
  }, [comp, formState, compIndex, levelIndex, setValue])



  const compType = watch(`levels.${levelIndex}.comps.${compIndex}.type`) || comp.type;

  return (
    <div className="flex flex-col gap-3 border p-2 rounded mb-3">
      <div className="flex gap-2 items-end">

        {/* Tipo */}
        <div className="flex flex-col">
          <label htmlFor={`type-${levelIndex}-${compIndex}`}>Tipo</label>
          <select
            id={`type-${levelIndex}-${compIndex}`}
            {...register(`levels.${levelIndex}.comps.${compIndex}.type`)}
            defaultValue={comp.type}
            className="border rounded w-30"
          >
            <option value="image">Imagem</option>
            <option value="video">Vídeo</option>
            <option value="text">Texto</option>
            <option value="dashboard">Dashboard</option>
          </select>
        </div>

        {/* Campos comuns */}
        {compType !== "text" && (
          <>
            <div className="flex flex-col">
              <label htmlFor={`width-${levelIndex}-${compIndex}`}>Largura</label>
              <input
                type="number"
                id={`width-${levelIndex}-${compIndex}`}
                {...register(`levels.${levelIndex}.comps.${compIndex}.width`, { valueAsNumber: true })}
                className="border rounded w-30"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor={`height-${levelIndex}-${compIndex}`}>Altura</label>
              <input
                type="number"
                id={`height-${levelIndex}-${compIndex}`}
                {...register(`levels.${levelIndex}.comps.${compIndex}.height`, { valueAsNumber: true })}
                className="border rounded w-30"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor={`url-${levelIndex}-${compIndex}`}>URL</label>
              <input
                type="text"
                id={`url-${levelIndex}-${compIndex}`}
                {...register(`levels.${levelIndex}.comps.${compIndex}.url`)}
                className="border rounded w-60"
              />
            </div>
          </>
        )}
      </div>

      {/* Campos de texto */}
      {compType === "text" && (
        <CompTextFields
          formState={formState}
          setValue={setValue}
          register={register}
          comp={comp}
          levelIndex={levelIndex}
          compIndex={compIndex}
        />
      )}
    </div>
  );
}
