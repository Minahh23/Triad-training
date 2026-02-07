import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, Shield, LogOut, Settings, CheckCircle } from 'lucide-react';

const DB_KEY = "triad_sovereign_storage_v10";

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
