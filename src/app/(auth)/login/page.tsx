import { getSession } from "@/lib/session";
import LoginForm from "@/components/LoginForm";

export default async function Page() {
  const session = await getSession();
  return (
    <section>
      <LoginForm />
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </section>
  );
}
