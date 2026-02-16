import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        // Check if all fields are filled
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('All fields are required');
            return false;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address');
            return false;
        }

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return false;
        }

        // Check password length
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            return false;
        }

        // Check for strong password (optional)
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (!passwordRegex.test(formData.password)) {
            setError('Password must contain at least one letter and one number');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validate form
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            // Remove confirmPassword before sending to backend
            const { confirmPassword, ...signupData } = formData;
            
            console.log('Sending signup data:', signupData); // For debugging

            const response = await axios.post(
                'http://localhost:4000/api/auth/signup',
                signupData,
                { 
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    timeout: 10000 // 10 second timeout
                }
            );

            console.log('Signup response:', response.data); // For debugging

            // Show success message
            setSuccess('Account created successfully! Redirecting to login...');

            // Clear form
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });

            // Redirect to login page after 2 seconds
            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (err) {
            console.error('Signup error details:', err);
            
            if (err.code === 'ECONNABORTED') {
                setError('Request timeout. Please check if server is running.');
            } else if (err.response) {
                // Server responded with error
                setError(err.response.data.error || 'Signup failed. Please try again.');
            } else if (err.request) {
                // Request made but no response
                setError('Cannot connect to server. Please make sure the backend is running on port 4000.');
            } else {
                // Something else happened
                setError('An error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center relative py-20">
            <div className="glass p-10 rounded-3xl w-full max-w-md relative z-10">
                <h2 className="text-3xl font-bold font-sora mb-2 text-center bg-gradient-to-r from-royalBlue to-brightTeal bg-clip-text text-transparent">
                    Create Account
                </h2>
                <p className="text-center text-slate-400 mb-8">
                    Join the future of hiring today.
                </p>
                
                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl animate-pulse">
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    </div>
                )}

                {/* Success Message */}
                {success && (
                    <div className="mb-4 p-4 bg-green-500/10 border border-green-500/30 rounded-xl">
                        <p className="text-green-500 text-sm text-center">{success}</p>
                    </div>
                )}

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                First Name <span className="text-red-400">*</span>
                            </label>
                            <input 
                                type="text" 
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brightTeal focus:ring-1 focus:ring-brightTeal transition-all disabled:opacity-50 disabled:cursor-not-allowed" 
                                placeholder="John"
                                required
                                disabled={loading}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Last Name <span className="text-red-400">*</span>
                            </label>
                            <input 
                                type="text" 
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brightTeal focus:ring-1 focus:ring-brightTeal transition-all disabled:opacity-50 disabled:cursor-not-allowed" 
                                placeholder="Doe"
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Email <span className="text-red-400">*</span>
                        </label>
                        <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brightTeal focus:ring-1 focus:ring-brightTeal transition-all disabled:opacity-50 disabled:cursor-not-allowed" 
                            placeholder="you@example.com" 
                            required
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Password <span className="text-red-400">*</span>
                        </label>
                        <input 
                            type="password" 
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brightTeal focus:ring-1 focus:ring-brightTeal transition-all disabled:opacity-50 disabled:cursor-not-allowed" 
                            placeholder="••••••••" 
                            required
                            disabled={loading}
                        />
                        <p className="text-xs text-slate-500 mt-1">
                            Minimum 6 characters with at least 1 letter and 1 number
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                            Confirm Password <span className="text-red-400">*</span>
                        </label>
                        <input 
                            type="password" 
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brightTeal focus:ring-1 focus:ring-brightTeal transition-all disabled:opacity-50 disabled:cursor-not-allowed" 
                            placeholder="••••••••" 
                            required
                            disabled={loading}
                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={loading}
                        className={`w-full bg-gradient-to-r from-royalBlue to-brightTeal text-white font-bold py-3 rounded-xl hover:shadow-[0_0_20px_rgba(60,178,184,0.4)] transition-all transform hover:scale-[1.02] ${
                            loading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating Account...
                            </span>
                        ) : 'Get Started'}
                    </button>
                </form>

                <p className="mt-6 text-center text-slate-400 text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-brightTeal hover:underline font-medium">
                        Log in
                    </Link>
                </p>

                {/* Terms and Conditions */}
                <p className="mt-4 text-center text-xs text-slate-500">
                    By signing up, you agree to our{' '}
                    <Link to="/terms" className="text-brightTeal hover:underline">
                        Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-brightTeal hover:underline">
                        Privacy Policy
                    </Link>
                </p>
            </div>

            {/* Background Blur Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brightTeal/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        </div>
    );
};

export default Signup;