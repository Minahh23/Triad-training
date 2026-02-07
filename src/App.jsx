import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, Shield, LogOut, Settings, CheckCircle } from 'lucide-react';

const DB_KEY = "triad_sovereign_storage_v10";
const StudentPortal = ({ user }) => {
  const [goal, setGoal] = useState('Bodybuilding'); 

  // EXPERT REPOSITORY: Real exercise sets based on fitness science
  const trainingLibrary = {
    "Bodybuilding": [
      { name: "Hypertrophy: Chest/Triceps", duration: "65 min", sets: "4x12", intensity: "High" },
      { name: "Back/Biceps Volume", duration: "55 min", sets: "3x15", intensity: "Medium" },
      { name: "Leg Day (Quads Focus)", duration: "70 min", sets: "5x10", intensity: "Max" }
    ],
    "Strengthening": [
      { name: "Deadlift Fundamentals", duration: "45 min", sets: "5x5", intensity: "Max" },
      { name: "Overhead Press Stability", duration: "40 min", sets: "5x5", intensity: "High" },
      { name: "Core Kinetic Chain", duration: "30 min", sets: "3x20", intensity: "Medium" }
    ],
    "Weight Loss": [
      { name: "HIIT: Tabata Sprints", duration: "25 min", sets: "8 Rounds", intensity: "Max" },
      { name: "Full Body Metabolic Blast", duration: "45 min", sets: "Circuit", intensity: "High" },
      { name: "Active Recovery Flow", duration: "30 min", sets: "Steady", intensity: "Low" }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 pb-24">
      <header className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-black italic tracking-tighter">TRIAD PERFORMANCE</h1>
          <p className="text-slate-500 text-xs font-bold uppercase">Sovereign ID: {user?.name.substring(0,5)}-2026</p>
        </div>
        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-lg">👤</div>
      </header>

      {/* PROGRESSION TO TARGET SECTION */}
      <section className="mb-8">
        <h3 className="text-[10px] font-black text-slate-400 mb-3 tracking-widest uppercase">Progression to Target</h3>
        <div className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
          <div className="flex justify-between items-center mb-4">
            <select 
              value={goal} 
              onChange={(e) => setGoal(e.target.value)}
              className="bg-slate-100 border-none rounded-xl px-3 py-1 text-xs font-bold text-indigo-600 focus:ring-0"
            >
              <option>Bodybuilding</option>
              <option>Strengthening</option>
              <option>Weight Loss</option>
            </select>
            <span className="text-2xl font-black italic text-indigo-600">72%</span>
          </div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
            <div className="bg-indigo-600 h-full rounded-full transition-all duration-1000" style={{width: '72%'}}></div>
          </div>
        </div>
      </section>

      {/* EXERCISE TRAINING SECTION */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-[10px] font-black text-slate-400 tracking-widest uppercase">Exercise Training</h3>
          <span className="text-[10px] font-bold text-indigo-500">Duration Section ⏱️</span>
        </div>
        <div className="space-y-3">
          {trainingLibrary[goal].map((ex, i) => (
            <div key={i} className="bg-white p-5 rounded-3xl flex justify-between items-center border border-slate-50 group active:scale-95 transition-all">
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center text-indigo-600 font-bold">{i+1}</div>
                <div>
                  <p className="font-bold text-slate-800 text-sm">{ex.name}</p>
                  <p className="text-[10px] text-slate-400 font-medium">{ex.duration} • {ex.sets} • {ex.intensity} Intensity</p>
                </div>
              </div>
              <div className="w-6 h-6 rounded-full border-2 border-slate-100 flex items-center justify-center text-[10px]">✓</div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS & AI CONCLUSION */}
      <section>
        <h3 className="text-[10px] font-black text-slate-400 mb-3 tracking-widest uppercase">AI Conclusion & Stats</h3>
        <div className="bg-indigo-900 p-6 rounded-[2.5rem] text-white shadow-lg shadow-indigo-200">
          <div className="flex items-center gap-2 mb-3">
            <span className="animate-pulse">🤖</span>
            <p className="text-[10px] font-bold tracking-widest opacity-60 uppercase">System Analysis</p>
          </div>
          <p className="text-sm leading-relaxed font-medium opacity-90 italic">
            "Based on your 72% {goal} completion, your metabolic rate has increased by 14%. 
            Recommendation: Prioritize the 'Kinetic Chain' session tomorrow to prevent CNS fatigue."
          </p>
          <div className="mt-6 pt-6 border-t border-white/10 flex justify-between">
            <div className="text-center">
              <p className="text-[10px] opacity-50 uppercase">Power</p>
              <p className="font-bold text-lg">8.4</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] opacity-50 uppercase">Stamina</p>
              <p className="font-bold text-lg">9.1</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] opacity-50 uppercase">Recov</p>
              <p className="font-bold text-lg">6.2</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState('auth'); 
  const [authMode, setAuthMode] = useState('login');
  const [role, setRole] = useState('student');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [user, setUser] = useState(null);

  // --- LOGIC: AUTHENTICATION ---
  const handleAuth = () => {
    if (!email.includes('@') || password.length < 6) {
      alert("Please enter a valid email and 6-character password.");
      return;
    }

    // Admin Login Logic (SMS OTP Simulation)
    if (email === 'admin@triad.com') {
      const code = Math.floor(1000 + Math.random() * 9000);
      setOtpSent(true);
      alert(`SOVEREIGN SECURITY: SMS sent to registered device. Code: ${code}`);
      return;
    }

    // Role-Based Login Redirect
    const userData = { name: fullName || email.split('@')[0], role: role };
    setUser(userData);
    
    if (role === 'coach') setView('coach_dashboard');
    else setView('student_portal');
  };

  // --- VIEW: COACH DASHBOARD ---
  const CoachDashboard = () => (
    <div className="min-h-screen bg-slate-50 p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Coach Command</h1>
        <button onClick={() => setView('auth')} className="p-2 bg-white rounded-full shadow-sm"><LogOut size={20}/></button>
      </header>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
          <Users className="text-indigo-600 mb-2" />
          <p className="text-slate-500 text-sm">Active Students</p>
          <p className="text-2xl font-bold">12</p>
        </div>
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100">
          <TrendingUp className="text-emerald-600 mb-2" />
          <p className="text-slate-500 text-sm">Avg. Progress</p>
          <p className="text-2xl font-bold">78%</p>
        </div>
      </div>

      <h2 className="font-bold mb-4">Student Roster</h2>
      {['Alex Rivera', 'Sarah Chen', 'Marcus Thorne'].map((student) => (
        <div key={student} className="bg-white p-4 rounded-2xl mb-3 flex justify-between items-center">
          <div>
            <p className="font-medium">{student}</p>
            <p className="text-xs text-slate-400">In Training</p>
          </div>
          <div className="w-16 bg-slate-100 h-2 rounded-full">
            <div className="bg-indigo-600 h-2 rounded-full" style={{width: '60%'}}></div>
          </div>
        </div>
      ))}
    </div>
  );

  // --- VIEW: AUTHENTICATION ---
  if (view === 'auth') {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
        <div className="w-20 h-20 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center shadow-xl shadow-indigo-200 mb-6">
          <span className="text-white text-4xl font-black italic">T</span>
        </div>
        <h1 className="text-3xl font-black italic text-slate-900 mb-8">TRIAD NET</h1>

        <div className="w-full max-w-sm space-y-4">
          <div className="flex bg-slate-100 p-1 rounded-2xl">
            <button onClick={() => setAuthMode('login')} className={`flex-1 py-3 rounded-xl font-bold text-sm ${authMode === 'login' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400'}`}>LOGIN</button>
            <button onClick={() => setAuthMode('register')} className={`flex-1 py-3 rounded-xl font-bold text-sm ${authMode === 'register' ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-400'}`}>REGISTER</button>
          </div>

          {authMode === 'register' && (
            <input type="text" placeholder="Full Name" className="w-full p-4 rounded-2xl bg-slate-50 border-none ring-1 ring-slate-100 focus:ring-2 focus:ring-indigo-500" onChange={(e) => setFullName(e.target.value)} />
          )}
          
          <input type="email" placeholder="Email" className="w-full p-4 rounded-2xl bg-slate-50 border-none ring-1 ring-slate-100" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" className="w-full p-4 rounded-2xl bg-slate-50 border-none ring-1 ring-slate-100" onChange={(e) => setPassword(e.target.value)} />

          {authMode === 'register' && (
            <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl">
              <button onClick={() => setRole('student')} className={`flex-1 py-2 rounded-xl text-xs font-bold ${role === 'student' ? 'bg-white text-indigo-600' : 'text-slate-500'}`}>STUDENT</button>
              <button onClick={() => setRole('coach')} className={`flex-1 py-2 rounded-xl text-xs font-bold ${role === 'coach' ? 'bg-white text-indigo-600' : 'text-slate-500'}`}>COACH</button>
            </div>
          )}

          <button onClick={handleAuth} className="w-full py-5 bg-indigo-600 text-white rounded-[2rem] font-bold shadow-lg shadow-indigo-200 active:scale-95 transition-transform">
            {authMode === 'login' ? 'ENTER NETWORK' : 'CREATE ACCOUNT'}
          </button>
        </div>
      </div>
    );
  }

  if (view === 'coach_dashboard') return <CoachDashboard />;

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold">Welcome, {user?.name}!</h1>
      <p className="text-slate-500">Student Portal coming soon...</p>
      <button onClick={() => setView('auth')} className="mt-4 text-indigo-600">Logout</button>
    </div>
  );
  }
