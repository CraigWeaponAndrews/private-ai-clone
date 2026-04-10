import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  Flag,
  CheckCircle2,
  Circle,
  Tag,
  Trash2,
  Sparkles,
  X
} from 'lucide-react'

interface Task {
  id: string
  title: string
  description?: string
  status: 'pending' | 'in_progress' | 'completed'
  priority: 'urgent' | 'high' | 'medium' | 'low'
  dueDate?: Date
  tags: string[]
  aiGenerated?: boolean
  aiConfidence?: number
}

const mockTasks: Task[] = [
  { id: '1', title: 'Review quarterly report', description: 'Analyze Q4 performance metrics', status: 'pending', priority: 'urgent', dueDate: new Date(), tags: ['work', 'reporting'], aiGenerated: true, aiConfidence: 0.92 },
  { id: '2', title: 'Client call preparation', description: 'Research client background', status: 'in_progress', priority: 'high', dueDate: new Date(Date.now() + 86400000), tags: ['sales', 'client'], aiGenerated: false },
  { id: '3', title: 'Team sync notes', description: 'Document action items', status: 'completed', priority: 'medium', tags: ['meeting'], aiGenerated: false },
  { id: '4', title: 'Update documentation', description: 'Refresh API docs', status: 'pending', priority: 'low', dueDate: new Date(Date.now() + 7 * 86400000), tags: ['dev', 'docs'], aiGenerated: true, aiConfidence: 0.78 },
  { id: '5', title: 'Security audit review', description: 'Review security findings', status: 'pending', priority: 'high', dueDate: new Date(Date.now() + 2 * 86400000), tags: ['security'], aiGenerated: false },
  { id: '6', title: 'Email marketing campaign', description: 'Draft newsletter content', status: 'in_progress', priority: 'medium', tags: ['marketing', 'email'], aiGenerated: true, aiConfidence: 0.85 },
]

const filters = [
  { label: 'All Tasks', value: 'all', count: 6 },
  { label: 'Pending', value: 'pending', count: 3 },
  { label: 'In Progress', value: 'in_progress', count: 2 },
  { label: 'Completed', value: 'completed', count: 1 },
]

export function Tasks() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)

  const filteredTasks = tasks.filter(task => {
    if (selectedFilter !== 'all' && task.status !== selectedFilter) return false
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-[var(--color-accent-red)] bg-[var(--color-accent-red)]/10 border-[var(--color-accent-red)]/30'
      case 'high': return 'text-[var(--color-accent-orange)] bg-[var(--color-accent-orange)]/10 border-[var(--color-accent-orange)]/30'
      case 'medium': return 'text-[var(--color-accent-yellow)] bg-[var(--color-accent-yellow)]/10 border-[var(--color-accent-yellow)]/30'
      default: return 'text-[var(--color-accent-green)] bg-[var(--color-accent-green)]/10 border-[var(--color-accent-green)]/30'
    }
  }

  const toggleTaskStatus = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' as any }
        : task
    ))
  }

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId))
  }

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    urgent: tasks.filter(t => t.priority === 'urgent' && t.status !== 'completed').length,
    aiGenerated: tasks.filter(t => t.aiGenerated).length,
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[var(--color-text-muted)] text-sm">Total Tasks</span>
            <div className="w-8 h-8 rounded-lg bg-[var(--color-accent-cyan)]/20 flex items-center justify-center">
              <Circle className="w-4 h-4 text-[var(--color-accent-cyan)]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[var(--color-text-muted)] text-sm">Completed</span>
            <div className="w-8 h-8 rounded-lg bg-[var(--color-accent-green)]/20 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-[var(--color-accent-green)]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{stats.completed}</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[var(--color-text-muted)] text-sm">Urgent</span>
            <div className="w-8 h-8 rounded-lg bg-[var(--color-accent-red)]/20 flex items-center justify-center">
              <Flag className="w-4 h-4 text-[var(--color-accent-red)]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{stats.urgent}</p>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[var(--color-text-muted)] text-sm">AI Generated</span>
            <div className="w-8 h-8 rounded-lg bg-[var(--color-accent-purple)]/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[var(--color-accent-purple)]" />
            </div>
          </div>
          <p className="text-2xl font-bold text-white">{stats.aiGenerated}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {filters.map(filter => (
              <button
                key={filter.value}
                onClick={() => setSelectedFilter(filter.value)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  selectedFilter === filter.value
                    ? 'bg-[var(--color-accent-cyan)]/20 text-[var(--color-accent-cyan)] border border-[var(--color-accent-cyan)]/30'
                    : 'text-[var(--color-text-muted)] hover:text-white hover:bg-[var(--color-bg-tertiary)]'
                }`}
              >
                {filter.label}
                <span className="ml-2 text-xs opacity-60">{filter.count}</span>
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10 w-64"
              />
            </div>
            <button className="btn-secondary flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button 
              onClick={() => setShowAddModal(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              New Task
            </button>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredTasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass-card p-5 group hover:border-[var(--color-accent-cyan)]/30 transition-all"
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() => toggleTaskStatus(task.id)}
                  className={`mt-0.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                    task.status === 'completed'
                      ? 'bg-[var(--color-accent-green)] border-[var(--color-accent-green)]'
                      : 'border-[var(--color-text-muted)] hover:border-[var(--color-accent-cyan)]'
                  }`}
                >
                  {task.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-white" />}
                </button>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className={`font-semibold text-white ${task.status === 'completed' ? 'line-through text-[var(--color-text-muted)]' : ''}`}>
                        {task.title}
                      </h3>
                      {task.description && (
                        <p className={`text-sm mt-1 ${task.status === 'completed' ? 'text-[var(--color-text-muted)] line-through' : 'text-[var(--color-text-secondary)]'}`}>
                          {task.description}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-3">
                    <span className={`badge ${getPriorityColor(task.priority)}`}>
                      <Flag className="w-3 h-3 mr-1" />
                      {task.priority}
                    </span>
                    
                    {task.dueDate && (
                      <span className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
                        <Calendar className="w-3 h-3" />
                        {task.dueDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    )}
                    
                    {task.tags.map(tag => (
                      <span key={tag} className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                    
                    {task.aiGenerated && (
                      <span className="flex items-center gap-1 text-xs text-[var(--color-accent-purple)]">
                        <Sparkles className="w-3 h-3" />
                        AI ({Math.round(task.aiConfidence! * 100)}%)
                      </span>
                    )}
                  </div>
                </div>

                <button 
                  onClick={() => deleteTask(task.id)}
                  className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-accent-red)] hover:bg-[var(--color-accent-red)]/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add Task Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card w-full max-w-lg p-6"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Create New Task</h2>
                <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-[var(--color-bg-tertiary)] rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <input type="text" placeholder="Task Title" className="input-field" />
                <textarea placeholder="Description" rows={3} className="input-field resize-none" />
                <div className="grid grid-cols-2 gap-4">
                  <select className="input-field">
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                    <option value="urgent">Urgent Priority</option>
                  </select>
                  <input type="date" className="input-field" />
                </div>
                <button className="w-full btn-primary">Create Task</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
