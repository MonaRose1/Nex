import React, { useState } from 'react';
import { Shield, Key, Server, Globe, Save, RefreshCw, LogOut, Database, Lock } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle';

const AdminNavItem = ({ icon: Icon, label, path, active, collapsed }) => (
    <Link
        to={path}
        className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group relative ${active
            ? 'bg-royalBlue/20 text-royalBlue-dark dark:text-royalBlue border border-royalBlue/10 shadow-[0_0_15px_rgba(65,105,225,0.3)]'
            : 'text-slate-500 dark:text-white/50 hover:bg-slate-200/50 dark:hover:bg-white/5 hover:text-midnightBlue dark:hover:text-white'
            }`}
    >
        <div className={`${active ? 'drop-shadow-[0_0_8px_rgba(65,105,225,0.4)]' : ''} transition-all`}>
            <Icon size={20} />
        </div>
        {!collapsed && (
            <span className="font-inter text-sm font-medium whitespace-nowrap transition-opacity duration-300">
                {label}
            </span>
        )}
    </Link>
);

const AdminSidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <aside
            onMouseEnter={() => setIsCollapsed(false)}
            onMouseLeave={() => setIsCollapsed(true)}
            className={`fixed left-0 top-0 h-screen z-50 bg-slate-50/80 dark:bg-midnightBlue/80 backdrop-blur-2xl border-r border-royalBlue/10 transition-all duration-500 ease-in-out flex flex-col py-6 ${isCollapsed ? 'w-20' : 'w-72'}`}
        >
            <div className="flex items-center px-6 mb-8">
                <div className="font-sora font-bold text-royalBlue-dark dark:text-royalBlue text-2xl tracking-tight">
                    {isCollapsed ? 'A.' : 'ADMIN.'}
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                <AdminNavItem
                    icon={Shield}
                    label="Core Control"
                    path="/admin"
                    active={location.pathname === '/admin'}
                    collapsed={isCollapsed}
                />
                <AdminNavItem
                    icon={Key}
                    label="API Keys"
                    path="/admin/keys"
                    active={location.pathname === '/admin/keys'}
                    collapsed={isCollapsed}
                />
                <AdminNavItem
                    icon={Database}
                    label="System Logs"
                    path="/admin/logs"
                    active={location.pathname === '/admin/logs'}
                    collapsed={isCollapsed}
                />
                <AdminNavItem
                    icon={Globe}
                    label="Webhooks"
                    path="/admin/webhooks"
                    active={location.pathname === '/admin/webhooks'}
                    collapsed={isCollapsed}
                />
                <AdminNavItem
                    icon={Lock}
                    label="Security"
                    path="/admin/security"
                    active={location.pathname === '/admin/security'}
                    collapsed={isCollapsed}
                />
            </nav>

            <div className="px-4 mt-auto space-y-4">
                <div className="flex justify-center">
                    <ThemeToggle />
                </div>

                <AdminNavItem
                    icon={LogOut}
                    label="Admin Logout"
                    path="/"
                    collapsed={isCollapsed}
                />
            </div>
        </aside>
    );
};

export default AdminSidebar;
