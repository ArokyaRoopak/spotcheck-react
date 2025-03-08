import React, { useCallback, useEffect, useState } from "react";
import { useLogin } from "../../api/hooks/auth/use-login";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>();
  const { loginUser, error: apiError, loading } = useLogin();

  const { isAuthenticated } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    const userLoginCredentials = { email, password };
    const userData = await loginUser({ userLoginCredentials });

    if (userData) {
      localStorage.setItem("token", userData?.token ?? "");
      login({
        name: userData.name,
        email: userData.email,
        role: userData.role,
      });
      navigate("/dashboard");
    }
  };

  const handleEmailChange = useCallback(
    (val: string) => {
      if (error) setError(undefined);
      setEmail(val);
    },
    [error]
  );

  const handlePasswordChange = useCallback(
    (val: string) => {
      if (error) setError(undefined);
      setPassword(val);
    },
    [error]
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }

    return () => {};
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background font-nono">
      <div className="relative w-80 sm:w-96 bg-white/90 backdrop-blur-lg border-2 border-white rounded-xl  p-6 text-center animate-fade-in transition-all shadow-[5px_5px_0_0_#00000040] hover:shadow-[2px_2px_0_0_#00000040] ">
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-purple-500 rounded-full blur-2xl opacity-40"></div>
        <h2 className="text-3xl font-bold text-black mb-4">Sign In</h2>
        <form onSubmit={handleLogin} className="w-full">
          <div className="relative w-full mb-4">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              required
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="relative w-full mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              required
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-600 transition-transform transform hover:scale-105 active:scale-95 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {(error ?? apiError) && (
            <p className="text-red-400 text-center mt-3 text-sm">
              {error ?? apiError}
            </p>
          )}
        </form>

        <p className="text-gray-400 text-sm mt-4 cursor-pointer hover:text-gray-300 transition">
          Forgot password?
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
