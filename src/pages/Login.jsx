import React from 'react';
import PageHeader from '../components/PageHeader';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative">
            <div className="glass p-10 rounded-3xl w-full max-w-md relative z-10">
                <h2 className="text-3xl font-bold font-sora mb-8 text-center bg-gradient-to-r from-royalBlue to-brightTeal bg-clip-text text-transparent">Welcome Back</h2>
                <form className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                        <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brightTeal focus:ring-1 focus:ring-brightTeal transition-all" placeholder="you@example.com" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                        <input type="password" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brightTeal focus:ring-1 focus:ring-brightTeal transition-all" placeholder="••••••••" />
                    </div>
                    <button type="submit" className="w-full bg-gradient-to-r from-royalBlue to-brightTeal text-white font-bold py-3 rounded-xl hover:shadow-[0_0_20px_rgba(60,178,184,0.4)] transition-all transform hover:scale-[1.02]">
                        Sign In
                    </button>
                </form>
                <p className="mt-6 text-center text-slate-400 text-sm">
                    Don't have an account? <Link to="/signup" className="text-brightTeal hover:underline">Sign up</Link>
                </p>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-royalBlue/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        </div>
    );
};

export default Login;
