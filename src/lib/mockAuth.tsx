import React, { createContext, useContext, useState } from 'react'

interface MockUser {
  id: string
  email: string
  firstName: string
  lastName: string
  fullName: string
  imageUrl: string
}

interface MockAuthContext {
  isSignedIn: boolean
  isLoaded: boolean
  user: MockUser | null
  signOut: () => void
}

const AuthContext = createContext<MockAuthContext>({
  isSignedIn: true,
  isLoaded: true,
  user: {
    id: 'mock-user-1',
    email: 'demo@privateai.clone',
    firstName: 'Demo',
    lastName: 'User',
    fullName: 'Demo User',
    imageUrl: ''
  },
  signOut: () => {}
})

export const useAuth = () => useContext(AuthContext)
export const useUser = () => ({ user: useContext(AuthContext).user, isLoaded: true })

export const MockAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user] = useState<MockUser>({
    id: 'mock-user-1',
    email: 'demo@privateai.clone',
    firstName: 'Demo',
    lastName: 'User',
    fullName: 'Demo User',
    imageUrl: ''
  })

  return (
    <AuthContext.Provider value={{
      isSignedIn: true,
      isLoaded: true,
      user,
      signOut: () => console.log('Mock sign out')
    }}>
      {children}
    </AuthContext.Provider>
  )
}

// Mock SignIn component
export const SignIn = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-primary)]">
      <div className="glass-card p-8 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Demo Mode</h1>
        <p className="text-[var(--color-text-muted)] mb-6">
          Authentication is disabled in demo mode.
        </p>
        <a href="/dashboard" className="btn-primary">
          Continue to Dashboard
        </a>
      </div>
    </div>
  )
}

// Mock SignUp component  
export const SignUp = SignIn

// Mock ClerkProvider
export const ClerkProvider = ({ children }: { children: React.ReactNode }) => {
  return <MockAuthProvider>{children}</MockAuthProvider>
}
