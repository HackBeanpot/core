"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import React from "react";
export default function Home() {
  // State Variables
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [formType, setFormType] = useState("signIn");
  /**
   * * Handle Sign In
   * @dev handler for more control over the sign in user experience
   * @param e formEvent
   */
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await signIn("email", { email, callbackUrl: "/admin/dashboard" });
    setLoading(false);
  };
  return (
    <main className="bg-slate-300 relative flex min-h-screen flex-col items-center justify-center p-24">
      <div className="bg-white py-8 px-20 shadow-black shadow-sm rounded-sm">
        {/* Logo */}
        <div className="mb-8 text-center">YOUR_LOGO</div>
        {/* Form */}
        <div className="w-full max-w-sm">
          <h1 className="font-bold text-3xl mb-6 text-center">
            {formType === "signIn" ? "Sign In" : "Create Your Account"}
          </h1>
          <form onSubmit={handleSignIn}>
            <div className="relative">
              <label
                htmlFor="email"
                className="absolute -top-2 left-2 text-xs bg-white px-1 font-medium"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                placeholder="email@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full border border-neutral-400 placeholder:text-neutral-400 py-2.5 px-5 rounded-sm"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="block w-full py-2.5 px-5 mt-4 bg-cyan-600 text-white text-center rounded-sm"
            >
              {loading ? "Please Wait..." : "Continue"}
            </button>
          </form>
          <p className="text-center text-sm mt-4">
            {formType === "signIn"
              ? "Don't have an account?"
              : "Already have an account?"}
            <button
              className="inline-block text-cyan-600 ml-2"
              onClick={() =>
                setFormType(formType === "signIn" ? "signUp" : "signIn")
              }
            >
              {formType === "signIn" ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
        {/* Bottom Links */}
        <div className="text-center text-sm mt-12">
          <a href="#" className="transition duration-300 text-cyan-600 mx-2">
            Terms of Use
          </a>{" "}
          |{" "}
          <a href="#" className="transition duration-300 text-cyan-600 mx-2">
            Privacy Policy
          </a>
        </div>
      </div>
    </main>
  );
}
