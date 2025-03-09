import React, { useCallback, useEffect, useState, useMemo } from "react";
import { useLogin } from "../../api/hooks/auth/use-login";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CustomInput from "../../components/custom-input";
import LeftSideView from "./components/left-side-view";

const ERROR_MESSAGES = {
  REQUIRED: "Email and password are required.",
  PASSWORD_LENGTH: "Password must be at least 6 characters long.",
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const { loginUser, error: apiError, loading } = useLogin();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string>();

  const errorMessage = useMemo(() => error ?? apiError, [error, apiError]);

  const validateInputs = useCallback(() => {
    if (!formData.email || !formData.password) return ERROR_MESSAGES.REQUIRED;
    if (formData.password.length < 6) return ERROR_MESSAGES.PASSWORD_LENGTH;
    return null;
  }, [formData.email, formData.password]);

  const handleLogin = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const validationError = validateInputs();
      if (validationError) {
        setError(validationError);
        return;
      }

      const userData = await loginUser({ userLoginCredentials: formData });

      if (userData) {
        localStorage.setItem("token", userData?.token ?? "");
        login({
          name: userData.name,
          email: userData.email,
          role: userData.role,
        });
        navigate("/dashboard");
      }
    },
    [formData, login, loginUser, navigate, validateInputs]
  );

  const handleChange = useCallback(
    (field: keyof typeof formData, value: string) => {
      setError(undefined);
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background font-noto">
      <div className="hidden lg:flex items-center justify-center flex-grow h-full w-full lg:w-1/2">
        <LeftSideView />
      </div>

      <div className="flex lg:bg-primary h-full lg:h-[95vh] mx-5 rounded-2xl flex-grow items-center justify-center w-full lg:w-1/2 drop-shadow-2xl hover:drop-shadow-3xl">
        <div className="flex flex-col gap-6 lg:gap-4 w-80 sm:w-96 bg-white/20 lg:border lg:border-gray-500 shadow-[12px_17px_51px_rgba(0,0,0,0.22)] hover:shadow-[16px_20px_40px_rgba(0,0,0,0.32)] rounded-2xl text-center p-6 transition-all cursor-pointer hover:border-white hover:border-2 hover:scale-105 active:scale-95 active:rotate-1">
          <h2 className="text-4xl font-noto font-bold text-black lg:text-white mb-4">
            Login
          </h2>

          <form onSubmit={handleLogin} className="w-full flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <CustomInput
                type="text"
                placeholder="Email"
                value={formData.email}
                onChange={(val) => handleChange("email", val)}
                required
                className="!text-black"
              />
              <CustomInput
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(val) => handleChange("password", val)}
                required
                className="!text-black"
              />
            </div>

            <button
              type="submit"
              className="w-full p-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-600 transition-transform transform hover:scale-105 active:scale-95 disabled:opacity-50 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            {errorMessage && (
              <p className="text-red-400 text-center mt-3 text-sm">
                {errorMessage}
              </p>
            )}
          </form>

          <p className="text-gray-700 text-sm mt-4 cursor-pointer hover:text-gray-100 transition">
            Forgot password?
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
