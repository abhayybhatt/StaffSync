import React, { useState } from "react";
import { LogIn, Mail, Lock, User } from "lucide-react";
import { login } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

const Login = ({ onToggleMode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login: setAuth, loginAsGuest } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await login(email, password);
      setAuth(response.user, response.token);
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    loginAsGuest();
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="bg-gray-900 rounded-lg shadow-2xl max-w-md w-full p-8 border border-gray-800">
        <div className="flex items-center justify-center mb-8">
          <div className="p-3 bg-green-500 rounded-lg">
            <LogIn size={32} className="text-gray-900" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-400 text-center mb-8">
          Sign in to your account to continue
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 font-medium mb-2">
              Email
            </label>
            <div className="relative">
              <Mail
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <Lock
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-gray-900 px-4 py-2.5 rounded-lg hover:bg-green-400 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900 text-gray-400">
                Or
              </span>
            </div>
          </div>

          <button
            onClick={handleGuestLogin}
            className="mt-6 w-full flex items-center justify-center gap-2 bg-gray-800 border border-gray-700 text-gray-300 px-4 py-2.5 rounded-lg hover:bg-gray-700 transition-colors"
          >
            <User size={20} />
            Continue as Guest
          </button>
        </div>

        <p className="mt-6 text-center text-gray-400">
          Don't have an account?{" "}
          <button
            onClick={onToggleMode}
            className="text-green-500 hover:text-green-400 font-medium"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
