import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  CheckSquare, 
  Calendar, 
  TrendingUp,
  Clock,
  Sparkles,
  Target,
  Brain,
  Zap,
  MessageSquare,
  Plus,
  ArrowRight
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'

const activityData = [
  { day: 'Mon', tasks: 12, ai: 5 },
  { day: 'Tue', tasks: 19, ai: 8 },
  { day: 'Wed', tasks: 15, ai: 12 },
  { day: 'Thu', tasks: 25, ai: 15 },
  { day: 'Fri', tasks: 22, ai: 18 },
  { day: 'Sat', tasks: 8, ai: 10 },
  { day: 'Sun', tasks: 10, ai: 14 },
]

const stats = [
  { label: 'Tasks Completed', value: '247', change: '+12%', icon: CheckSquare, color: 'cyan' },
  { label: 'AI Interactions', value: '1,832', change: '+28%', icon: MessageSquare, color: 'purple' },
  { label: 'Time Saved', value: '42h', change: '+18%', icon: Clock, color: 'green' },
  { label: 'Productivity Score', value: '94', change: '+5%', icon: TrendingUp, color: 'orange' },
]

const tasks = [
  { id: 1, title: 'Review quarterly report', priority: 'urgent', completed: false, time: 'Due today', category: 'Work' },
  { id: 2, title: 'Client call preparation', priority: 'high', completed: false, time: 'Due tomorrow', category: 'Sales' },
  { id: 3, title: 'Team sync notes', priority: 'medium', completed: true, time: 'Completed', category: 'Meeting' },
  { id: 4, title: 'Update documentation', priority: 'low', completed: false, time: 'Due next week', category: 'Dev' },
]

const events = [
  { id: 1, title: 'Executive Meeting', time: '10:00 AM', duration: '1h', type: 'meeting' },
  { id: 2, title: 'Product Review', time: '2:00 PM', duration: '1.5h', type: 'review' },
  { id: 3, title: 'AI Training Session', time: '4:00 PM', duration: '45m', type: 'training' },
]

const quickActions = [
  { icon: MessageSquare, label: 'Ask AI', description: 'Get instant help', color: 'cyan', path: '/ai-chat' },
  { icon: Plus, label: 'New Task', description: 'Add to-do item', color: 'purple', path: '/tasks' },
  { icon: CheckSquare, label: 'Quick Note', description: 'Capture idea', color: 'green', path: '/notes' },
  { icon: Calendar, label: 'Schedule', description: 'Book meeting', color: 'orange', path: '/calendar' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export function Dashboard() {
  const [greeting, setGreeting] = useState('')
  const [briefing, setBriefing] = useState('')

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good morning')
    else if (hour < 18) setGreeting('Good afternoon')
    else setGreeting('Good evening')

    setBriefing('Based on your calendar and task history, I recommend focusing on the quarterly report first. You have 3 high-priority items today and your productivity typically peaks around 10 AM.')
  }, [])

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'badge-urgent'
      case 'high': return 'badge-high'
      case 'medium': return 'badge-medium'
      default: return 'badge-low'
    }
  }

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Welcome & Briefing */}
      <motion.div variants={itemVariants} className="gradient-border rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent-cyan)]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[var(--color-accent-purple)]/5 rounded-full blur-3xl" />
        
        <div className="relative">
          <h2 className="text-2xl font-bold text-white mb-1">
            {greeting}, <span className="text-gradient">Dave</span> 👋
          </h2>
          <p className="text-[var(--color-text-muted)] mb-4">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-accent-cyan)]/20 to-[var(--color-accent-purple)]/20 flex items-center justify-center flex-shrink-0 border border-[var(--color-accent-cyan)]/30">
              <Brain className="w-6 h-6 text-[var(--color-accent-cyan)]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[var(--color-accent-cyan)]" />
                Daily AI Briefing
              </h3>
              <p className="text-[var(--color-text-secondary)] leading-relaxed max-w-3xl">{briefing}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card stat-card-hover">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-[var(--color-accent-${stat.color})]/20`}>
                <stat.icon className={`w-6 h-6 text-[var(--color-accent-${stat.color})]`} />
              </div>
              <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-[var(--color-accent-green)]' : 'text-[var(--color-accent-red)]'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
            <p className="text-sm text-[var(--color-text-muted)]">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link key={index} to={action.path} className="stat-card group hover:border-[var(--color-accent-cyan)]/30 transition-all">
              <div className={`w-14 h-14 rounded-xl bg-[var(--color-accent-${action.color})]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <action.icon className={`w-7 h-7 text-[var(--color-accent-${action.color})]`} />
              </div>
              <p className="font-semibold text-white mb-1">{action.label}</p>
              <p className="text-sm text-[var(--color-text-muted)]">{action.description}</p>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Tasks */}
        <motion.div variants={itemVariants} className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-[var(--color-accent-cyan)]" />
              Priority Tasks
            </h3>
            <Link to="/tasks" className="text-sm text-[var(--color-accent-cyan)] hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center gap-4 p-4 bg-[var(--color-bg-secondary)] rounded-xl border border-[var(--color-border)]">
                <button className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                  task.completed ? 'bg-[var(--color-accent-green)] border-[var(--color-accent-green)]' : 'border-[var(--color-text-muted)]'
                }`}>
                  {task.completed && <span className="text-white text-xs">✓</span>}
                </button>
                <div className="flex-1">
                  <p className={`font-medium ${task.completed ? 'line-through text-[var(--color-text-muted)]' : 'text-white'}`}>{task.title}</p>
                  <span className={`badge ${getPriorityColor(task.priority)} text-[10px] mt-1`}>{task.priority}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Calendar */}
        <motion.div variants={itemVariants} className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[var(--color-accent-purple)]" />
              Today's Schedule
            </h3>
            <Link to="/calendar" className="text-sm text-[var(--color-accent-cyan)] hover:underline flex items-center gap-1">
              Full calendar <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {events.map((event) => (
              <div key={event.id} className="flex items-center gap-4 p-4 bg-[var(--color-bg-secondary)] rounded-xl border-l-4 border-[var(--color-accent-cyan)]">
                <div className="text-center min-w-[60px]">
                  <p className="text-[var(--color-accent-cyan)] font-semibold">{event.time.split(' ')[0]}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">{event.time.split(' ')[1]}</p>
                </div>
                <div>
                  <p className="font-medium text-white">{event.title}</p>
                  <p className="text-sm text-[var(--color-text-muted)]">{event.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Activity Chart */}
        <motion.div variants={itemVariants} className="glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-[var(--color-accent-orange)]" />
              Weekly Activity
            </h3>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00d4ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#71717a" fontSize={12} />
                <YAxis stroke="#71717a" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a25', border: '1px solid #27273a', borderRadius: '8px' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="tasks" stroke="#00d4ff" fillOpacity={1} fill="url(#colorTasks)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
