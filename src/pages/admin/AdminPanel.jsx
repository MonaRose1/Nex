import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Shield, Key, Server, Globe, Save, RefreshCw, AlertCircle, CheckCircle2 } from 'lucide-react';

const AdminPanel = () => {
    const [configs, setConfigs] = useState({
        openai_key: 'sk-proj-••••••••••••••••••••••••••••••',
        anthropic_key: 'sk-ant-••••••••••••••••••••••••••••••',
        webhook_url: 'https://api.nex-hiring.com/v1/webhooks',
        retention_days: '90',
        autonomous_scouting: true
    });

    const [isSaving, setIsSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState(null);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setLastSaved(new Date().toLocaleTimeString());
        }, 1200);
    };

    return (
        <AdminLayout>
            <div className="space-y-6 animate-fade-in pb-12">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-sora font-bold text-slate-950 dark:text-white">API Configuration Panel</h1>
                        <p className="text-sm text-slate-950 dark:text-slate-400">Global system settings for AI models and data synchronization.</p>
                    </div>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-6 py-2.5 bg-royalBlue-dark dark:bg-royalBlue hover:bg-royalBlue/90 text-white font-bold rounded-xl transition-all shadow-lg shadow-royalBlue/20 disabled:opacity-50"
                    >
                        {isSaving ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
                        {isSaving ? 'Updating...' : 'Commit Changes'}
                    </button>
                </div>

                {lastSaved && (
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-500 bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20 max-w-fit">
                        <CheckCircle2 size={14} />
                        Configuration updated at {lastSaved}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="glass-card p-6 border-l-4 border-l-royalBlue-dark dark:border-l-royalBlue">
                            <div className="flex items-center gap-3 mb-6">
                                <Key className="text-royalBlue-dark dark:text-royalBlue" size={20} />
                                <h3 className="font-sora font-bold text-slate-950 dark:text-white">Core Intelligence API Keys</h3>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-950 dark:text-slate-400">OpenAI Secret Key</label>
                                    <input
                                        type="password"
                                        value={configs.openai_key}
                                        className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-950 dark:text-white focus:outline-none focus:border-royalBlue/50 transition-colors"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-950 dark:text-slate-400">Anthropic API Endpoint</label>
                                    <input
                                        type="password"
                                        value={configs.anthropic_key}
                                        className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-950 dark:text-white focus:outline-none focus:border-indigo-500/50 transition-colors"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-6 border-l-4 border-l-brightTeal-dark dark:border-l-brightTeal">
                            <div className="flex items-center gap-3 mb-6">
                                <Globe className="text-brightTeal-dark dark:text-brightTeal" size={20} />
                                <h3 className="font-sora font-bold text-slate-950 dark:text-white">External Dispatch</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-950 dark:text-slate-400">Data Dispatch Webhook</label>
                                    <input
                                        type="text"
                                        value={configs.webhook_url}
                                        className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-950 dark:text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="glass-card p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <Server className="text-royalBlue-dark dark:text-royalBlue" size={20} />
                                <h3 className="font-sora font-bold text-slate-950 dark:text-white">Node Parameters</h3>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-950 dark:text-slate-400">Storage TTL (Days)</label>
                                    <select className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-slate-950 dark:text-white focus:outline-none transition-colors">
                                        <option value="30">30 Days</option>
                                        <option value="90">90 Days</option>
                                        <option value="365">1 Year</option>
                                    </select>
                                </div>

                                <div className="p-4 bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-bold text-slate-950 dark:text-slate-400">Auto-Crawler</span>
                                        <button
                                            onClick={() => setConfigs({ ...configs, autonomous_scouting: !configs.autonomous_scouting })}
                                            className={`w-10 h-5 rounded-full relative transition-colors ${configs.autonomous_scouting ? 'bg-royalBlue-dark dark:bg-royalBlue' : 'bg-slate-300 dark:bg-white/10'}`}
                                        >
                                            <div className={`absolute top-1 w-3 h-3 bg-white dark:bg-midnightBlue rounded-full transition-all ${configs.autonomous_scouting ? 'left-6' : 'left-1'}`} />
                                        </button>
                                    </div>
                                    <p className="text-[9px] text-slate-950 dark:text-slate-500 leading-relaxed uppercase tracking-tighter">
                                        Enable background neural scouting for profile matching.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminPanel;
