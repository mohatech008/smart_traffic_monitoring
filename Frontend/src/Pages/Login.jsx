import React, { useState, useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom"; // Added Link here
import { FiMail, FiLock, FiAlertCircle, FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 

  const validate = () => {
    let newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email format.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    if (!validate()) return;

    setIsLoading(true);
    try {
      await login(formData);
      navigate("/dashboard");
    } catch (err) {
      setErrors({ submit: "Invalid email or password. Please try again." });
      setIsLoading(false); 
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* LEFT SIDE: Image Section */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="Images/traffic-login.png" 
          alt="FlowSense Traffic Monitoring"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/90 to-transparent" />
        <div className="absolute bottom-16 left-16 text-white z-10">
          <h1 className="text-6xl font-extrabold mb-4 tracking-tight">FlowSense</h1>
          <p className="text-xl opacity-90 max-w-md leading-relaxed">
            Smart Traffic Monitoring System. Real-time insights for a smoother, smarter urban flow.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: Login Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-20">
        <div className="w-full max-w-md space-y-8">
          
          <div className="text-center">
            <div className="flex justify-center mb-6">
               <img src="Images/Flowsense.png" alt="Logo" className="h-10 w-auto" />
            </div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">Welcome Back</h2>
            <p className="text-gray-500 mt-3 text-lg">Please enter your details</p>
          </div>

          {errors.submit && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl animate-shake">
              <FiAlertCircle className="flex-shrink-0" size={20} />
              <p className="text-sm font-semibold">{errors.submit}</p>
            </div>
          )}

          {success && (
            <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl text-center font-semibold">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-black text-gray-500 uppercase tracking-[0.15em] mb-2 px-1">
                Email Address
              </label>
              <div className="relative group">
                <FiMail className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.email ? 'text-red-400' : 'text-gray-400 group-focus-within:text-[#003366]'}`} />
                <input
                  type="email"
                  className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all ${
                    errors.email 
                      ? "border-red-200 focus:border-red-500 focus:ring-4 focus:ring-red-50" 
                      : "border-gray-100 focus:border-[#003366] focus:ring-4 focus:ring-blue-50"
                  }`}
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs font-bold mt-2 ml-1">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div> 
              {/* --- FORGOT PASSWORD LINK ADDED HERE --- */}
              <div className="flex justify-between items-center mb-2 px-1">
                <label className="block text-xs font-black text-gray-500 uppercase tracking-[0.15em]">
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs font-bold text-[#003366] hover:underline">
                  Forgot Password?
                </Link>
              </div>

              <div className="relative group">
                <FiLock className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.password ? 'text-red-400' : 'text-gray-400 group-focus-within:text-[#003366]'}`} />
                <input
                  type={showPassword ? "text" : "password"} 
                  className={`w-full pl-12 pr-12 py-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all ${
                    errors.password 
                      ? "border-red-200 focus:border-red-500 focus:ring-4 focus:ring-red-50" 
                      : "border-gray-100 focus:border-[#003366] focus:ring-4 focus:ring-blue-50"
                  }`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
              
              {errors.password && <p className="text-red-500 text-xs font-bold mt-2 ml-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#003366] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#002244] hover:shadow-2xl hover:shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Sign In
            </button>
          </form>

          <p className="text-center text-gray-600 font-medium">
            Don't have an account?{" "}
            <a href="/signup" className="text-[#003366] font-bold hover:underline decoration-2 underline-offset-4">
              Create an account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;