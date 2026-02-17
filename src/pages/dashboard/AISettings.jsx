import React, { useState } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { Settings, Cpu, Brain, Shield, Bell, Save } from 'lucide-react';

const SettingToggle = ({ label, description, checked, onChange, icon: Icon }) => (
    <div className="flex items-center justify-between p-4 glass-card">
        <div className="flex gap-4">
            {Icon && (
                <div className="w-10 h-10 rounded-xl bg-brightTeal/10 flex items-center justify-center text-brightTeal">
                    <Icon size={20} />
                </div>
            )}
            <div>
                <p className="text-sm font-semibold text-midnightBlue dark:text-white">{label}</p>
                <p className="text-xs text-slate-500">{description}</p>
            </div>
        </div>
        <button
            onClick={() => onChange(!checked)}
            className={`w-12 h-6 rounded-full transition-all duration-300 relative ${checked ? 'bg-brightTeal' : 'bg-slate-300 dark:bg-white/10'}`}
        >
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all shadow-sm ${checked ? 'left-7' : 'left-1'}`} />
        </button>
    </div>
);

const AISettings = () => {
    const [settings, setSettings] = useState({
        ghostMode: true,
        autoScout: true,
        culturalAnalysis: false,
        priorityScoring: true,
        emailNotifications: true
    });

    const updateSetting = (key, val) => setSettings(prev => ({ ...prev, [key]: val }));

    return (
        <DashboardLayout>
            <div className="max-w-4xl space-y-8 animate-fade-in">
                <div>
                    <h1 className="text-2xl font-sora font-bold text-midnightBlue dark:text-white">AI Control Panel</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Configure how Nex AI scouts and evaluates your candidates.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Core Intelligence</h3>
                        <SettingToggle
                            label="Ghost Mode™"
                            description="AI-led automated technical interviews"
                            checked={settings.ghostMode}
                            onChange={(v) => updateSetting('ghostMode', v)}
                            icon={Brain}
                        />
                        <SettingToggle
                            label="Autonomous Scout"
                            description="AI finds candidates while you sleep"
                            checked={settings.autoScout}
                            onChange={(v) => updateSetting('autoScout', v)}
                            icon={Cpu}
                        />
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Evaluation Strategy</h3>
                        <SettingToggle
                            label="Cultural Analysis"
                            description="Match based on team personality"
                            checked={settings.culturalAnalysis}
                            onChange={(v) => updateSetting('culturalAnalysis', v)}
                            icon={Shield}
                        />
                        <SettingToggle
                            label="Priority Scoring"
                            description="Heavily weight experience over local"
                            checked={settings.priorityScoring}
                            onChange={(v) => updateSetting('priorityScoring', v)}
                            icon={Settings}
                        />
                    </div>
                </div>

                <div className="pt-8 border-t border-midnightBlue/5 dark:border-white/5 flex justify-end">
                    <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-royalBlue to-brightTeal text-white rounded-2xl font-sora font-bold shadow-lg shadow-brightTeal/20 hover:shadow-brightTeal/40 transition-all hover:scale-105 active:scale-95">
                        <Save size={18} />
                        Save Configuration
                    </button>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AISettings;
