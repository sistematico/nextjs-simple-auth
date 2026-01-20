import SignupForm from "@/components/auth/SignupForm";

export default function CadastroPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md p-8 space-y-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>
        <SignupForm />
      </div>
    </div>
  );
}
