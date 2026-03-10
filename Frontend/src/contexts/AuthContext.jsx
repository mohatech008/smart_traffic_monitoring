import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  {/*1. Check if user is logged in when the app loads*/}
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error("Failed to parse user data", error);
      }
    }
    setLoading(false);
  }, []);
  const login = async (formData) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);
      return data;
    } catch (err) {
      throw err;
    }
  };

  {/*3. REGISTER Function*/}
  const register = async (formData) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      return data;
    } catch (err) {
      throw err;
    }
  };

  {/*4. LOGOUT Function*/}
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null)
    window.location.href = "/login"; 
  };
  {/*5. UPDATE PROFILE Function*/}
  const updateProfile = async (userData) => {
    try {
      const payload = { ...userData, id: user.id };

      const response = await fetch("http://localhost:5000/api/auth/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Update failed");
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register,updateProfile, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};