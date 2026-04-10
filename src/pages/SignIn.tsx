import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Sparkles, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  ArrowRight,
  Shield,
  Fingerprint,
  Chrome,
  Github
} from 'lucide-react'

export function SignIn() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsLoading(false)
    // In real app, this would handle authentication
    window.location.href = '/dashboard'
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] bg-grid flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-cyan)]/5 to-[var(--color-accent-purple)]/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-accent-cyan)]/10 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-accent-cyan)] to-[var(--color-accent-purple)] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gradient">Private AI Clone</span>
          </Link>
        </div>

        <div className="relative z-10 max-w-md">
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
            Your AI Clone.
            <br />
            <span className="text-gradient">Truly Private.</span>
          </h2>
          <p className="text-[var(--color-text-muted)] text-lg mb-8">
            Train your AI on your patterns and data. End-to-end encrypted. 
            Your data never leaves your control.
          </p>
          
          <div className="space-y-4">
            {[
              { icon: Shield, text: 'Enterprise-grade security' },
              { icon: Fingerprint, text: 'Biometric authentication' },
              { icon: Lock, text: 'End-to-end encryption' },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--color-accent-cyan)]/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-[var(--color-accent-cyan)]" />
                </div>
                <span className="text-[var(--color-text-secondary)]">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-sm text-[var(--color-text-muted)]">
          © 2026 Private AI Clone. All rights reserved.
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-accent-cyan)] to-[var(--color-accent-purple)] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-gradient">Private AI Clone</span>
          </div>

          <div className="glass-card p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white mb-2">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h1>
              <p className="text-[var(--color-text-muted)]">
                {isSignUp 
                  ? 'Start your journey with AI that truly knows you' 
                  : 'Sign in to continue your personalized AI experience'}
              </p>
            </div>

            {/* Social Auth */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button className="flex items-center justify-center gap-2 p-3 bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-border-hover)] rounded-xl border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-all">
                <Chrome className="w-5 h-5 text-[var(--color-text-muted)]" />
                <span className="text-sm text-[var(--color-text-secondary)]">Google</span>
              </button>
              <button className="flex items-center justify-center gap-2 p-3 bg-[var(--color-bg-tertiary)] hover:bg-[var(--color-border-hover)] rounded-xl border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-all">
                <Github className="w-5 h-5 text-[var(--color-text-muted)]" />
                <span className="text-sm text-[var(--color-text-secondary)]">GitHub</span>
              </button>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--color-border)]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[var(--color-bg-card)] text-[var(--color-text-muted)]">
                  Or continue with
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-[var(--color-text-muted)] mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="input-field pl-10"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-[var(--color-text-muted)] mb-2">Password</label>
                <div className="relative">
                  <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="input-field pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {!isSignUp && (
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-[var(--color-text-muted)] cursor-pointer">
                    <input type="checkbox" className="rounded border-[var(--color-border)] bg-[var(--color-bg-tertiary)] text-[var(--color-accent-cyan)]" />
                    Remember me
                  </label>
                  <a href="#" className="text-[var(--color-accent-cyan)] hover:underline">
                    Forgot password?
                  </a>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : (
                  <>
                    {isSignUp ? 'Create Account' : 'Sign In'}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-[var(--color-text-muted)]">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-[var(--color-accent-cyan)] hover:underline font-medium"
                >
                  {isSignUp ? 'Sign in' : 'Create one'}
                </button>
              </p>
            </div>

            {/* Trust indicators */}
            <div className="mt-8 pt-6 border-t border-[var(--color-border)]">
              <div className="flex items-center justify-center gap-6 text-xs text-[var(--color-text-muted)]">
                <span className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  SOC 2 Compliant
                </span>
                <span className="flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  GDPR Ready
                </span>
                <span className="flex items-center gap-1">
                  <Fingerprint className="w-3 h-3" />
                  Passkey Ready
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
