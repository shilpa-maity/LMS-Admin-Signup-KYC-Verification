import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

export default function Signup() {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log("Signup data:", data);
    router.push("/auth/signin");
  };

  function handleGoogle() {
    console.log("Google signup simulated");
    router.push("/auth/signin");
  }

  function handleApple() {
    console.log("Apple signup simulated");
    router.push("/auth/signin");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              {...register("name", { required: true })}
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              {...register("terms", { required: true })}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label className="ml-2 block text-sm text-gray-600">
              I agree to the{" "}
              <a href="#" className="text-indigo-600">terms & policy</a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded-md font-semibold hover:bg-green-800"
          >
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500 text-sm">Or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social buttons */}
        <div className="space-y-3">
          <button
            onClick={handleGoogle}
            className="w-full flex items-center justify-center gap-2 border py-2 rounded-md hover:bg-gray-50"
          >
            <FcGoogle size={20} /> Sign up with Google
          </button>

          <button
            onClick={handleApple}
            className="w-full flex items-center justify-center gap-2 border py-2 rounded-md hover:bg-gray-50"
          >
            <FaApple size={20} /> Sign up with Apple
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-gray-600">
          Have an account?{" "}
          <a href="/auth/signin" className="text-indigo-600 font-medium">
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
}
