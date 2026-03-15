import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FiLock, FiAlertCircle, FiArrowLeft, FiEye, FiEyeOff } from "react-icons/fi";

const ResetPassword = () => {
  const { token } = useParams(); 
  const navigate = useNavigate();
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Toggle states for passwords
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setIsSuccess(false);
      return setMessage("Password must be at least 6 characters.");
    }
    if (password !== confirmPassword) {
      setIsSuccess(false);
      return setMessage("Passwords do not match.");
    }

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (res.ok) {
        setIsSuccess(true);
        setMessage("Password reset successfully! Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setIsSuccess(false);
        setMessage(data.message || "An error occurred.");
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage("Error connecting to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">
      
      {/* --- LEFT SIDE: Image Section --- */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="/Images/traffic-login.png" 
          alt="FlowSense Traffic Monitoring"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/90 to-[#003366]/40" />
        
        <div className="absolute bottom-16 left-16 text-white z-10">
          <div className="flex items-center gap-3 mb-6">
             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#003366] font-bold text-2xl shadow-lg">F</div>
             <span className="text-3xl font-bold tracking-wide">FlowSense</span>
          </div>
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight leading-tight">Create New <br/>Password.</h1>
          <p className="text-lg opacity-80 max-w-md leading-relaxed">
            Please choose a strong and secure password to protect your traffic control dashboard.
          </p>
        </div>
      </div>

      {/* --- RIGHT SIDE: Form Section --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-20 bg-gray-50">
        <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-gray-100">
          
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Set New Password</h2>
            <p className="text-gray-500 mt-3 text-sm leading-relaxed">
              Your new password must be different from previously used passwords.
            </p>
          </div>

          {/* Alert Message Box */}
          {message && (
            <div className={`flex items-start gap-3 p-4 rounded-2xl border ${isSuccess ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700 animate-shake'}`}>
              <FiAlertCircle className="flex-shrink-0 mt-0.5" size={18} />
              <p className="text-sm font-semibold">{message}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* New Password Field */}
            <div>
              <label className="block text-xs font-black text-gray-500 uppercase tracking-[0.15em] mb-2 px-1">
                New Password
              </label>
              <div className="relative group">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-[#003366]" size={20} />
                <input
                  type={showPassword1 ? "text" : "password"}
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-[#003366] focus:ring-4 focus:ring-blue-50 transition-all text-gray-800"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword1(!showPassword1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword1 ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-xs font-black text-gray-500 uppercase tracking-[0.15em] mb-2 px-1">
                Confirm Password
              </label>
              <div className="relative group">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-[#003366]" size={20} />
                <input
                  type={showPassword2 ? "text" : "password"}
                  className="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-[#003366] focus:ring-4 focus:ring-blue-50 transition-all text-gray-800"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword2(!showPassword2)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword2 ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || isSuccess}
              className="w-full bg-[#003366] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#002244] hover:shadow-xl hover:shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Resetting..." : isSuccess ? "Success!" : "Reset Password"}
            </button>
          </form>

          {/* Back to Login Link */}
          <div className="pt-4 text-center">
            <Link to="/login" className="inline-flex items-center justify-center gap-2 text-gray-500 font-bold hover:text-[#003366] transition-colors">
              <FiArrowLeft /> Back to log in
            </Link>
          </div>

        </div>
      </div>
      
    </div>
  );
};

export default ResetPassword;