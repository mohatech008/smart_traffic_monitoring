import React, { useState, useContext } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiAlertCircle, FiEye, FiEyeOff } from "react-icons/fi";

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
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required.";
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
      await register(formData);
      setSuccess("Account created successfully! Redirecting...");
      setFormData({ name: "", email: "", password: "" }); 
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setErrors({ submit: err.message || "Registration failed. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">
      {/* LEFT SIDE: Futuristic Vision Image */}
<div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
  <img
    src="Images/traffic-signup.png" 
    alt="FlowSense Future City"
    className="absolute inset-0 w-full h-full object-cover"
  />
  {/* Darker overlay to make sure centered white text pops */}
  <div className="absolute inset-0 bg-black/40" /> 
  
  {/* Centered Text Container */}
  <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-12 text-center text-white">
    <h1 className="text-6xl font-extrabold mb-6 tracking-tight drop-shadow-lg">
      Join FlowSense
    </h1>
    <p className="text-xl opacity-90 max-w-md leading-relaxed drop-shadow-md">
      Start optimizing your urban infrastructure today. Get real-time 
      data and AI-powered insights at your fingertips.
    </p>
  </div>
</div>

      {/* RIGHT SIDE: Signup Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-20">
        <div className="w-full max-w-md space-y-8">
          
          <div className="text-center">
            <div className="flex justify-center mb-6">
               <img src="Images/Flowsense.png" alt="Logo" className="h-10 w-auto" />
            </div>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">Create Account</h2>
              <p className="text-gray-500 mt-3 text-lg">Join the smart traffic revolution</p>
            </div>

          {/* Error/Success Alerts */}
          {errors.submit && (
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 text-red-700 rounded-2xl">
              <FiAlertCircle className="flex-shrink-0" size={20} />
              <p className="text-sm font-semibold">{errors.submit}</p>
            </div>
          )}
          {success && (
            <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-2xl text-center font-semibold">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Field */}
            <div>
              <label className="block text-xs font-black text-gray-500 uppercase tracking-[0.15em] mb-2 px-1">
                Full Name
              </label>
              <div className="relative group">
                <FiUser className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.name ? 'text-red-400' : 'text-gray-400 group-focus-within:text-[#003366]'}`} />
                <input
                  type="text"
                  placeholder="Your name"
                  className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all ${
                    errors.name ? "border-red-200 focus:border-red-500" : "border-gray-100 focus:border-[#003366] focus:ring-4 focus:ring-blue-50"
                  }`}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              {errors.name && <p className="text-red-500 text-xs font-bold mt-2 ml-1">{errors.name}</p>}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-black text-gray-500 uppercase tracking-[0.15em] mb-2 px-1">
                Email Address
              </label>
              <div className="relative group">
                <FiMail className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.email ? 'text-red-400' : 'text-gray-400 group-focus-within:text-[#003366]'}`} />
                <input
                  type="email"
                  placeholder="name@company.com"
                  className={`w-full pl-12 pr-4 py-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all ${
                    errors.email ? "border-red-200 focus:border-red-500" : "border-gray-100 focus:border-[#003366] focus:ring-4 focus:ring-blue-50"
                  }`}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs font-bold mt-2 ml-1">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-black text-gray-500 uppercase tracking-[0.15em] mb-2 px-1">
                Password
              </label>
              <div className="relative group">
                <FiLock className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.password ? 'text-red-400' : 'text-gray-400 group-focus-within:text-[#003366]'}`} />
                <input
                  type={showPassword ? "text" : "password"}
                  className={`w-full pl-12 pr-12 py-4 bg-gray-50 border-2 rounded-2xl outline-none transition-all ${
                    errors.password ? "border-red-200 focus:border-red-500" : "border-gray-100 focus:border-[#003366] focus:ring-4 focus:ring-blue-50"
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
              disabled={loading}
              className="w-full bg-[#003366] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#002244] hover:shadow-2xl transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-gray-600 font-medium pt-4">
            Already have an account?{" "}
            <a href="/login" className="text-[#003366] font-bold hover:underline decoration-2 underline-offset-4">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;