import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useState } from "react";

export default function Account() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Login functionality would be implemented here.");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Registration functionality would be implemented here.");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-16 px-4">
        <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          
          <div className="flex border-b border-gray-100">
            <button 
              className={`flex-1 py-4 font-bold text-sm tracking-wider uppercase transition-colors ${activeTab === "login" ? "text-primary border-b-2 border-primary" : "text-gray-500 hover:text-gray-800"}`}
              onClick={() => setActiveTab("login")}
            >
              Log In
            </button>
            <button 
              className={`flex-1 py-4 font-bold text-sm tracking-wider uppercase transition-colors ${activeTab === "register" ? "text-primary border-b-2 border-primary" : "text-gray-500 hover:text-gray-800"}`}
              onClick={() => setActiveTab("register")}
            >
              Register
            </button>
          </div>

          <div className="p-8">
            {activeTab === "login" ? (
              <form onSubmit={handleLogin} className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Email Address</label>
                  <input type="email" required className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-50" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-semibold text-gray-700">Password</label>
                    <button type="button" className="text-xs text-primary hover:underline">Forgot?</button>
                  </div>
                  <input type="password" required className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-50" />
                </div>
                <button type="submit" className="w-full bg-primary text-white font-bold py-3 rounded-md shadow-md hover:bg-primary/90 transition-colors mt-2">
                  Log In
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Full Name</label>
                  <input type="text" required className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-50" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Email Address</label>
                  <input type="email" required className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-50" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Password</label>
                  <input type="password" required className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-50" />
                </div>
                <button type="submit" className="w-full bg-gray-900 text-white font-bold py-3 rounded-md shadow-md hover:bg-gray-800 transition-colors mt-2">
                  Create Account
                </button>
              </form>
            )}
          </div>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}
