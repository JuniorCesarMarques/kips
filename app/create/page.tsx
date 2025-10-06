"use client"

import { usePage } from "@/app/context/PagesContext";
import Controls from "@/components/Controls";
import { Page } from "@/types";

export default function AddScreen() {

  const { pages, setPages } = usePage();


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
        <Controls />
    </div>
  );
}
