// src/app/(auth)/entrar/page.tsx
import { SignInForm } from "@/components/auth/signin";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { checkDatabaseConnection } from "@/db/health";
import { redirect } from "next/navigation";

export default async function SignIn({
  searchParams,
}: {
  searchParams: Promise<{ oauthError?: string }>;
}) {
  const isDatabaseAvailable = await checkDatabaseConnection();
  if (!isDatabaseAvailable) {
    redirect("/?db=offline");
  }

  const { oauthError } = await searchParams;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Entrar</CardTitle>
            {oauthError && (
              <CardDescription className="text-destructive">
                {oauthError}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <SignInForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
