import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail, FiArrowLeft, FiAlertCircle } from "react-icons/fi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setIsSuccess(true);
        setMessage("Check your email for the reset link.");
      } else {
        setIsSuccess(false);
        setMessage(data.message || data.error || "An error occurred");
      }
      
    } catch (error) {
      console.error("Forgot Password Error:", error);
      setIsSuccess(false);
      setMessage("Failed to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans">
      
      {/* --- LEFT SIDE: Image Section (Matches Login Page) --- */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="Images/traffic-login.png" // Reusing your login image
          alt="FlowSense Traffic Monitoring"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/90 to-[#003366]/40" />
        
        <div className="absolute bottom-16 left-16 text-white z-10">
          <div className="flex items-center gap-3 mb-6">
             <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#003366] font-bold text-2xl shadow-lg">F</div>
             <span className="text-3xl font-bold tracking-wide">FlowSense</span>
          </div>
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight leading-tight">Secure Account <br/>Recovery.</h1>
          <p className="text-lg opacity-80 max-w-md leading-relaxed">
            Regain access to your dashboard and continue monitoring city traffic in real-time.
          </p>
        </div>
      </div>

      {/* --- RIGHT SIDE: Form Section --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-20 bg-gray-50">
        <div className="w-full max-w-md space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-xl border-2 border-blue-300">
          
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Forgot Password?</h2>
            <p className="text-gray-500 mt-3 text-sm leading-relaxed">
              No worries, we'll send you reset instructions. Please enter the email associated with your account.
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
            <div>
              <label className="block text-xs font-black text-gray-500 uppercase tracking-[0.15em] mb-2 px-1">
                Email Address
              </label>
              <div className="relative group">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-[#003366]" size={20} />
                <input
                  type="email"
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl outline-none focus:border-[#003366] focus:ring-4 focus:ring-blue-50 transition-all text-gray-800"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || isSuccess}
              className="w-full bg-[#003366] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#002244] hover:shadow-xl hover:shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Sending link..." : isSuccess ? "Email Sent!" : "Send Reset Link"}
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

export default ForgotPassword;