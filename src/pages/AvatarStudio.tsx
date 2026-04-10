import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Video, 
  Mic, 
  Image, 
  Plus,
  Shield,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles
} from 'lucide-react'

interface Avatar {
  id: string
  name: string
  status: 'training' | 'ready' | 'error'
  progress?: number
  thumbnail: string
  createdAt: Date
  assets: { face: number; voice: number }
}

interface Generation {
  id: string
  type: 'video' | 'audio'
  script: string
  status: 'pending' | 'generating' | 'completed'
  createdAt: Date
  cost: number
}

const mockAvatars: Avatar[] = [
  { id: '1', name: 'Professional Avatar', status: 'ready', thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', createdAt: new Date(), assets: { face: 12, voice: 3 } },
  { id: '2', name: 'Casual Avatar', status: 'training', progress: 75, thumbnail: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop', createdAt: new Date(), assets: { face: 8, voice: 2 } },
]

const mockGenerations: Generation[] = [
  { id: '1', type: 'video', script: 'Welcome to our quarterly review...', status: 'completed', createdAt: new Date(Date.now() - 86400000), cost: 2.50 },
  { id: '2', type: 'audio', script: 'Thank you for your email...', status: 'generating', createdAt: new Date(), cost: 0.50 },
  { id: '3', type: 'video', script: 'Hello team, quick update...', status: 'pending', createdAt: new Date(), cost: 3.00 },
]

export function AvatarStudio() {
  const [activeTab, setActiveTab] = useState<'avatars' | 'generate' | 'history'>('avatars')
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar | null>(mockAvatars[0])
  const [script, setScript] = useState('')
  const [generationType, setGenerationType] = useState<'video' | 'audio'>('video')
  const [showConsentModal, setShowConsentModal] = useState(false)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready': return <CheckCircle2 className="w-5 h-5 text-[var(--color-accent-green)]" />
      case 'training': return <Clock className="w-5 h-5 text-[var(--color-accent-yellow)]" />
      case 'error': return <AlertCircle className="w-5 h-5 text-[var(--color-accent-red)]" />
      default: return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ready': return 'badge-low'
      case 'training': return 'badge-high'
      case 'error': return 'badge-urgent'
      default: return 'badge-medium'
    }
  }

  // Using showConsentModal state for future modal implementation
  void showConsentModal;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-accent-purple)] to-[var(--color-accent-pink)] flex items-center justify-center">
                <Video className="w-5 h-5 text-white" />
              </div>
              Avatar Studio
              <span className="badge badge-purple text-xs">BETA</span>
            </h2>
          </div>
          <div className="text-right">
            <p className="text-sm text-[var(--color-text-muted)]">Available Credits</p>
            <p className="text-xl font-bold text-white">$24.50</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-6">
          {[
            { id: 'avatars', label: 'My Avatars', icon: Image },
            { id: 'generate', label: 'Generate', icon: Sparkles },
            { id: 'history', label: 'History', icon: Clock },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-[var(--color-accent-purple)]/20 text-[var(--color-accent-purple)] border border-[var(--color-accent-purple)]/30'
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
      <AnimatePresence mode="wait">
        {activeTab === 'avatars' && (
          <motion.div
            key="avatars"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-3 gap-6"
          >
            <button 
              onClick={() => setShowConsentModal(true)}
              className="glass-card p-8 flex flex-col items-center justify-center min-h-[300px] border-dashed border-2 border-[var(--color-border)] hover:border-[var(--color-accent-cyan)]/50 transition-all"
            >
              <div className="w-16 h-16 rounded-full bg-[var(--color-accent-cyan)]/10 flex items-center justify-center mb-4">
                <Plus className="w-8 h-8 text-[var(--color-accent-cyan)]" />
              </div>
              <p className="text-lg font-semibold text-white mb-2">Create New Avatar</p>
              <p className="text-sm text-[var(--color-text-muted)] text-center">Train your digital twin</p>
            </button>

            {mockAvatars.map((avatar) => (
              <div 
                key={avatar.id}
                onClick={() => setSelectedAvatar(avatar)}
                className={`glass-card overflow-hidden cursor-pointer transition-all ${
                  selectedAvatar?.id === avatar.id ? 'border-[var(--color-accent-purple)]/50' : ''
                }`}
              >
                <div className="relative aspect-square">
                  <img src={avatar.thumbnail} alt={avatar.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-primary)] to-transparent" />
                  <div className="absolute top-3 right-3">{getStatusIcon(avatar.status)}</div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-semibold text-white">{avatar.name}</h3>
                    <span className={`badge ${getStatusBadge(avatar.status)} text-[10px]`}>{avatar.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'generate' && (
          <motion.div
            key="generate"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-2 gap-6"
          >
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Create Content</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-[var(--color-text-muted)] mb-2">Select Avatar</label>
                  <select className="input-field">
                    {mockAvatars.filter(a => a.status === 'ready').map(avatar => (
                      <option key={avatar.id} value={avatar.id}>{avatar.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-[var(--color-text-muted)] mb-2">Content Type</label>
                  <div className="flex gap-3">
                    {[
                      { id: 'video', label: 'Video', icon: Video },
                      { id: 'audio', label: 'Audio Only', icon: Mic },
                    ].map((type) => (
                      <button
                        key={type.id}
                        onClick={() => setGenerationType(type.id as any)}
                        className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border transition-all ${
                          generationType === type.id
                            ? 'border-[var(--color-accent-cyan)] bg-[var(--color-accent-cyan)]/10 text-[var(--color-accent-cyan)]'
                            : 'border-[var(--color-border)] text-[var(--color-text-muted)]'
                        }`}
                      >
                        <type.icon className="w-4 h-4" />
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[var(--color-text-muted)] mb-2">Script</label>
                  <textarea
                    value={script}
                    onChange={(e) => setScript(e.target.value)}
                    placeholder="What would you like your avatar to say?"
                    rows={6}
                    className="input-field resize-none"
                  />
                </div>

                <button disabled={!script.trim()} className="w-full btn-primary">
                  <Sparkles className="w-4 h-4 inline mr-2" />
                  Generate
                </button>
              </div>
            </div>

            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-[var(--color-accent-green)]" />
                Security & Compliance
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-accent-green)]" />
                  <span>C2PA watermark enabled</span>
                </div>
                <div className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--color-accent-green)]" />
                  <span>Your data never trains public models</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'history' && (
          <motion.div
            key="history"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-card"
          >
            <div className="p-6 border-b border-[var(--color-border)]">
              <h3 className="text-lg font-semibold text-white">Generation History</h3>
            </div>
            <div className="p-6">
              {mockGenerations.map((gen) => (
                <div key={gen.id} className="flex items-center justify-between p-4 bg-[var(--color-bg-secondary)] rounded-xl mb-3">
                  <div>
                    <span className={`badge ${gen.type === 'video' ? 'badge-purple' : 'badge-cyan'} text-[10px] mb-2`}>
                      {gen.type}
                    </span>
                    <p className="text-white font-medium">{gen.script.substring(0, 50)}...</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[var(--color-accent-cyan)] font-mono">${gen.cost.toFixed(2)}</p>
                    <span className={`badge ${gen.status === 'completed' ? 'badge-green' : gen.status === 'generating' ? 'badge-yellow' : 'badge-cyan'} text-[10px]`}>
                      {gen.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
