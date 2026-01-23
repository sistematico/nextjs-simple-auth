"use client";

import Link from "next/link";
import { logOut } from "@/actions";
import { useAuth } from "./AuthProvider";

export default function Navbar() {
  const { user } = useAuth();

  async function handleLogout() {
    await logOut();
  }

  return (
    <nav className="flex items-center justify-between gap-4">
      <Link
        href="/"
        className="font-semibold text-lg hover:text-blue-600 transition"
      >
        Home
      </Link>

      {!user ? (
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition font-medium"
          >
            Entrar
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 rounded-md border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition font-medium"
          >
            Criar conta
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-medium">
            {user.name || user.email || "Usuário"}
          </span>
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-md border-2 border-gray-600 text-gray-700 hover:bg-gray-100 transition font-medium"
          >
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition font-medium"
          >
            Sair
          </button>
        </div>
      )}
    </nav>
  );
}
