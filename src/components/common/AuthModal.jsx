
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { X, Sparkles, User, Mail, Lock, ArrowRight } from 'lucide-react';

export default function AuthModal() {
  const {
    isAuthModalOpen,
    closeAuth,
    authMode,
    setAuthMode,
    login,
    register
  } = useAuth();

  const { showToast } = useCart();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }

    if (authMode === 'register' && password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setSubmitting(true);

    try {
      if (authMode === 'register') {
        const data = await register(email.trim(), password, name.trim());

        if (data.session) {
          showToast(`Welcome to SnackSpot, ${name.trim()}!`, 'success');
        } else {
          showToast(
            'Account created! Please check your email to confirm your account.',
            'success'
          );
        }
      } else {
        await login(email.trim(), password);
        showToast(`Welcome back, ${email.split('@')[0]}!`, 'success');
      }

      setPassword('');
      setError('');
    } catch (err) {
      console.error('Authentication error:', err);

      if (err.message?.toLowerCase().includes('invalid login credentials')) {
        setError('Incorrect email or password.');
      } else if (err.message?.toLowerCase().includes('already registered')) {
        setError('This email is already registered. Please sign in.');
      } else if (err.message?.toLowerCase().includes('email not confirmed')) {
        setError('Please confirm your email before signing in.');
      } else {
        setError(err.message || 'Authentication failed. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleModeChange = (mode) => {
    setAuthMode(mode);
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-md bg-[#FFFDF9] rounded-3xl shadow-2xl border border-stone-200 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-6 text-white text-center relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-xl" />

          <button
            type="button"
            onClick={closeAuth}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
            aria-label="Close authentication"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mx-auto mb-2 text-white">
            <Sparkles className="w-6 h-6" />
          </div>

          <h3 className="text-xl font-extrabold">
            {authMode === 'login'
              ? 'Welcome to SnackSpot'
              : 'Join the Snack Club'}
          </h3>

          <p className="text-xs text-orange-100 mt-1">
            {authMode === 'login'
              ? 'Sign in to track orders, earn crunch points, and get exclusive drops.'
              : 'Sign up today and get 15% off your first artisanal snack box!'}
          </p>
        </div>

        <div className="flex border-b border-stone-200 bg-stone-100/60 p-1">
          <button
            type="button"
            onClick={() => handleModeChange('login')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              authMode === 'login'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Sign In
          </button>

          <button
            type="button"
            onClick={() => handleModeChange('register')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              authMode === 'register'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            Create Account
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center my-3 text-stone-400">
            <div className="flex-1 h-px bg-stone-200" />
            <span className="px-3 text-[11px] font-semibold uppercase tracking-wider">
              Continue with email
            </span>
            <div className="flex-1 h-px bg-stone-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {authMode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Priya Nair"
                    className="w-full bg-white border border-stone-200 rounded-xl pl-10 pr-3 py-2 text-xs text-stone-800 focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="w-full bg-white border border-stone-200 rounded-xl pl-10 pr-3 py-2 text-xs text-stone-800 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  minLength={6}
                  autoComplete={
                    authMode === 'login' ? 'current-password' : 'new-password'
                  }
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full bg-white border border-stone-200 rounded-xl pl-10 pr-3 py-2 text-xs text-stone-800 focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl p-3"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-2 py-3 bg-orange-600 hover:bg-orange-700 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-xl text-xs font-bold shadow-md shadow-orange-600/20 transition-all flex items-center justify-center gap-1.5"
            >
              <span>
                {submitting
                  ? 'Please wait...'
                  : authMode === 'login'
                    ? 'Sign In to SnackSpot'
                    : 'Create Free Account'}
              </span>
              {!submitting && <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          </form>

          <p className="text-[11px] text-center text-stone-500 mt-4">
            By proceeding, you agree to SnackSpot's Terms of Service &amp; Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
