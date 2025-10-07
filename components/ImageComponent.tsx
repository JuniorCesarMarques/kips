import { Comp } from "@/types";

type ImageComponentProps = {
  comp: Comp;
};

export default function ImageComponent({ comp }: ImageComponentProps) {
  return (
    <div className="flex flex-col items-end">
      <iframe
        height={comp.height}
        width={comp.width}
        src={comp.url}
        title="chart"
      ></iframe>
    </div>
  );
}
