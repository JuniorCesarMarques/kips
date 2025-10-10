import { Comp } from "@/types";

type ImageComponentProps = {
  comp: Comp;
};

export default function ImageComponent({ comp }: ImageComponentProps) {
  return (
    <div className="flex flex-col items-end">
      <iframe
      onClick={() => console.log("clicou")}
        height={comp.height as number}
        width={comp.width as number}
        src={comp.url}
        title="chart"
      ></iframe>
    </div>
  );
}
