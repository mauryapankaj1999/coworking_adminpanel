import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { showError } from "../utils/toast";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showpass, setShowpass] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const res = await loginUser(data);

      if (res.success) {
        localStorage.setItem("token", res.token);

        localStorage.setItem("user", JSON.stringify(res.data));

        localStorage.setItem("role", res.data.role);

        if (res.data.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/user-dashboard");
        }
      } else {
        showError("Login Failed");
      }
    } catch (error) {
      console.log(error);
      showError(error?.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div
      className="min-h-screen flex bg-cover bg-center"
      style={{
        backgroundImage: `url('/worktoshareimgbgimg.jpeg')`,
      }}
    >
      {/* Right Side */}
      <div className="flex flex-1 items-center justify-center px-6 min-h-screen bg-black/10 ">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl border border-gray-100">
          <div className="text-center">
            <h2 className="text-4xl text-[#0058BE] font-bold">
              Coworking Space{" "}
            </h2>

            <p className="mt-2 text-gray-500">Login to access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>

              <input
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email",
                  },
                })}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
              />

              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>

              <div className="relative flex items-center">
                <input
                  type={showpass ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="w-full pr-10 rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                />
                <div
                  className="absolute right-3 cursor-pointer"
                  onClick={() => setShowpass(!showpass)}
                >
                  {showpass ? <FaEye /> : <FaEyeSlash />}
                </div>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full rounded-xl py-3 font-semibold text-white transition flex items-center justify-center gap-2 ${
                loading
                  ? "bg-[#0058BE] cursor-not-allowed"
                  : "bg-[#0058BE] hover:bg-[#0d7cfb]"
              }`}
            >
              {loading && (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              )}

              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            © 2026 Coworking Admin Panel
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
