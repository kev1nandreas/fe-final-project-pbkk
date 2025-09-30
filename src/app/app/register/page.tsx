"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { RegisterProps } from "@/types/request";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

export default function RegisterPage() {
  const methods = useForm<RegisterProps>();

  const onSubmit: SubmitHandler<RegisterProps> = (data) => {
    console.log(data);
  };

  return (
    <div className="w-screen h-[calc(100vh-5rem)] flex justify-center items-center relative bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Enhanced Glass Backdrop */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-xl supports-[backdrop-filter]:bg-white/20"></div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-400/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 flex flex-col rounded-2xl items-center bg-white/10 backdrop-blur-2xl supports-[backdrop-filter]:bg-white/5 shadow-2xl border border-white/30 gap-3 p-8 py-12 max-w-md w-full mx-4 before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/20 before:to-transparent before:pointer-events-none">
        {/* Logo */}
        <div className="relative z-10 flex items-center space-x-2 group px-4 mb-4">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-lg backdrop-blur-sm">
            <span className="text-white font-bold text-lg">CC</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-200">
            Citation Checker
          </h1>
        </div>

        {/* Welcome Message for Registration */}
        <div className="relative z-10 flex flex-col items-center mb-6 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-2">
            Create Account
          </h2>
          <p className="text-gray-600/80">
            Join us today and start checking your citations.
          </p>
        </div>

        {/* Registration Form */}
        <div className="relative z-10 w-full">
          <FormProvider {...methods}>
            <form
              action=""
              onSubmit={methods.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <div className="space-y-4">
                <Input
                  id={"fullName"}
                  label={"Full Name"}
                  className="w-full bg-white/20 backdrop-blur-sm border-black/30 rounded-xl"
                  placeholder="Enter your full name"
                  validation={{ required: "Full name is required" }}
                />
                <Input
                  id={"email"}
                  label={"Email"}
                  type={"email"}
                  className="w-full bg-white/20 backdrop-blur-sm border-black/30 rounded-xl"
                  placeholder="Enter your email address"
                  validation={{ required: "Email is required" }}
                />
                <Input
                  id={"password"}
                  label={"Password"}
                  type={"password"}
                  className="w-full bg-white/20 backdrop-blur-sm border-black/30 rounded-xl"
                  placeholder="Create a password"
                  validation={{ required: "Password is required" }}
                />
                <Input
                  id={"confirmPassword"}
                  label={"Confirm Password"}
                  type={"password"}
                  className="w-full bg-white/20 backdrop-blur-sm border-black/30 rounded-xl"
                  placeholder="Confirm your password"
                  validation={{
                    required: "Please confirm your password",
                    validate: (value: string) => {
                      if (value !== methods.getValues("password")) {
                        return "Passwords do not match";
                      }
                      return true;
                    },
                  }}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600/80 to-purple-600/80 backdrop-blur-sm hover:from-blue-700/90 hover:to-purple-700/90 text-white font-semibold py-3 px-4 rounded-xl shadow-lg border border-white/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              >
                Create Account
              </Button>
            </form>
          </FormProvider>

          <div className="text-center mt-6">
            <p className="text-gray-600/80">
              Already have an account?{" "}
              <a
                href="/app/login"
                className="text-blue-600 hover:text-blue-700 hover:underline font-medium transition-colors duration-200"
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
