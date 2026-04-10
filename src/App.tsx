import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Landing } from './pages/Landing'
import { SignIn } from './pages/SignIn'
import { Dashboard } from './pages/Dashboard'
import { Tasks } from './pages/Tasks'
import { Calendar } from './pages/Calendar'
import { Notes } from './pages/Notes'
import { AvatarStudio } from './pages/AvatarStudio'
import { Security } from './pages/Security'
import { AIChat } from './pages/AIChat'
import { Settings } from './pages/Settings'
import { Layout } from './components/Layout'

// Check if we have a valid Clerk key
const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || ''
const hasValidClerkKey = clerkKey.startsWith('pk_') && clerkKey.length > 20

// Demo user for when Clerk is not configured
const demoUser = {
  id: 'demo-user',
  firstName: 'Demo',
  lastName: 'User',
  fullName: 'Demo User',
  emailAddresses: [{ emailAddress: 'demo@privateai.clone' }],
  primaryEmailAddress: { emailAddress: 'demo@privateai.clone' },
  imageUrl: '',
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  // If no valid Clerk key, bypass auth completely
  if (!hasValidClerkKey) {
    return <>{children}</>
  }

  // Otherwise use real Clerk auth
  try {
    const { isSignedIn, isLoaded } = useAuth()
    
    if (!isLoaded) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-primary)] bg-grid">
          <motion.div 
            className="relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-20 h-20 rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-accent-cyan)]" />
            <div className="absolute inset-0 w-20 h-20 rounded-full border-2 border-transparent border-t-[var(--color-accent-purple)] animate-spin" style={{ animationDuration: '2s' }} />
            <div className="absolute inset-2 w-16 h-16 rounded-full border-2 border-transparent border-t-[var(--color-accent-pink)] animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }} />
          </motion.div>
        </div>
      )
    }
    
    if (!isSignedIn) {
      return <Navigate to="/sign-in" replace />
    }
    
    return <>{children}</>
  } catch (error) {
    // If Clerk fails, bypass auth
    console.warn('Clerk auth failed, running in demo mode')
    return <>{children}</>
  }
}

function AnimatedRoutes() {
  const location = useLocation()
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/sign-in" element={hasValidClerkKey ? <SignIn /> : <Navigate to="/dashboard" replace />} />
        <Route element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/avatar-studio" element={<AvatarStudio />} />
          <Route path="/security" element={<Security />} />
          <Route path="/ai-chat" element={<AIChat />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return <AnimatedRoutes />
}

export default App
export { hasValidClerkKey, demoUser }
