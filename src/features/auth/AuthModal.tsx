import React, { useState } from 'react';
import { X, Eye, EyeOff, Lock, Mail, Heart, CheckCircle2, AlertCircle } from 'lucide-react';
import { LifeBridgeLogo } from '../../components/LifeBridgeLogo';
import { loginUser, registerUser } from '../../lib/storage';
import { User } from '../../types';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'login' | 'signup';
  onClose: () => void;
  onSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'login',
  onClose,
  onSuccess,
}) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (mode === 'signup') {
      if (password !== confirmPassword) {
        setError('Passwords do not match. Please verify both fields.');
        return;
      }
      if (password.length < 6) {
        setError('Password must contain at least 6 characters.');
        return;
      }

      setIsLoading(true);
      setTimeout(() => {
        const res = registerUser(email, password);
        setIsLoading(false);
        if (res.success && res.user) {
          setSuccessMsg('Account created successfully! Welcome to LifeBridge.');
          setTimeout(() => {
            onSuccess(res.user!);
            onClose();
          }, 600);
        } else {
          setError(res.error || 'Registration failed.');
        }
      }, 350);
    } else {
      setIsLoading(true);
      setTimeout(() => {
        const res = loginUser(email, password);
        setIsLoading(false);
        if (res.success && res.user) {
          setSuccessMsg('Signed in successfully.');
          setTimeout(() => {
            onSuccess(res.user!);
            onClose();
          }, 400);
        } else {
          setError(res.error || 'Authentication failed.');
        }
      }, 350);
    }
  };

  const handleDemoFill = () => {
    setEmail('community.helper@lifebridge.org');
    setPassword('lifebridge2026');
    setConfirmPassword('lifebridge2026');
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#18212B]/5 transform transition-all"
        role="dialog"
        aria-modal="true"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#697586] hover:text-[#18212B] hover:bg-slate-100 rounded-full transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Branding */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-2">
            <LifeBridgeLogo size="md" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-[#18212B]">
            {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
          </h2>
          <p className="text-xs sm:text-sm text-[#697586] mt-1.5">
            {mode === 'login'
              ? 'Sign in to submit or manage blood requests and connect with donors'
              : 'Join the community saving lives one drop at a time'}
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex p-1 bg-[#F5F2ED] rounded-xl mb-6">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setError(null);
            }}
            className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              mode === 'login'
                ? 'bg-white text-[#18212B] shadow-sm'
                : 'text-[#697586] hover:text-[#18212B]'
            }`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('signup');
              setError(null);
            }}
            className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              mode === 'signup'
                ? 'bg-white text-[#18212B] shadow-sm'
                : 'text-[#697586] hover:text-[#18212B]'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Error / Success feedback */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-[#E5252A]">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl flex items-start gap-2.5 text-xs text-green-700">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#18212B] mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-[#94A3B8]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E5252A]/40 focus:border-[#E5252A] transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#18212B] mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-[#94A3B8]" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full pl-10 pr-10 py-2.5 text-sm bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E5252A]/40 focus:border-[#E5252A] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-[#94A3B8] hover:text-[#18212B] transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-semibold text-[#18212B] mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-[#94A3B8]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat your password"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-[#E2E8F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#E5252A]/40 focus:border-[#E5252A] transition-all"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-[#E5252A] hover:bg-[#CC1E23] text-white text-sm font-bold rounded-xl transition-all shadow-sm hover:shadow flex items-center justify-center gap-2 mt-2 disabled:opacity-70"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : mode === 'login' ? (
              'Sign In to LifeBridge'
            ) : (
              'Create Free Account'
            )}
          </button>
        </form>

        {/* Demo Helper */}
        <div className="mt-5 pt-4 border-t border-[#F1F5F9] text-center">
          <button
            type="button"
            onClick={handleDemoFill}
            className="text-xs text-[#697586] hover:text-[#E5252A] transition-colors font-medium underline"
          >
            Fill Demo Credentials
          </button>
          <p className="text-[11px] text-[#94A3B8] mt-2">
            LifeBridge protects your privacy. We never share your email address publicly.
          </p>
        </div>
      </div>
    </div>
  );
};
