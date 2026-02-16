import React from 'react';
import { LayoutDashboard, Users, Cpu, Settings, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const NavItem = ({ icon: Icon, label, path, active, collapsed }) => (
    <Link
        to={path}
        className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${active
                ? 'bg-brightTeal/20 text-brightTeal border border-white/10'
                : 'text-white/50 hover:bg-white/5 hover:text-white'
            }`}
    >
        <div className={`${active ? 'drop-shadow-[0_0_8px_rgba(60,178,184,0.5)]' : ''}`}>
            <Icon size={20} />
        </div>
        {!collapsed && (
            <span className="font-inter text-sm font-medium whitespace-nowrap transition-opacity duration-300">
                {label}
            </span>
        )}
    </Link>
);

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = React.useState(true);
    const location = useLocation();

    return (
        <aside
            onMouseEnter={() => setIsCollapsed(false)}
            onMouseLeave={() => setIsCollapsed(true)}
            className={`fixed left-0 top-0 h-screen z-50 bg-midnightBlue/80 backdrop-blur-2xl border-r border-white/10 transition-all duration-500 ease-in-out flex flex-col py-8 ${isCollapsed ? 'w-20' : 'w-64'
                }`}
        >
            <div className="flex items-center px-6 mb-12">
                <div className="font-sora font-bold text-brightTeal text-2xl">
                    {isCollapsed ? 'N.' : 'NEX.'}
                </div>
            </div>

            <nav className="flex-1 px-4 space-y-4">
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
            </nav>

            <div className="px-4 mt-auto">
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
