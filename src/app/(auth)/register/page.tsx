import { getSession } from "@/lib/session";
import RegisterForm from "@/components/RegisterForm";

export default async function Page() {
  const session = await getSession();
  return (
    <section>
      <RegisterForm />
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </section>
  );
}
