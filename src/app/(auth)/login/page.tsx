import { getSession } from "@/lib/session";
import LoginForm from "@/components/LoginForm";

export default async function Page() {
  const session = await getSession();
  
  return (
    <section className="max-w-md mx-auto">
      <LoginForm />
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </section>
  );
}
