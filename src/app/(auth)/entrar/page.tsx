import SignupForm from "@/components/auth/SignupForm";

export default function CadastroPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>
        <SignupForm />
      </div>
    </div>
  );
}
