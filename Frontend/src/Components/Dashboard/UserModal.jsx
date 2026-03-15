import React, { useState } from "react";
import { FaUsers, FaTimes, FaPlus, FaArrowLeft, FaTrash, FaUserShield, FaUserTie } from "react-icons/fa";
import { useToast } from "../../Contexts/ToastContext.jsx";

const UserModal = ({ isOpen, onClose, usersList, fetchUsers, handleDeleteUser }) => {
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "officer" });
  const { addToast } = useToast();
  if (!isOpen) return null;

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        }, 
        body: JSON.stringify(newUser),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to create user");

     addToast("Officer account created successfully!", "success");
      setNewUser({ name: "", email: "", password: "", role: "officer" });
      fetchUsers();
      setIsAddingUser(false);
    } catch (error) { 
      addToast(error.message || "Failed to create officer account", "error");

    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900/60 z-[9999] flex items-center justify-center p-4 backdrop-blur-md transition-opacity">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-white/20">
        
        {/* Header - More defined and professional */}
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600">
              <FaUsers size={18} />
            </div>
            <div>
              <h2 className="text-lg font-bold dark:text-white leading-tight">
                {isAddingUser ? "Create New Account" : "User Management"}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {isAddingUser ? "Fill in the details to add an officer" : "Manage system access and roles"}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <FaTimes size={18}/>
          </button>
        </div>

        <div className="p-6">
          {isAddingUser ? (
            /* --- REFINED FORM VIEW --- */
            <form onSubmit={handleCreateUser} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Full Name</label>
                  <input type="text" placeholder="John Doe" value={newUser.name} onChange={(e) => setNewUser({...newUser, name: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" required />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Email Address</label>
                  <input type="email" placeholder="john@flowsense.com" value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Role Selection</label>
                  <select value={newUser.role} onChange={(e) => setNewUser({...newUser, role: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all appearance-none cursor-pointer">
                    <option value="officer">Traffic Controller</option>
                    <option value="admin">System Admin</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Password</label>
                  <input type="password" placeholder="••••••••" value={newUser.password} onChange={(e) => setNewUser({...newUser, password: e.target.value})} className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all" required />
                </div>
              </div>
              
              <div className="flex gap-3 pt-4 border-t dark:border-gray-700">
                <button type="button" onClick={() => setIsAddingUser(false)} className="px-6 py-2.5 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center gap-2 uppercase text-xs tracking-widest"><FaArrowLeft /> Cancel</button>
                <button type="submit" className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg font-bold hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-widest">Create Account</button>
              </div>
            </form>
          ) : (
            /*LIST VIEW */
            <>
              <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Active users in the system</p>
                <button onClick={() => setIsAddingUser(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-md shadow-blue-500/20">
                  <FaPlus /> Add New User
                </button>
              </div> 
              
              <div className="overflow-hidden border border-gray-100 dark:border-gray-700 rounded-xl">
                <div className="overflow-y-auto max-h-[400px]">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                      <tr>
                        <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">User Info</th>
                        <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Role</th>
                        <th className="p-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                      {Array.isArray(usersList) && usersList.length > 0 ? (
                        usersList.map((u) => (
                          <tr key={u._id} className="hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors">
                            <td className="p-4">
                              <div className="flex flex-col">
                                <span className="font-semibold text-gray-800 dark:text-gray-100 text-sm">{u.name}</span>
                                <span className="text-xs text-gray-400">{u.email}</span>
                              </div>
                            </td>
                            <td className="p-4">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                                u.role === 'admin' 
                                ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' 
                                : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                              }`}>
                                {u.role === 'admin' ? <FaUserShield /> : <FaUserTie />}
                                {u.role}
                              </span>
                            </td>
                            <td className="p-4 text-center">
                              {u.role !== 'admin' ? (
                                <button onClick={() => handleDeleteUser(u._id)} className="text-gray-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all" title="Delete User">
                                  <FaTrash size={14} />
                                </button>
                              ) : (
                                <span className="text-[10px] text-gray-300 dark:text-gray-600 font-medium">Protected</span>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="3" className="p-10 text-center text-gray-400 text-sm italic">
                            No active users found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserModal;