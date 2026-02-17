import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // API call to backend
            const response = await axios.post(
                'http://localhost:4000/api/auth/login',
                {
                    email: formData.email,
                    password: formData.password
                },
                {
                    withCredentials: true, // Important for cookies
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify(response.data.user));

            // Show success message (optional)
            console.log('Login successful:', response.data.user);

            // Redirect to dashboard or home page
            navigate('/dashboard'); // Change this to your desired route

        } catch (err) {
            // Handle error responses
            if (err.response) {
                // Server responded with error
                setError(err.response.data.error || 'Invalid email or password');
            } else if (err.request) {
                // Request made but no response
                setError('Cannot connect to server. Please make sure the backend is running.');
            } else {
                // Something else happened
                setError('An error occurred. Please try again.');
            }
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative">
            <div className="glass p-10 rounded-3xl w-full max-w-md relative z-10 border-midnightBlue/10 dark:border-white/10">
                <h2 className="text-3xl font-bold font-sora mb-8 text-center bg-gradient-to-r from-royalBlue-dark dark:from-royalBlue to-brightTeal-dark dark:to-brightTeal bg-clip-text text-transparent">
                    Welcome Back
                </h2>

                {/* Error Message Display */}
                {error && (
                    <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-bold text-slate-950 dark:text-slate-300 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-slate-50 dark:bg-white/5 border border-midnightBlue/10 dark:border-white/10 rounded-xl px-4 py-3 text-slate-950 dark:text-white focus:outline-none focus:border-brightTeal-dark dark:focus:border-brightTeal transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="you@example.com"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-950 dark:text-slate-300 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-slate-50 dark:bg-white/5 border border-midnightBlue/10 dark:border-white/10 rounded-xl px-4 py-3 text-slate-950 dark:text-white focus:outline-none focus:border-brightTeal-dark dark:focus:border-brightTeal transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="••••••••"
                            required
                            disabled={loading}
                        />
                    </div>

                    {/* Forgot Password Link */}
                    <div className="text-right">
                        <Link to="/forgot-password" title="Forgot Password" className="text-sm text-brightTeal-dark dark:text-brightTeal font-bold hover:underline">
                            Forgot Password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-gradient-to-r from-royalBlue-dark dark:from-royalBlue to-brightTeal-dark dark:to-brightTeal text-white font-bold py-3 rounded-xl hover:shadow-[0_0_20px_rgba(60,178,184,0.4)] transition-all transform hover:scale-[1.02] ${loading ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Signing in...
                            </span>
                        ) : 'Sign In'}
                    </button>
                </form>

                <p className="mt-6 text-center text-slate-950 dark:text-slate-400 text-sm font-medium">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-brightTeal-dark dark:text-brightTeal hover:underline font-bold">
                        Sign up
                    </Link>
                </p>
            </div>

            {/* Background Blur Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-royalBlue/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        </div>
    );
};

export default Login;
