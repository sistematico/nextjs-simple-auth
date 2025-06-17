"use client";

import { Button } from "@/components/ui/button";
import { logOut } from "@/app/actions";

export function LogOutButton() {
  return (
    <Button variant="destructive" onClick={async () => await logOut()}>
      Sair
    </Button>
  );
}
