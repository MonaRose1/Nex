import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const isActive = (path) => location.pathname === path;

    return (
        <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${scrolled ? 'w-[95%] md:w-[85%]' : 'w-[95%] md:w-[90%]'}`}>
            <div className="glass rounded-full px-6 py-3 flex items-center justify-between shadow-2xl backdrop-blur-xl bg-midnightBlue/30 border border-white/10 relative">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <img src={`${import.meta.env.BASE_URL}Nex LOGO/Final EXPORT.svg`} alt="Nex Logo" className="h-8 w-auto group-hover:scale-110 transition-transform" />
                </Link>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
                    <Link to="/" className={`hover:text-brightTeal transition-colors ${isActive('/') ? 'text-brightTeal' : ''}`}>Home</Link>
                    <Link to="/about" className={`hover:text-brightTeal transition-colors ${isActive('/about') ? 'text-brightTeal' : ''}`}>About</Link>
                    <Link to="/services" className={`hover:text-brightTeal transition-colors ${isActive('/services') ? 'text-brightTeal' : ''}`}>Services</Link>
                    <Link to="/portfolio" className={`hover:text-brightTeal transition-colors ${isActive('/portfolio') ? 'text-brightTeal' : ''}`}>Portfolio</Link>
                    <Link to="/contact" className={`hover:text-brightTeal transition-colors ${isActive('/contact') ? 'text-brightTeal' : ''}`}>Contact</Link>
                </div>

                {/* Desktop Auth Buttons */}
                <div className="hidden lg:flex items-center gap-4">
                    <ThemeToggle />
                    <Link to="/login" className="text-sm font-medium text-slate-500 dark:text-slate-300 hover:text-midnightBlue dark:hover:text-white transition-colors">
                        Log In
                    </Link>
                    <Link to="/signup" className="bg-gradient-to-r from-royalBlue to-brightTeal text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg shadow-brightTeal/20 hover:shadow-brightTeal/40 transition-all transform hover:scale-105">
                        Get Started
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden text-white/70 hover:text-white transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            <div className={`absolute top-full left-0 right-0 mt-4 p-6 glass rounded-3xl flex flex-col gap-4 transform transition-all duration-300 origin-top ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'}`}>
                <Link to="/" className={`text-lg font-medium ${isActive('/') ? 'text-brightTeal' : 'text-slate-300'}`}>Home</Link>
                <Link to="/about" className={`text-lg font-medium ${isActive('/about') ? 'text-brightTeal' : 'text-slate-300'}`}>About</Link>
                <Link to="/services" className={`text-lg font-medium ${isActive('/services') ? 'text-brightTeal' : 'text-slate-300'}`}>Services</Link>
                <Link to="/portfolio" className={`text-lg font-medium ${isActive('/portfolio') ? 'text-brightTeal' : 'text-slate-300'}`}>Portfolio</Link>
                <Link to="/contact" className={`text-lg font-medium ${isActive('/contact') ? 'text-brightTeal' : 'text-slate-300'}`}>Contact</Link>
                <hr className="border-white/10" />
                <Link to="/login" className="text-lg font-medium text-slate-300">Log In</Link>
                <Link to="/signup" className="bg-gradient-to-r from-royalBlue to-brightTeal text-white px-5 py-3 rounded-xl text-center font-bold shadow-lg">Get Started</Link>
            </div>
        </nav>
    );
};

export default Navbar;
