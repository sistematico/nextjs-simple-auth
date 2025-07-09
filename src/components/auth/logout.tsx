"use client";

// import Link from "next/link";
import { logOut } from "@/app/actions";

export function LogOutButton() {
  return (
    <button onClick={async () => await logOut()}>
      Sair
    </button>
    // <Button variant="danger" onClick={async () => await logOut()}>
    //   Sair
    // </Button>
  );
}
