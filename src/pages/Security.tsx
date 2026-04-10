import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Key, 
  Smartphone, 
  Fingerprint,
  CheckCircle2,
  XCircle
} from 'lucide-react'

interface Device {
  id: string
  name: string
  type: 'mobile' | 'desktop' | 'tablet'
  lastActive: Date
  location: string
  isTrusted: boolean
  isCurrent: boolean
}

interface Passkey {
  id: string
  name: string
  type: 'platform' | 'cross-platform'
  lastUsed: Date
  isActive: boolean
}

const mockDevices: Device[] = [
  { id: '1', name: 'iPhone 15 Pro', type: 'mobile', lastActive: new Date(), location: 'New York, USA', isTrusted: true, isCurrent: true },
  { id: '2', name: 'MacBook Pro', type: 'desktop', lastActive: new Date(Date.now() - 3600000), location: 'New York, USA', isTrusted: true, isCurrent: false },
  { id: '3', name: 'iPad Air', type: 'tablet', lastActive: new Date(Date.now() - 86400000), location: 'Remote', isTrusted: false, isCurrent: false },
]

const mockPasskeys: Passkey[] = [
  { id: '1', name: 'MacBook Touch ID', type: 'platform', lastUsed: new Date(Date.now() - 3600000), isActive: true },
  { id: '2', name: 'YubiKey 5 NFC', type: 'cross-platform', lastUsed: new Date(Date.now() - 86400000), isActive: true },
]



export function Security() {
  const [activeTab, setActiveTab] = useState<'overview' | 'devices' | 'keys'>('overview')
  const [securityScore] = useState(85)

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'mobile': return '📱'
      case 'desktop': return '💻'
      case 'tablet': return '📱'
      default: return '📱'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Shield className="w-8 h-8 text-[var(--color-accent-green)]" />
              Security Center
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-[var(--color-text-muted)]">Security Score</p>
              <p className={`text-2xl font-bold ${securityScore >= 80 ? 'text-[var(--color-accent-green)]' : 'text-[var(--color-accent-yellow)]'}`}>
                {securityScore}/100
              </p>
            </div>
            <button className="px-4 py-2 bg-[var(--color-accent-red)]/10 border border-[var(--color-accent-red)]/30 text-[var(--color-accent-red)] rounded-xl text-sm font-medium">
              Emergency Revoke
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-6">
          {[
            { id: 'overview', label: 'Overview', icon: Shield },
            { id: 'devices', label: 'Devices', icon: Smartphone },
            { id: 'keys', label: 'Passkeys', icon: Key },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-[var(--color-accent-cyan)]/20 text-[var(--color-accent-cyan)] border border-[var(--color-accent-cyan)]/30'
                  : 'text-[var(--color-text-muted)] hover:text-white hover:bg-[var(--color-bg-tertiary)]'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 gap-6">
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Security Checklist</h3>
            <div className="space-y-3">
              {[
                { label: 'Two-factor authentication enabled', status: true },
                { label: 'Biometric authentication configured', status: true },
                { label: 'Recovery codes saved', status: false },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-[var(--color-bg-tertiary)] rounded-xl">
                  {item.status ? (
                    <CheckCircle2 className="w-5 h-5 text-[var(--color-accent-green)]" />
                  ) : (
                    <XCircle className="w-5 h-5 text-[var(--color-accent-red)]" />
                  )}
                  <span className={item.status ? 'text-white' : 'text-[var(--color-text-muted)]'}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Active Sessions</h3>
            <div className="space-y-3">
              {mockDevices.slice(0, 2).map((device) => (
                <div key={device.id} className="flex items-center gap-4 p-4 bg-[var(--color-bg-tertiary)] rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-cyan)]/10 flex items-center justify-center text-xl">
                    {getDeviceIcon(device.type)}
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-white">{device.name}</span>
                    {device.isCurrent && <span className="badge badge-cyan text-[10px] ml-2">Current</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {activeTab === 'devices' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card">
          <div className="p-6 border-b border-[var(--color-border)]">
            <h3 className="text-lg font-semibold text-white">Trusted Devices</h3>
          </div>
          <div className="divide-y divide-[var(--color-border)]">
            {mockDevices.map((device) => (
              <div key={device.id} className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-accent-cyan)]/10 flex items-center justify-center text-2xl">
                    {getDeviceIcon(device.type)}
                  </div>
                  <div>
                    <span className="font-semibold text-white">{device.name}</span>
                    <p className="text-sm text-[var(--color-text-muted)]">{device.location}</p>
                  </div>
                </div>
                <button className={`px-4 py-2 text-sm rounded-lg ${device.isTrusted ? 'text-[var(--color-accent-red)]' : 'text-[var(--color-accent-green)]'}`}>
                  {device.isTrusted ? 'Revoke' : 'Trust'}
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'keys' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Your Passkeys</h3>
            <button className="btn-primary flex items-center gap-2">
              <Fingerprint className="w-4 h-4" />
              Add Passkey
            </button>
          </div>
          <div className="space-y-3">
            {mockPasskeys.map((key) => (
              <div key={key.id} className="flex items-center gap-4 p-4 bg-[var(--color-bg-tertiary)] rounded-xl">
                <div className="w-12 h-12 rounded-xl bg-[var(--color-accent-green)]/10 flex items-center justify-center">
                  <Key className="w-6 h-6 text-[var(--color-accent-green)]" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-white">{key.name}</p>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    {key.type === 'platform' ? 'Device biometric' : 'Hardware key'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
