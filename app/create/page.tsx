"use client"

import { useEdit } from "@/app/context/EditContext";
import Controls from "@/components/Controls";
import { useEffect } from "react";
import PagesList from "@/components/PagesList";
import MainScreen from "@/components/MainScreen";

export default function CreatePage() {

  const { setEdit } = useEdit();

  useEffect(() => {
    setEdit(true)
  }, [])


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
        <Controls />
        <div className="flex w-full">
          <PagesList />
          <MainScreen />
        </div>
    </div>
  );
}
