"use client";

import { useEdit } from "@/app/context/EditContext";

import Menu from "./Menu";

export default function Navbar() {
  const { edit } = useEdit();

  return (
    <nav className="flex gap-2 fixed top-0 ml-2">
      {!edit && <Menu />}
    </nav>
  );
}
