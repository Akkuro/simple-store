"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import LogoutButton from "@/components/LogoutButton";

interface LoginFormData {
  username: string;
  password: string;
}

const LoginPage: React.FC<undefined> = () => {
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await login(formData.username, formData.password);
      router.replace("/");
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-20 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          {isAuthenticated ? "Welcome Back!" : "Login"}
        </h1>

        {isAuthenticated ? (
          <div className="text-center">
            <p className="text-gray-700 mb-4">You are already logged in.</p>
            <LogoutButton />
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                disabled={isLoading}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                isLoading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
