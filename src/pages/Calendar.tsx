import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  MapPin, 
  Video,
  Calendar as CalendarIcon,
  MoreHorizontal
} from 'lucide-react'

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

interface Event {
  id: string
  title: string
  startTime: string
  endTime: string
  type: 'meeting' | 'task' | 'reminder' | 'personal'
  location?: string
  isVideo?: boolean
  color: string
}

const mockEvents: Record<string, Event[]> = {
  '2026-04-10': [
    { id: '1', title: 'Executive Meeting', startTime: '10:00', endTime: '11:00', type: 'meeting', location: 'Conference Room A', color: 'cyan' },
    { id: '2', title: 'Product Review', startTime: '14:00', endTime: '15:30', type: 'meeting', isVideo: true, color: 'purple' },
    { id: '3', title: 'AI Training', startTime: '16:00', endTime: '16:45', type: 'task', color: 'orange' },
  ],
  '2026-04-11': [
    { id: '4', title: 'Client Call', startTime: '09:00', endTime: '10:00', type: 'meeting', isVideo: true, color: 'green' },
    { id: '5', title: 'Team Standup', startTime: '11:00', endTime: '11:30', type: 'meeting', color: 'cyan' },
  ],
}

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 10))
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month')
  const [selectedDate, setSelectedDate] = useState<string>('2026-04-10')

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    
    const days = []
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    return days
  }

  const navigateMonth = (direction: number) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1))
  }

  const formatDateKey = (day: number) => {
    return `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  }

  const getEventColor = (color: string) => {
    const colors: Record<string, string> = {
      cyan: 'bg-[var(--color-accent-cyan)]/20 border-[var(--color-accent-cyan)]/30 text-[var(--color-accent-cyan)]',
      purple: 'bg-[var(--color-accent-purple)]/20 border-[var(--color-accent-purple)]/30 text-[var(--color-accent-purple)]',
      green: 'bg-[var(--color-accent-green)]/20 border-[var(--color-accent-green)]/30 text-[var(--color-accent-green)]',
      orange: 'bg-[var(--color-accent-orange)]/20 border-[var(--color-accent-orange)]/30 text-[var(--color-accent-orange)]',
    }
    return colors[color] || colors.cyan
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-white">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex items-center gap-1">
              <button onClick={() => navigateMonth(-1)} className="p-2 hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors">
                <ChevronLeft className="w-5 h-5 text-[var(--color-text-muted)]" />
              </button>
              <button onClick={() => navigateMonth(1)} className="p-2 hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-colors">
                <ChevronRight className="w-5 h-5 text-[var(--color-text-muted)]" />
              </button>
            </div>
            <button 
              onClick={() => setCurrentDate(new Date())}
              className="px-4 py-2 text-sm font-medium text-[var(--color-accent-cyan)] hover:bg-[var(--color-accent-cyan)]/10 rounded-lg transition-colors"
            >
              Today
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex bg-[var(--color-bg-tertiary)] rounded-xl p-1">
              {(['month', 'week', 'day'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all capitalize ${
                    viewMode === mode
                      ? 'bg-[var(--color-accent-cyan)]/20 text-[var(--color-accent-cyan)]'
                      : 'text-[var(--color-text-muted)] hover:text-white'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
            <button className="btn-primary flex items-center gap-2">
              <Plus className="w-4 h-4" />
              New Event
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="glass-card overflow-hidden">
        {/* Days Header */}
        <div className="grid grid-cols-7 border-b border-[var(--color-border)]">
          {days.map((day) => (
            <div key={day} className="p-4 text-center text-sm font-medium text-[var(--color-text-muted)]">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar Days */}
        <div className="grid grid-cols-7">
          {getDaysInMonth(currentDate).map((day, index) => {
            const dateKey = day ? formatDateKey(day) : ''
            const dayEvents = mockEvents[dateKey] || []
            const isToday = day && dateKey === '2026-04-10'
            const isSelected = dateKey === selectedDate
            
            return (
              <div
                key={index}
                onClick={() => day && setSelectedDate(dateKey)}
                className={`min-h-[120px] p-2 border-r border-b border-[var(--color-border)] last:border-r-0 cursor-pointer transition-colors ${
                  isSelected ? 'bg-[var(--color-accent-cyan)]/5' : 'hover:bg-[var(--color-bg-tertiary)]'
                } ${!day ? 'bg-[var(--color-bg-secondary)]/50' : ''}`}
              >
                {day && (
                  <>
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-sm font-medium w-8 h-8 flex items-center justify-center rounded-full ${
                        isToday 
                          ? 'bg-[var(--color-accent-cyan)] text-white' 
                          : isSelected
                            ? 'text-[var(--color-accent-cyan)]'
                            : 'text-[var(--color-text-secondary)]'
                      }`}>
                        {day}
                      </span>
                    </div>
                    <div className="space-y-1">
                      {dayEvents.slice(0, 3).map((event) => (
                        <div
                          key={event.id}
                          className={`px-2 py-1 rounded text-xs font-medium truncate border ${getEventColor(event.color)}`}
                        >
                          {event.startTime} {event.title}
                        </div>
                      ))}
                      {dayEvents.length > 3 && (
                        <div className="text-xs text-[var(--color-text-muted)] pl-2">
                          +{dayEvents.length - 3} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Selected Day Events */}
      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">
              Events for {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </h3>
            <button className="btn-secondary flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Event
            </button>
          </div>
          
          <div className="space-y-3">
            {(mockEvents[selectedDate] || []).length === 0 ? (
              <div className="text-center py-8 text-[var(--color-text-muted)]">
                <CalendarIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No events scheduled for this day</p>
              </div>
            ) : (
              mockEvents[selectedDate]?.map((event) => (
                <div key={event.id} className={`flex items-center gap-4 p-4 rounded-xl border ${getEventColor(event.color)}`}>
                  <div className="text-center min-w-[60px]">
                    <p className="text-lg font-bold">{event.startTime}</p>
                    <p className="text-xs opacity-60">{event.endTime}</p>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white">{event.title}</h4>
                    <div className="flex items-center gap-4 mt-1 text-sm opacity-80">
                      {event.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </span>
                      )}
                      {event.isVideo && (
                        <span className="flex items-center gap-1">
                          <Video className="w-3 h-3" />
                          Video call
                        </span>
                      )}
                    </div>
                  </div>
                  <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}
