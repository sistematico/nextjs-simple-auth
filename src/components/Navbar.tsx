"use client";

import Link from "next/link";
import { useAuth } from "./AuthProvider";

export default function Navbar() {
  const { session, logout } = useAuth();

  return (
    <nav style={{ padding: 8 }}>
      <Link href="/">Home</Link>
      {" | "}
      {!session?.user ? (
        <>
          <Link href="/login">Login</Link>
          {" | "}
          <Link href="/register">Register</Link>
        </>
      ) : (
        <>
          <span style={{ marginLeft: 8, marginRight: 8 }}>
            {session.user?.email ?? session.user?.name ?? "User"}
          </span>
          <button onClick={() => logout()}>Sair</button>
        </>
      )}
    </nav>
  );
}
