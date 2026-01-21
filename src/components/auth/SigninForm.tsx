"use client";

import { signup } from "@/actions/auth";
import { useActionState } from "react";

export default function SigninForm() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input id="email" name="email" placeholder="Email" className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {state?.errors?.email && <p className="mt-1 text-sm text-red-600">{state.errors.email}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input id="password" name="password" type="password" className="mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        {state?.errors?.password && (
          <div className="mt-1 text-sm text-red-600">
            <p>Password must:</p>
            <ul className="list-disc ml-5">
              {state.errors.password.map((error: string) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button disabled={pending} type="submit" className="w-full bg-blue-600 disabled:opacity-50 text-white py-2 rounded">
        {pending ? "Submitting..." : "Sign Up"}
      </button>
    </form>
  );
}
