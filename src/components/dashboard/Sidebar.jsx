import React, { useState } from 'react';
import { LayoutDashboard, Users, Cpu, Settings, LogOut, Bot, Shield, UserCircle, Camera, Mic, Video } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle';

const NavItem = ({ icon: Icon, label, path, active, collapsed, badge }) => (
    <Link
        to={path}
        className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group relative ${active
            ? 'bg-brightTeal/20 text-brightTeal-dark dark:text-brightTeal border border-brightTeal/10 shadow-[0_0_15px_rgba(60,178,184,0.3)]'
            : 'text-slate-500 dark:text-white/50 hover:bg-slate-200/50 dark:hover:bg-white/5 hover:text-midnightBlue dark:hover:text-white'
            }`}
    >
        <div className={`${active ? 'drop-shadow-[0_0_8px_rgba(60,178,184,0.4)]' : ''} transition-all`}>
            <Icon size={20} />
        </div>
        {!collapsed && (
            <span className="font-inter text-sm font-medium whitespace-nowrap transition-opacity duration-300">
                {label}
            </span>
        )}
        {badge && (
            <span className="absolute right-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-green-600 dark:bg-green-500 rounded-full animate-pulse"></span>
        )}
    </Link>
);

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = React.useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    // Mock user data - In real app, this would come from auth context
    const user = {
        name: 'Alex Rivera',
        role: 'Senior Recruiter',
        avatar: 'https://ui-avatars.com/api/?name=Alex+Rivera&background=3CB2B8&color=fff&size=128',
        isLive: true
    };

    return (
        <aside
            onMouseEnter={() => setIsCollapsed(false)}
            onMouseLeave={() => setIsCollapsed(true)}
            className={`fixed left-0 top-0 h-screen z-50 bg-slate-50/80 dark:bg-midnightBlue/80 backdrop-blur-2xl border-r border-midnightBlue/5 dark:border-white/10 transition-all duration-500 ease-in-out flex flex-col py-6 ${isCollapsed ? 'w-20' : 'w-72'
                }`}
        >
            {/* Logo */}
            <div className="flex items-center px-6 mb-8">
                <div className="font-sora font-bold text-brightTeal text-2xl tracking-tight">
                    {isCollapsed ? 'N.' : 'NEX.'}
                </div>
                {!isCollapsed && (
                    <span className="ml-2 text-[10px] bg-white/10 text-white/50 px-2 py-1 rounded-full">
                        v2.0
                    </span>
                )}
            </div>

            {/* Avatar Profile Section - Always Visible */}
            <div
                onClick={() => navigate('/dashboard/avatar')}
                className={`mx-4 mb-6 cursor-pointer group relative ${isCollapsed ? 'text-center' : ''}`}
            >
                <div className="relative">
                    {/* Avatar Image */}
                    <div className={`relative ${isCollapsed ? 'w-12 h-12 mx-auto' : 'w-16 h-16'} rounded-2xl bg-gradient-to-br from-royalBlue to-brightTeal p-[2px] group-hover:scale-105 transition-all duration-300`}>
                        <div className="w-full h-full rounded-2xl bg-midnightBlue overflow-hidden">
                            <img
                                src={user.avatar}
                                alt={user.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Live Indicator */}
                    {user.isLive && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-midnightBlue animate-pulse"></div>
                    )}
                </div>

                {!isCollapsed && (
                    <div className="mt-2">
                        <h4 className="text-white font-semibold text-sm">{user.name}</h4>
                        <p className="text-white/40 text-xs flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                            {user.role}
                        </p>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-2">
                <NavItem
                    icon={LayoutDashboard}
                    label="Overview"
                    path="/dashboard"
                    active={location.pathname === '/dashboard'}
                    collapsed={isCollapsed}
                />
                <NavItem
                    icon={Users}
                    label="Candidates"
                    path="/dashboard/candidates"
                    active={location.pathname === '/dashboard/candidates'}
                    collapsed={isCollapsed}
                    badge={true}
                />
                <NavItem
                    icon={Bot}
                    label="AI Interviewer"
                    path="/dashboard/interviewer"
                    active={location.pathname === '/dashboard/interviewer'}
                    collapsed={isCollapsed}
                />
                <NavItem
                    icon={Cpu}
                    label="AI Settings"
                    path="/dashboard/ai-settings"
                    active={location.pathname === '/dashboard/ai-settings'}
                    collapsed={isCollapsed}
                />
                <NavItem
                    icon={Settings}
                    label="Billing"
                    path="/dashboard/billing"
                    active={location.pathname === '/dashboard/billing'}
                    collapsed={isCollapsed}
                />

                {/* Avatar Profile Link - New */}
                <NavItem
                    icon={UserCircle}
                    label="My Avatar"
                    path="/dashboard/avatar"
                    active={location.pathname === '/dashboard/avatar'}
                    collapsed={isCollapsed}
                />
            </nav>

            {/* Bottom Section */}
            <div className="px-4 mt-auto space-y-2 space-y-4">
                <div className="flex justify-center">
                    <ThemeToggle />
                </div>
                {/* Live Interview Status */}
                {!isCollapsed && (
                    <div className="bg-gradient-to-r from-royalBlue/20 to-brightTeal/20 rounded-xl p-3 mb-2 border border-white/5">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-600 dark:bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-slate-950 dark:text-white/70 text-xs font-bold">Live Interview Active</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                            <div className="w-6 h-6 rounded-full bg-brightTeal/20 flex items-center justify-center">
                                <Mic size={12} className="text-brightTeal-dark dark:text-brightTeal" />
                            </div>
                            <div className="w-6 h-6 rounded-full bg-brightTeal/20 flex items-center justify-center">
                                <Video size={12} className="text-brightTeal-dark dark:text-brightTeal" />
                            </div>
                            <span className="text-slate-950 dark:text-white/30 text-[10px] ml-auto font-bold tracking-tighter">00:24:12</span>
                        </div>
                    </div>
                )}

                <NavItem
                    icon={LogOut}
                    label="Sign Out"
                    path="/"
                    collapsed={isCollapsed}
                />
            </div>
        </aside>
    );
};

export default Sidebar;