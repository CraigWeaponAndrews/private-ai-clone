import { useAuth, useUser } from '@clerk/clerk-react'

// Safe auth hook that handles missing/invalid Clerk keys
export function useAuthSafe() {
  try {
    const auth = useAuth()
    return auth
  } catch (error) {
    // Return mock auth if Clerk fails
    return {
      isSignedIn: true,
      isLoaded: true,
      signOut: () => Promise.resolve(),
    }
  }
}

export function useUserSafe() {
  try {
    const user = useUser()
    return user
  } catch (error) {
    // Return mock user if Clerk fails
    return {
      user: {
        id: 'demo-user',
        firstName: 'Demo',
        lastName: 'User',
        fullName: 'Demo User',
        emailAddresses: [{ emailAddress: 'demo@privateai.clone' }],
        primaryEmailAddress: { emailAddress: 'demo@privateai.clone' },
        imageUrl: '',
      },
      isLoaded: true,
    }
  }
}
