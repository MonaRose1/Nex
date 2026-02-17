import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import AIAvatar from '../../components/dashboard/AIAvatar';
import { Mic, Video, Send, Activity, Shield, Brain, Sliders, Play, Square, MessageSquare, Phone } from 'lucide-react';

const AIInterviewer = () => {
    const [isInterviewing, setIsInterviewing] = useState(false);
    const [transcript, setTranscript] = useState([
        { role: 'ai', text: "Hello Sarah, I'm Nex. I'll be conducting your technical assessment today. Ready to begin?" },
        { role: 'candidate', text: "Yes, I'm ready. I've been looking forward to this." },
    ]);
    const [sentiment, setSentiment] = useState({
        confidence: 92,
        competency: 88,
        sincerity: 95,
        stress: 15,
        relevance: 98,
        tone: 90
    });

    // Speaking state for avatar and waveform animations
    const [isSpeaking, setIsSpeaking] = useState(false);

    // Voice Selection State
    const [availableVoices, setAvailableVoices] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [voiceSettings, setVoiceSettings] = useState({
        pitch: 0.9,
        rate: 1.0,
        volume: 1.0
    });

    // Load available voices
    useEffect(() => {
        const loadVoices = () => {
            const voices = window.speechSynthesis.getVoices();
            setAvailableVoices(voices);

            // Load saved voice from localStorage or use default
            const savedVoiceName = localStorage.getItem('nexAIVoice');
            if (savedVoiceName) {
                const voice = voices.find(v => v.name === savedVoiceName);
                setSelectedVoice(voice || voices[0]);
            } else {
                // Default to first English voice or first available
                const defaultVoice = voices.find(v => v.lang.startsWith('en')) || voices[0];
                setSelectedVoice(defaultVoice);
            }
        };

        loadVoices();
        // Chrome loads voices asynchronously
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
    }, []);

    // Enhanced TTS with voice selection
    const speakDescription = (text, previewMode = false) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);

            if (selectedVoice) {
                utterance.voice = selectedVoice;
            }

            utterance.pitch = voiceSettings.pitch;
            utterance.rate = voiceSettings.rate;
            utterance.volume = voiceSettings.volume;

            // Event listeners for animations
            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => setIsSpeaking(false);
            utterance.onerror = () => setIsSpeaking(false);
            utterance.onboundary = (e) => {
                if (e.name === 'word') setWaveHeight(p => p.map(() => Math.floor(Math.random() * 70) + 10));
            };

            window.speechSynthesis.speak(utterance);
        }
    };

    // Handle voice change
    const handleVoiceChange = (voiceName) => {
        const voice = availableVoices.find(v => v.name === voiceName);
        setSelectedVoice(voice);
        localStorage.setItem('nexAIVoice', voiceName);
    };

    // Preview selected voice
    const previewVoice = () => {
        speakDescription("Hello, I'm Nex AI. This is how I sound with the selected voice.", true);
    };

    // Simulate pulse effect for waveform
    const [waveHeight, setWaveHeight] = useState([40, 60, 30, 80, 50, 70, 40]);
    useEffect(() => {
        if (isInterviewing) {
            const lastMessage = transcript[transcript.length - 1];
            if (lastMessage.role === 'ai') speakDescription(lastMessage.text);

            // Animate waveform - faster and more dramatic when speaking
            const interval = setInterval(() => {
                if (isSpeaking) {
                    setWaveHeight(waveHeight.map(() => Math.floor(Math.random() * 70) + 10));
                } else {
                    setWaveHeight(waveHeight.map(() => Math.floor(Math.random() * 30) + 20));
                }
            }, isSpeaking ? 100 : 300);
            return () => clearInterval(interval);
        } else {
            setWaveHeight([40, 40, 40, 40, 40, 40, 40]);
            if ('speechSynthesis' in window) window.speechSynthesis.cancel();
        }
    }, [isInterviewing, transcript]);

    const toggleInterview = () => setIsInterviewing(!isInterviewing);

    return (
        <DashboardLayout>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
                {/* Main Interaction Area */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="glass-card p-8 min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden group">
                        {/* Status Grid */}
                        <div className="absolute top-6 left-6 flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${isInterviewing ? 'bg-brightTeal animate-pulse' : 'bg-slate-400'}`} />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                                {isInterviewing ? 'Live Session Active' : 'Interviewer Ready'}
                            </span>
                        </div>

                        {/* Animated Avatar */}
                        <div className="mb-8">
                            <AIAvatar isSpeaking={isSpeaking} />
                        </div>

                        {/* Central Waveform Visualization */}
                        <div className="flex items-end gap-2 h-32 mb-8">
                            {waveHeight.map((h, i) => (
                                <div
                                    key={i}
                                    className="w-3 bg-gradient-to-t from-royalBlue-dark dark:from-royalBlue to-brightTeal-dark dark:to-brightTeal rounded-full transition-all duration-150 shadow-[0_0_15px_rgba(60,178,184,0.3)]"
                                    style={{ height: `${h}%` }}
                                />
                            ))}
                        </div>

                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-sora font-bold text-slate-950 dark:text-white mb-2">Nex AI Agent</h3>
                            <p className="text-sm text-slate-950 dark:text-slate-400 font-medium">Evaluating: Senior Frontend Developer Position</p>
                        </div>

                        {/* Interview Control Buttons */}
                        <div className="flex gap-4">
                            {!isInterviewing ? (
                                <button
                                    onClick={toggleInterview}
                                    className="flex items-center gap-3 px-8 py-4 rounded-2xl font-sora font-bold transition-all transform hover:scale-105 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald/20 hover:shadow-emerald/40"
                                >
                                    <Play size={20} /> Start Interview
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={toggleInterview}
                                        className="flex items-center gap-3 px-8 py-4 rounded-2xl font-sora font-bold transition-all transform hover:scale-105 bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/30 hover:shadow-red-500/50"
                                    >
                                        <Phone size={20} className="rotate-[135deg]" /> End Call
                                    </button>
                                    <button
                                        onClick={toggleInterview}
                                        className="flex items-center gap-3 px-6 py-4 rounded-2xl font-sora font-bold transition-all transform hover:scale-105 bg-slate-200 dark:bg-white/5 text-slate-950 dark:text-white border border-midnightBlue/10 dark:border-white/10 hover:border-red-500/50"
                                    >
                                        <Square size={18} /> Terminate
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Live Transcript */}
                    <div className="glass-card p-6 h-64 flex flex-col">
                        <div className="flex items-center gap-2 mb-4">
                            <MessageSquare size={18} className="text-brightTeal-dark dark:text-brightTeal" />
                            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-950 dark:text-slate-500">Live Transcription</h4>
                        </div>
                        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                            {transcript.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-xs font-medium leading-relaxed ${msg.role === 'ai'
                                        ? 'bg-slate-200 dark:bg-white/5 text-slate-950 dark:text-slate-300 rounded-tl-none border border-slate-300 dark:border-white/10'
                                        : 'bg-brightTeal/10 dark:bg-brightTeal/20 text-brightTeal-dark dark:text-brightTeal rounded-tr-none border border-brightTeal-dark/20 dark:border-brightTeal/10'
                                        }`}>
                                        <span className="block text-[8px] font-bold uppercase tracking-tighter opacity-70 mb-1">
                                            {msg.role === 'ai' ? 'Nex AI' : 'Candidate'}
                                        </span>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Side Intelligence Panel */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Sentiment Analysis */}
                    <div className="glass-card p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <Activity size={18} className="text-brightTeal-dark dark:text-brightTeal" />
                            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-950 dark:text-slate-500">Real-time Vitals</h4>
                        </div>
                        <div className="space-y-6">
                            {[
                                { label: 'Confidence', val: sentiment.confidence, color: 'brightTeal-dark', darkColor: 'brightTeal' },
                                { label: 'Competency', val: sentiment.competency, color: 'royalBlue-dark', darkColor: 'royalBlue' },
                                { label: 'Sincerity', val: sentiment.sincerity, color: 'amber-600', darkColor: 'amber-500' },
                                { label: 'Stress Level', val: sentiment.stress, color: 'red-600', darkColor: 'red-500' },
                                { label: 'Relevance', val: sentiment.relevance, color: 'emerald-600', darkColor: 'emerald-500' },
                                { label: 'Tone Analysis', val: sentiment.tone, color: 'indigo-600', darkColor: 'indigo-500' }
                            ].map((stat, i) => (
                                <div key={i}>
                                    <div className="flex justify-between text-xs font-bold mb-2">
                                        <span className="text-slate-950 dark:text-white/60">{stat.label}</span>
                                        <span className={`text-${stat.color} dark:text-${stat.darkColor}`}>{stat.val}%</span>
                                    </div>
                                    <div className="h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full bg-${stat.color} dark:bg-${stat.darkColor} transition-all duration-1000`}
                                            style={{ width: `${stat.val}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Interview Controls */}
                    <div className="glass-card p-6">
                        <div className="flex items-center gap-2 mb-6">
                            <Sliders size={18} className="text-brightTeal-dark dark:text-brightTeal" />
                            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-950 dark:text-slate-500">Parameters</h4>
                        </div>
                        <div className="space-y-4">
                            {/* Voice Selection */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-950 dark:text-slate-400">AI Voice</label>
                                <select
                                    value={selectedVoice?.name || ''}
                                    onChange={(e) => handleVoiceChange(e.target.value)}
                                    className="w-full p-3 bg-slate-200 dark:bg-white/5 rounded-xl border border-midnightBlue/10 dark:border-white/5 text-xs font-bold text-slate-950 dark:text-white focus:outline-none focus:border-brightTeal-dark dark:focus:border-brightTeal transition-all"
                                >
                                    {availableVoices.length === 0 ? (
                                        <option>Loading voices...</option>
                                    ) : (
                                        availableVoices.map((voice, idx) => (
                                            <option key={idx} value={voice.name}>
                                                {voice.name} ({voice.lang})
                                            </option>
                                        ))
                                    )}
                                </select>
                                <button
                                    onClick={previewVoice}
                                    disabled={!selectedVoice}
                                    className="w-full p-2 bg-brightTeal/10 dark:bg-brightTeal/20 text-brightTeal-dark dark:text-brightTeal rounded-lg text-[10px] font-bold uppercase tracking-widest hover:bg-brightTeal/20 dark:hover:bg-brightTeal/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Preview Voice
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-slate-200 dark:bg-white/5 rounded-xl border border-midnightBlue/10 dark:border-white/5">
                                <span className="text-xs font-bold text-slate-950 dark:text-slate-400">Aggression</span>
                                <span className="text-xs font-bold text-slate-950 dark:text-white">Medium</span>
                            </div>
                            <div className="flex items-center justify-between p-3 bg-slate-200 dark:bg-white/5 rounded-xl border border-midnightBlue/10 dark:border-white/5">
                                <span className="text-xs font-bold text-slate-950 dark:text-slate-400">Technical Depth</span>
                                <span className="text-xs font-bold text-slate-950 dark:text-white">Level 4</span>
                            </div>
                            <div className="flex justify-center pt-2">
                                <button className="text-[10px] font-bold uppercase tracking-widest text-brightTeal-dark dark:text-brightTeal hover:underline">Advanced Settings</button>
                            </div>
                        </div>
                    </div>

                    {/* Mode Cards */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="glass-card p-4 flex flex-col items-center gap-2 text-center group cursor-pointer hover:border-brightTeal/50">
                            <div className="p-2 bg-brightTeal/10 rounded-lg text-brightTeal-dark dark:text-brightTeal group-hover:scale-110 transition-transform">
                                <Mic size={20} />
                            </div>
                            <span className="text-[10px] font-bold text-slate-950 dark:text-white/60">Voice Only</span>
                        </div>
                        <div className="glass-card p-4 flex flex-col items-center gap-2 text-center group cursor-pointer hover:border-royalBlue/50">
                            <div className="p-2 bg-royalBlue/10 rounded-lg text-royalBlue-dark dark:text-royalBlue group-hover:scale-110 transition-transform">
                                <Video size={20} />
                            </div>
                            <span className="text-[10px] font-bold text-slate-950 dark:text-white/60">Full AV</span>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AIInterviewer;
