import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock } from "react-icons/fi";

const Signup = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); 

  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    }

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
    
    setLoading(true);
    setErrors({});    

    try {
      // call register from AuthContext
      await register(formData);
      
      setSuccess("Account created successfully! Redirecting...");
      setFormData({ name: "", email: "", password: "" }); 
      
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      // Capture the specific error message from the backend (e.g., "User already exists")
      setErrors({ submit: err.message || "Registration failed. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md animate-fadeIn"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-primary">
          Create an Account
        </h2>

        {/* Global submission error */}
        {errors.submit && (
          <p className="text-red-600 text-sm mb-3 text-center bg-red-100 p-2 rounded">
            {errors.submit}
          </p>
        )}

        {/* Success message */}
        {success && (
          <p className="text-green-600 text-sm mb-3 text-center bg-green-100 p-2 rounded">
            {success}
          </p>
        )}

        {/* Full Name Field */}
        <div className="relative mb-5">
          <FiUser className="absolute left-3 top-10 text-gray-500" size={20} />
          <label className="block text-gray-700 font-medium mb-1">
            Enter your Full Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className={`pl-10 w-full p-2 border rounded focus:outline-primary ${
              errors.name ? "border-red-500" : ""
            }`}
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

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
          disabled={loading}
          className={`w-full text-white p-2 rounded-lg transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:bg-blue-700"
          }`}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-primary font-semibold hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;