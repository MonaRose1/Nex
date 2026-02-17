import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { CreditCard, Zap, CheckCircle2, Package, History } from 'lucide-react';

const PlanCard = ({ name, price, features, current, color }) => (
    <div className={`p-6 glass-card relative overflow-hidden transition-all duration-300 ${current ? 'ring-2 ring-brightTeal' : ''}`}>
        {current && (
            <div className="absolute top-0 right-0 py-1 px-4 bg-brightTeal text-midnightBlue text-[10px] font-bold uppercase tracking-widest rounded-bl-xl shadow-lg">
                Active Plan
            </div>
        )}
        <div className={`w-12 h-12 rounded-xl bg-opacity-10 mb-6 flex items-center justify-center ${color === 'teal' ? 'bg-brightTeal text-brightTeal' : 'bg-royalBlue text-royalBlue'}`}>
            <Package size={24} />
        </div>
        <h3 className="text-lg font-sora font-bold text-midnightBlue dark:text-white mb-1">{name}</h3>
        <p className="text-3xl font-sora font-bold text-midnightBlue dark:text-white mb-6">
            ${price}<span className="text-xs text-slate-500 font-normal">/mo</span>
        </p>

        <ul className="space-y-4 mb-8">
            {features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-xs text-slate-600 dark:text-slate-400 font-medium">
                    <CheckCircle2 size={14} className="text-brightTeal" />
                    {f}
                </li>
            ))}
        </ul>

        <button className={`w-full py-3 rounded-xl font-sora font-bold text-sm transition-all ${current
                ? 'bg-slate-200 dark:bg-white/10 text-slate-500 cursor-default'
                : 'bg-gradient-to-r from-royalBlue to-brightTeal text-white shadow-lg shadow-brightTeal/20 hover:scale-105 hover:shadow-brightTeal/40'
            }`}>
            {current ? 'Currently Subscribed' : 'Upgrade Now'}
        </button>
    </div>
);

const Billing = () => {
    return (
        <DashboardLayout>
            <div className="space-y-8 animate-fade-in">
                <div>
                    <h1 className="text-2xl font-sora font-bold text-midnightBlue dark:text-white">Billing & Subscription</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Manage your subscription, payments, and view your usage metrics.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <PlanCard
                                name="Nex Professional"
                                price="499"
                                current={true}
                                color="teal"
                                features={['Unlimited AI Scouting', '15 Ghost Mode Interviews/mo', 'Dedicated Account Manager', 'Advanced Analytics']}
                            />
                            <PlanCard
                                name="Nex Enterprise"
                                price="1299"
                                color="blue"
                                features={['Custom AI Training', 'Unlimited Ghost Mode', 'API Access', '24/7 Priority Support']}
                            />
                        </div>

                        <div className="glass-card p-6">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-xl bg-brightTeal/10 flex items-center justify-center text-brightTeal">
                                    <CreditCard size={24} />
                                </div>
                                <h3 className="font-sora font-bold text-midnightBlue dark:text-white">Payment Method</h3>
                            </div>

                            <div className="p-4 bg-midnightBlue/5 dark:bg-white/5 rounded-2xl flex items-center justify-between border border-midnightBlue/5 dark:border-white/5">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-6 bg-slate-800 rounded flex items-center justify-center text-[8px] text-white font-bold italic">VISA</div>
                                    <span className="text-sm font-medium text-midnightBlue dark:text-white">•••• •••• •••• 4242</span>
                                </div>
                                <button className="text-xs font-bold text-brightTeal hover:underline">Edit</button>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="glass-card p-6 border-brightTeal/20">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-royalBlue/10 flex items-center justify-center text-royalBlue">
                                    <Zap size={20} />
                                </div>
                                <h3 className="font-sora font-bold text-midnightBlue dark:text-white">Usage Stats</h3>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                                        <span>AI Interviews Used</span>
                                        <span className="text-brightTeal">12 / 15</span>
                                    </div>
                                    <div className="h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-brightTeal" style={{ width: '80%' }} />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                                        <span>Candidate Scouts (Active)</span>
                                        <span className="text-royalBlue">4 / 5</span>
                                    </div>
                                    <div className="h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-royalBlue" style={{ width: '80%' }} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500">
                                    <History size={20} />
                                </div>
                                <h3 className="font-sora font-bold text-midnightBlue dark:text-white">History</h3>
                            </div>
                            <div className="space-y-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="flex justify-between items-center text-xs">
                                        <span className="text-slate-500">Feb {10 - i}, 2026</span>
                                        <span className="font-bold text-midnightBlue dark:text-white">$499.00</span>
                                    </div>
                                ))}
                                <button className="w-full text-center text-[10px] font-bold uppercase tracking-widest text-brightTeal pt-2">View All Invoices</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Billing;
