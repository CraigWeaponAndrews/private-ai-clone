import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Search, 
  Trash2, 
  Edit3,
  Sparkles,
  Lock,
  Share2,
  Download,
  Hash,
  Star,
  Folder,
  Clock
} from 'lucide-react'

interface Note {
  id: string
  title: string
  content: string
  tags: string[]
  isFavorite: boolean
  isEncrypted: boolean
  aiSummary?: string
  createdAt: Date
  updatedAt: Date
  folder?: string
}

const mockNotes: Note[] = [
  {
    id: '1',
    title: 'Q4 Strategic Planning',
    content: 'Key objectives for Q4:\n\n1. Increase revenue by 25%\n2. Launch new product line\n3. Expand to 3 new markets\n4. Hire 10 new team members\n\nAction items:\n- Schedule leadership offsite\n- Review budget allocations\n- Prepare investor deck',
    tags: ['strategy', 'q4', 'planning'],
    isFavorite: true,
    isEncrypted: false,
    aiSummary: 'Quarterly strategic goals focusing on revenue growth and expansion',
    createdAt: new Date(Date.now() - 7 * 86400000),
    updatedAt: new Date(Date.now() - 2 * 86400000),
    folder: 'Work'
  },
  {
    id: '2',
    title: 'Meeting Notes: Product Team',
    content: 'Attendees: Sarah, Mike, John, Lisa\n\nDiscussion points:\n- User feedback from last sprint\n- Feature prioritization\n- Technical debt review\n\nDecisions:\n- Move feature X to next quarter\n- Allocate 2 sprints for refactoring\n- New design system implementation',
    tags: ['meeting', 'product', 'team'],
    isFavorite: false,
    isEncrypted: false,
    aiSummary: 'Product team sync covering user feedback and technical decisions',
    createdAt: new Date(Date.now() - 3 * 86400000),
    updatedAt: new Date(Date.now() - 3 * 86400000),
    folder: 'Work'
  },
  {
    id: '3',
    title: 'Personal Journal - April 2026',
    content: 'This note is encrypted and secure. Only accessible with your passkey.',
    tags: ['personal', 'journal'],
    isFavorite: true,
    isEncrypted: true,
    createdAt: new Date(Date.now() - 1 * 86400000),
    updatedAt: new Date(Date.now() - 1 * 86400000),
  },
  {
    id: '4',
    title: 'API Documentation Ideas',
    content: 'Ideas for improving our API docs:\n\n- Interactive code examples\n- Postman collection integration\n- Better error message documentation\n- Rate limiting explanation\n- Webhook event types\n\nReference: Stripe docs as gold standard',
    tags: ['dev', 'api', 'docs'],
    isFavorite: false,
    isEncrypted: false,
    createdAt: new Date(Date.now() - 5 * 86400000),
    updatedAt: new Date(Date.now() - 5 * 86400000),
    folder: 'Development'
  },
  {
    id: '5',
    title: 'Book Recommendations',
    content: 'Books to read:\n\n1. Atomic Habits - James Clear\n2. The Psychology of Money - Morgan Housel\n3. Zero to One - Peter Thiel\n4. Deep Work - Cal Newport\n5. Thinking in Systems - Donella Meadows\n\nCurrently reading: Range by David Epstein',
    tags: ['personal', 'books', 'learning'],
    isFavorite: false,
    isEncrypted: false,
    createdAt: new Date(Date.now() - 14 * 86400000),
    updatedAt: new Date(Date.now() - 10 * 86400000),
    folder: 'Personal'
  },
]

const folders = ['All Notes', 'Work', 'Personal', 'Development', 'Ideas']

export function Notes() {
  const [notes, setNotes] = useState<Note[]>(mockNotes)
  const [selectedFolder, setSelectedFolder] = useState('All Notes')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredNotes = notes.filter(note => {
    if (selectedFolder !== 'All Notes' && note.folder !== selectedFolder) return false
    if (searchQuery && !note.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const toggleFavorite = (noteId: string) => {
    setNotes(prev => prev.map(note => 
      note.id === noteId ? { ...note, isFavorite: !note.isFavorite } : note
    ))
  }

  const deleteNote = (noteId: string) => {
    setNotes(prev => prev.filter(note => note.id !== noteId))
    if (selectedNote?.id === noteId) setSelectedNote(null)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div className="flex h-[calc(100vh-12rem)] -m-8">
      {/* Sidebar */}
      <div className="w-64 bg-[var(--color-bg-secondary)]/50 border-r border-[var(--color-border)] flex flex-col">
        <div className="p-4">
          <button className="w-full btn-primary flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" />
            New Note
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto custom-scrollbar px-2">
          <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider px-3 mb-2">Folders</p>
          {folders.map((folder) => (
            <button
              key={folder}
              onClick={() => setSelectedFolder(folder)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                selectedFolder === folder
                  ? 'bg-[var(--color-accent-cyan)]/10 text-[var(--color-accent-cyan)]'
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-tertiary)]'
              }`}
            >
              <Folder className="w-4 h-4" />
              {folder}
              <span className="ml-auto text-xs opacity-50">
                {folder === 'All Notes' ? notes.length : notes.filter(n => n.folder === folder).length}
              </span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-[var(--color-border)]">
          <div className="flex items-center gap-3 p-3 bg-[var(--color-accent-cyan)]/10 rounded-xl border border-[var(--color-accent-cyan)]/20">
            <Sparkles className="w-5 h-5 text-[var(--color-accent-cyan)]" />
            <div>
              <p className="text-sm font-medium text-white">AI Summaries</p>
              <p className="text-xs text-[var(--color-text-muted)]">Auto-generated</p>
            </div>
          </div>
        </div>
      </div>

      {/* Notes List */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10 w-full"
            />
          </div>
          <div className="flex items-center gap-2 ml-4">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-[var(--color-accent-cyan)]/20 text-[var(--color-accent-cyan)]' : 'text-[var(--color-text-muted)]'}`}
            >
              <Hash className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notes Grid */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <div className="grid grid-cols-2 gap-4">
            <AnimatePresence>
              {filteredNotes.map((note) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onClick={() => setSelectedNote(note)}
                  className={`glass-card p-5 cursor-pointer transition-all hover:border-[var(--color-accent-cyan)]/30 ${
                    selectedNote?.id === note.id ? 'border-[var(--color-accent-cyan)]/50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {note.isEncrypted && <Lock className="w-4 h-4 text-[var(--color-accent-red)]" />}
                      <h3 className="font-semibold text-white truncate">{note.title}</h3>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(note.id)
                      }}
                      className={`transition-colors ${note.isFavorite ? 'text-[var(--color-accent-yellow)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-accent-yellow)]'}`}
                    >
                      <Star className={`w-4 h-4 ${note.isFavorite ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                  
                  <p className="text-sm text-[var(--color-text-muted)] line-clamp-3 mb-4">
                    {note.isEncrypted ? '🔒 Encrypted content' : note.content}
                  </p>
                  
                  {note.aiSummary && (
                    <div className="flex items-start gap-2 p-3 bg-[var(--color-accent-cyan)]/5 rounded-lg mb-4 border border-[var(--color-accent-cyan)]/10">
                      <Sparkles className="w-4 h-4 text-[var(--color-accent-cyan)] flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-[var(--color-text-secondary)]">{note.aiSummary}</p>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {note.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="badge badge-cyan text-[10px]">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-[var(--color-text-muted)]">
                      {formatDate(note.updatedAt)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Note Editor */}
      <AnimatePresence>
        {selectedNote && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="w-[500px] bg-[var(--color-bg-secondary)] border-l border-[var(--color-border)] flex flex-col"
          >
            <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                {selectedNote.isEncrypted && <Lock className="w-4 h-4 text-[var(--color-accent-red)]" />}
                <span className="text-sm text-[var(--color-text-muted)]">
                  {selectedNote.folder || 'No folder'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-2 text-[var(--color-text-muted)] hover:text-white rounded-lg hover:bg-[var(--color-bg-tertiary)]">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="p-2 text-[var(--color-text-muted)] hover:text-white rounded-lg hover:bg-[var(--color-bg-tertiary)]">
                  <Download className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => deleteNote(selectedNote.id)}
                  className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-accent-red)] rounded-lg hover:bg-[var(--color-accent-red)]/10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setSelectedNote(null)}
                  className="p-2 text-[var(--color-text-muted)] hover:text-white rounded-lg hover:bg-[var(--color-bg-tertiary)]"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              <input
                type="text"
                value={selectedNote.title}
                className="w-full bg-transparent text-2xl font-bold text-white border-none outline-none mb-4"
                placeholder="Note title"
              />
              
              <div className="flex items-center gap-4 text-sm text-[var(--color-text-muted)] mb-6">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Created {formatDate(selectedNote.createdAt)}
                </span>
                <span className="flex items-center gap-1">
                  <Edit3 className="w-3 h-3" />
                  Edited {formatDate(selectedNote.updatedAt)}
                </span>
              </div>
              
              {selectedNote.isEncrypted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-[var(--color-accent-red)]/10 flex items-center justify-center mb-4">
                    <Lock className="w-8 h-8 text-[var(--color-accent-red)]" />
                  </div>
                  <p className="text-[var(--color-text-muted)] mb-4">This note is encrypted</p>
                  <button className="btn-primary">Unlock with Passkey</button>
                </div>
              ) : (
                <textarea
                  value={selectedNote.content}
                  className="w-full h-[calc(100%-100px)] bg-transparent text-[var(--color-text-secondary)] resize-none border-none outline-none font-mono text-sm leading-relaxed"
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
