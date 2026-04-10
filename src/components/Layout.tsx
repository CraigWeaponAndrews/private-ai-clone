import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useUser, useClerk } from '@clerk/clerk-react'
import { 
  Home, 
  CheckSquare, 
  Calendar, 
  FileText, 
  Video, 
  Shield,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  Sparkles,
  Zap,
  Command
} from 'lucide-react'
import { useState, useEffect } from 'react'

const sidebarItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard', badge: null },
  { icon: MessageSquare, label: 'AI Chat', path: '/ai-chat', badge: 'NEW' },
  { icon: CheckSquare, label: 'Tasks', path: '/tasks', badge: null },
  { icon: Calendar, label: 'Calendar', path: '/calendar', badge: null },
  { icon: FileText, label: 'Notes', path: '/notes', badge: null },
  { icon: Video, label: 'Avatar Studio', path: '/avatar-studio', badge: 'BETA' },
  { icon: Shield, label: 'Security', path: '/security', badge: null },
]

export function Layout() {
  const { user } = useUser()
  const { signOut } = useClerk()
  const navigate = useNavigate()
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [notifications] = useState(3)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] bg-grid flex">
      {/* Sidebar */}
      <motion.aside 
        className="fixed h-full bg-[var(--color-bg-secondary)]/90 backdrop-blur-glass border-r border-[var(--color-border)] z-50"
        initial={false}
        animate={{ width: isCollapsed ? 80 : 280 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Logo */}
        <div className="p-6 border-b border-[var(--color-border)]">
          <Link to="/dashboard" className="flex items-center gap-3">
            <motion.div 
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-accent-cyan)] to-[var(--color-accent-purple)] flex items-center justify-center flex-shrink-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            {!isCollapsed && (
              <motion.span 
                className="font-bold text-lg text-gradient whitespace-nowrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Private AI
              </motion.span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`nav-item w-full relative group ${isActive ? 'active' : ''}`}
              >
                <div className={`relative ${isActive ? 'text-[var(--color-accent-cyan)]' : ''}`}>
                  <item.icon className="w-5 h-5" />
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-6 bg-[var(--color-accent-cyan)] rounded-r-full"
                    />
                  )}
                </div>
                {!isCollapsed && (
                  <>
                    <span className="font-medium whitespace-nowrap">{item.label}</span>
                    {item.badge && (
                      <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.badge === 'NEW' 
                          ? 'bg-[var(--color-accent-cyan)]/20 text-[var(--color-accent-cyan)]' 
                          : 'bg-[var(--color-accent-purple)]/20 text-[var(--color-accent-purple)]'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </>
                )}
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-3 px-3 py-2 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-xl text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                    {item.label}
                    {item.badge && <span className="ml-2 text-[var(--color-accent-cyan)]">{item.badge}</span>}
                  </div>
                )}
              </Link>
            )
          })}
        </nav>

        {/* Collapse Button */}
        <div className="px-3 pb-4">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center p-3 rounded-xl text-[var(--color-text-muted)] hover:text-white hover:bg-[var(--color-bg-tertiary)] transition-all"
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Command className="w-5 h-5" />
            </motion.div>
          </button>
        </div>

        {/* User Section */}
        <div className="p-4 border-t border-[var(--color-border)]">
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 w-full p-2 rounded-xl hover:bg-[var(--color-bg-tertiary)] transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-accent-cyan)]/30 to-[var(--color-accent-purple)]/30 flex items-center justify-center flex-shrink-0 border border-[var(--color-accent-cyan)]/30">
                <span className="text-[var(--color-accent-cyan)] font-semibold">
                  {user?.firstName?.[0] || user?.emailAddresses[0]?.emailAddress[0]?.toUpperCase()}
                </span>
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium text-white truncate">{user?.fullName || 'User'}</p>
                  <p className="text-xs text-[var(--color-text-muted)] truncate">
                    {user?.primaryEmailAddress?.emailAddress}
                  </p>
                </div>
              )}
            </button>

            {/* User Dropdown */}
            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-full mb-2 left-0 right-0 p-2 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-xl shadow-2xl"
                >
                  <Link 
                    to="/settings"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-[var(--color-text-secondary)] hover:text-white hover:bg-[var(--color-bg-secondary)] transition-colors"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Settings className="w-4 h-4" />
                    <span className="text-sm">Settings</span>
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-[var(--color-text-secondary)] hover:text-[var(--color-accent-red)] hover:bg-[var(--color-accent-red)]/10 transition-colors w-full"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Sign out</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main 
        className="flex-1 min-h-screen transition-all duration-300"
        style={{ marginLeft: isCollapsed ? 80 : 280 }}
      >
        {/* Top Bar */}
        <header className="h-16 bg-[var(--color-bg-secondary)]/50 backdrop-blur-glass border-b border-[var(--color-border)] flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-white">
              {sidebarItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
            </h1>
            <div className="h-6 w-px bg-[var(--color-border)]" />
            <div className="text-sm text-[var(--color-text-muted)] terminal-text">
              <span className="text-[var(--color-accent-cyan)]">●</span> {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              <span className="mx-2">|</span>
              {currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {/* AI Status */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-accent-green)]/10 border border-[var(--color-accent-green)]/30">
              <div className="w-2 h-2 rounded-full bg-[var(--color-accent-green)] animate-pulse" />
              <span className="text-xs font-medium text-[var(--color-accent-green)]">AI Online</span>
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-[var(--color-text-muted)] hover:text-white transition-colors rounded-xl hover:bg-[var(--color-bg-tertiary)]">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[var(--color-accent-red)] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </button>

            {/* Quick Action */}
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[var(--color-accent-cyan)]/20 to-[var(--color-accent-purple)]/20 border border-[var(--color-accent-cyan)]/30 rounded-xl text-sm font-medium text-white hover:shadow-[var(--glow-cyan)] transition-all">
              <Zap className="w-4 h-4 text-[var(--color-accent-cyan)]" />
              <span>Quick Action</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="p-8"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  )
}
