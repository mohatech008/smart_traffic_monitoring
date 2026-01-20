import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock } from "react-icons/fi";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const validate = () => {
    let newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email.";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await login(formData);
      setSuccess("Login successful!");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setErrors({ submit: "Invalid credentials. Try again." });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md animate-fadeIn"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-primary">
          Login to Your Account
        </h2>

        {/* Global submission error */}
        {errors.submit && (
          <p className="text-red-600 text-sm mb-3 text-center">{errors.submit}</p>
        )}

        {/* Success message */}
        {success && (
          <p className="text-green-600 text-sm mb-3 text-center">{success}</p>
        )}

        {/* Email Field */}
        <div className="relative mb-5">
          <FiMail className="absolute left-3 top-10 text-gray-500" size={20} />
          <label className="block text-gray-700 font-medium mb-1">
            Enter your Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className={`pl-10 w-full p-2 border rounded focus:outline-primary ${
              errors.email ? "border-red-500" : ""
            }`}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="relative mb-5">
          <FiLock className="absolute left-3 top-10 text-gray-500" size={20} />
          <label className="block text-gray-700 font-medium mb-1">
            Enter Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className={`pl-10 w-full p-2 border rounded focus:outline-primary ${
              errors.password ? "border-red-500" : ""
            }`}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white p-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-primary font-semibold hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
