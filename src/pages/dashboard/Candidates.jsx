import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { Search, Filter, MoreHorizontal, UserCheck, UserX, Clock } from 'lucide-react';

const candidatesData = [
    { id: 1, name: 'Alex Rivera', role: 'Senior React Developer', match: 98, status: 'Interviewing', experience: '8 yrs', avatar: 'AR' },
    { id: 2, name: 'Sarah Chen', role: 'AI Engineer', match: 94, status: 'Shortlisted', experience: '5 yrs', avatar: 'SC' },
    { id: 3, name: 'Marcus Knight', role: 'Full Stack Dev', match: 89, status: 'Screening', experience: '3 yrs', avatar: 'MK' },
    { id: 4, name: 'Elena Vance', role: 'Frontend Lead', match: 92, status: 'Interviewing', experience: '6 yrs', avatar: 'EV' },
    { id: 5, name: 'David Miller', role: 'React Native Dev', match: 85, status: 'Reviewing', experience: '4 yrs', avatar: 'DM' },
    { id: 6, name: 'Priya Sharma', role: 'Product Designer', match: 82, status: 'Shortlisted', experience: '7 yrs', avatar: 'PS' },
];

const StatusBadge = ({ status }) => {
    const styles = {
        'Interviewing': 'bg-brightTeal/10 text-brightTeal border-brightTeal/20',
        'Shortlisted': 'bg-royalBlue/10 text-royalBlue border-royalBlue/20',
        'Screening': 'bg-amber-500/10 text-amber-500 border-amber-500/20',
        'Reviewing': 'bg-slate-500/10 text-slate-500 border-slate-500/20',
    };
    return (
        <span className={`px-2 py-1 rounded-md border text-[10px] font-bold uppercase tracking-wider ${styles[status] || styles['Reviewing']}`}>
            {status}
        </span>
    );
};

const Candidates = () => {
    return (
        <DashboardLayout>
            <div className="space-y-6 animate-fade-in">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-sora font-bold text-midnightBlue dark:text-white">Active Candidates</h1>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Manage and track your top AI-scouted talent.</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-brightTeal transition-colors" />
                            <input
                                type="text"
                                placeholder="Search candidates..."
                                className="pl-10 pr-4 py-2 bg-white/40 dark:bg-white/5 border border-midnightBlue/5 dark:border-white/10 rounded-xl text-xs focus:outline-none focus:border-brightTeal/50 transition-all w-full md:w-64"
                            />
                        </div>
                        <button className="p-2 border border-midnightBlue/5 dark:border-white/10 rounded-xl hover:bg-white dark:hover:bg-white/5 transition-colors">
                            <Filter className="w-4 h-4 text-slate-500" />
                        </button>
                    </div>
                </div>

                <div className="glass-card overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-midnightBlue/5 dark:border-white/5 bg-midnightBlue/5 dark:bg-white/5">
                                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Candidate</th>
                                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Nex Match</th>
                                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Exp.</th>
                                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Status</th>
                                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-midnightBlue/5 dark:divide-white/5">
                                {candidatesData.map((candidate) => (
                                    <tr key={candidate.id} className="hover:bg-white/40 dark:hover:bg-white/5 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-royalBlue to-brightTeal flex items-center justify-center text-[10px] font-bold text-white shadow-lg shadow-brightTeal/10">
                                                    {candidate.avatar}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-semibold text-midnightBlue dark:text-white">{candidate.name}</p>
                                                    <p className="text-[10px] text-slate-500">{candidate.role}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden w-24">
                                                    <div
                                                        className="h-full bg-brightTeal transition-all duration-1000"
                                                        style={{ width: `${candidate.match}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs font-bold text-brightTeal">{candidate.match}%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">{candidate.experience}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={candidate.status} />
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-1 hover:text-brightTeal transition-colors">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Candidates;
