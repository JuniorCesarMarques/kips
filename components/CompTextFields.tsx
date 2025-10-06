import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { Comp, Page } from "@/types";
import { useEffect } from "react";

type Props = {
  comp: Comp;
  levelIndex: number;
  compIndex: number;
  register: UseFormRegister<Page>;
  setValue: UseFormSetValue<Page>;
  formState: string;
};

export default function CompTextFields({ comp, levelIndex, compIndex, register, setValue, formState }: Props) {

  useEffect(() => {

    if(formState === "edit") {
    setValue(`levels.${levelIndex}.comps.${compIndex}.title.content`, comp.title?.content as string)
    setValue(`levels.${levelIndex}.comps.${compIndex}.description.content`, comp.description?.content as string)
    setValue(`levels.${levelIndex}.comps.${compIndex}.title.size`, comp.title?.size as string)
    setValue(`levels.${levelIndex}.comps.${compIndex}.description.size`, comp.description?.size as string)
    }

  }, [comp, formState, compIndex, levelIndex, setValue])


  return (
    <>
      <div className="flex gap-2 mt-2">
        <div className="flex flex-col">
          <label htmlFor={`title-content-${levelIndex}-${compIndex}`}>Título</label>
          <input
            type="text"
            id={`title-content-${levelIndex}-${compIndex}`}
            {...register(`levels.${levelIndex}.comps.${compIndex}.title.content`)}
            className="border rounded w-full"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor={`title-size-${levelIndex}-${compIndex}`}>Tamanho do Título</label>
          <input
            type="number"
            id={`title-size-${levelIndex}-${compIndex}`}
            {...register(`levels.${levelIndex}.comps.${compIndex}.title.size`, { valueAsNumber: true })}
            className="border rounded w-30"
          />
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <div className="flex flex-col">
          <label htmlFor={`description-content-${levelIndex}-${compIndex}`}>Descrição</label>
          <input
            type="text"
            id={`description-content-${levelIndex}-${compIndex}`}
            {...register(`levels.${levelIndex}.comps.${compIndex}.description.content`)}
            className="border rounded w-full"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor={`description-size-${levelIndex}-${compIndex}`}>Tamanho da Descrição</label>
          <input
            type="number"
            id={`description-size-${levelIndex}-${compIndex}`}
            {...register(`levels.${levelIndex}.comps.${compIndex}.description.size`, { valueAsNumber: true })}
            className="border rounded w-30"
          />
        </div>
      </div>
    </>
  );
}
