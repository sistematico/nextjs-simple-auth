import { getCurrentUser } from "@/auth/user";
import { Header } from "@/components/header";

export async function HeaderWrapper() {
  const user = await getCurrentUser({ withFullUser: true });
  
  return <Header user={user} />;
}