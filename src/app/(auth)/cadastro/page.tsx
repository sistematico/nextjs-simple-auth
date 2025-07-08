// src/app/(auth)/cadastro/page.tsx
import { SignUpForm } from "@/components/auth/signup";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { checkDatabaseConnection } from "@/db/health";
import { redirect } from "next/navigation";

export default async function SignUp() {
  const isDatabaseAvailable = await checkDatabaseConnection();
  if (!isDatabaseAvailable) {
    redirect("/?db=offline");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Cadastro</CardTitle>
          </CardHeader>
          <CardContent>
            <SignUpForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}