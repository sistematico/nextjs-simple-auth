import SignupForm from "@/components/auth/SignupForm";

export default function EntrarPage() {
  return (
    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center">Sign in to your account</h2>
        <SignupForm />
      </div>
    </div>
  );
}
