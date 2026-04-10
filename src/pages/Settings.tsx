import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Bell, Lock, Palette, CreditCard, Moon, ToggleLeft, ToggleRight } from 'lucide-react'

const sections = [
  { id: 'profile', title: 'Profile', icon: User },
  { id: 'notifications', title: 'Notifications', icon: Bell },
  { id: 'privacy', title: 'Privacy', icon: Lock },
  { id: 'appearance', title: 'Appearance', icon: Palette },
  { id: 'billing', title: 'Billing', icon: CreditCard },
]

export function Settings() {
  const [activeSection, setActiveSection] = useState('profile')
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    briefing: true,
    tasks: true,
  })
  const [darkMode] = useState(true)

  return (
    <div className="flex h-[calc(100vh-12rem)] -m-8">
      {/* Sidebar */}
      <div className="w-72 bg-[var(--color-bg-secondary)]/50 border-r border-[var(--color-border)] flex flex-col">
        <div className="p-6 border-b border-[var(--color-border)]">
          <h2 className="text-xl font-bold text-white">Settings</h2>
        </div>
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                  activeSection === section.id
                    ? 'bg-[var(--color-accent-cyan)]/10 text-white border border-[var(--color-accent-cyan)]/30'
                    : 'hover:bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)]'
                }`}
              >
                <section.icon className="w-5 h-5" />
                {section.title}
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        {activeSection === 'profile' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Profile Settings</h3>
              <p className="text-[var(--color-text-muted)]">Manage your personal information</p>
            </div>
            
            <div className="glass-card p-6">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--color-accent-cyan)] to-[var(--color-accent-purple)] flex items-center justify-center text-white text-2xl font-bold">
                  D
                </div>
                <div>
                  <h4 className="font-semibold text-white text-lg">Profile Photo</h4>
                  <button className="btn-primary text-sm mt-2">Upload New</button>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 space-y-4">
              <div>
                <label className="block text-sm text-[var(--color-text-muted)] mb-2">Display Name</label>
                <input type="text" defaultValue="Dave" className="input-field" />
              </div>
              <div>
                <label className="block text-sm text-[var(--color-text-muted)] mb-2">Email</label>
                <input type="email" defaultValue="dave@example.com" className="input-field" disabled />
              </div>
              <div>
                <label className="block text-sm text-[var(--color-text-muted)] mb-2">Timezone</label>
                <select className="input-field">
                  <option>UTC-05:00 Eastern Time (ET)</option>
                  <option>UTC-08:00 Pacific Time (PT)</option>
                </select>
              </div>
              <button className="btn-primary w-full">Save Changes</button>
            </div>
          </motion.div>
        )}

        {activeSection === 'notifications' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Notifications</h3>
              <p className="text-[var(--color-text-muted)]">Choose how and when you want to be notified</p>
            </div>
            
            <div className="glass-card p-6 space-y-4">
              {Object.entries({ email: 'Email Notifications', push: 'Push Notifications', briefing: 'Daily AI Briefing', tasks: 'Task Reminders' }).map(([key, label]) => (
                <div key={key} className="flex items-center justify-between p-4 bg-[var(--color-bg-tertiary)] rounded-xl">
                  <span className="text-white">{label}</span>
                  <button
                    onClick={() => setNotifications(prev => ({ ...prev, [key]: !prev[key as keyof typeof notifications] }))}
                    className="text-[var(--color-accent-cyan)]"
                  >
                    {notifications[key as keyof typeof notifications] ? <ToggleRight className="w-10 h-6" /> : <ToggleLeft className="w-10 h-6" />}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeSection === 'appearance' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Appearance</h3>
              <p className="text-[var(--color-text-muted)]">Customize how Private AI looks</p>
            </div>
            
            <div className="glass-card p-6 space-y-6">
              <div className="flex items-center justify-between p-4 bg-[var(--color-bg-tertiary)] rounded-xl">
                <div className="flex items-center gap-3">
                  <Moon className="w-5 h-5 text-[var(--color-text-muted)]" />
                  <span className="text-white">Dark Mode</span>
                </div>
                <button className="text-[var(--color-accent-cyan)]">
                  {darkMode ? <ToggleRight className="w-10 h-6" /> : <ToggleLeft className="w-10 h-6" />}
                </button>
              </div>

              <div>
                <label className="block text-sm text-[var(--color-text-muted)] mb-3">Accent Color</label>
                <div className="flex gap-3">
                  {['#00d4ff', '#a855f7', '#10b981', '#f97316'].map((color) => (
                    <button
                      key={color}
                      className="w-12 h-12 rounded-xl border-2 border-transparent hover:border-white transition-all"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'billing' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-2xl space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Billing</h3>
              <p className="text-[var(--color-text-muted)]">Manage your subscription</p>
            </div>
            
            <div className="gradient-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-[var(--color-accent-cyan)]">Current Plan</p>
                  <h4 className="text-xl font-bold text-white">Professional</h4>
                </div>
                <span className="badge badge-cyan">Active</span>
              </div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-white">$29</span>
                <span className="text-[var(--color-text-muted)]">/month</span>
              </div>
              <button className="btn-secondary w-full">Change Plan</button>
            </div>

            <div className="glass-card p-6">
              <h4 className="font-semibold text-white mb-4">Payment Method</h4>
              <div className="flex items-center gap-4 p-4 bg-[var(--color-bg-tertiary)] rounded-xl">
                <div className="w-12 h-8 rounded bg-gradient-to-r from-[var(--color-accent-purple)] to-[var(--color-accent-pink)]" />
                <div className="flex-1">
                  <p className="font-medium text-white">•••• •••• •••• 4242</p>
                  <p className="text-sm text-[var(--color-text-muted)]">Expires 12/27</p>
                </div>
                <button className="text-sm text-[var(--color-accent-cyan)]">Change</button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
