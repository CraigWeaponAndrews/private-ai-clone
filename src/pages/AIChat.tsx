import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Send, 
  Sparkles, 
  Mic, 
  Paperclip, 
  Image, 
  Code,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  Bot,
  User
} from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  isLoading?: boolean
  attachments?: Attachment[]
  codeBlocks?: CodeBlock[]
}

interface Attachment {
  type: 'image' | 'file'
  name: string
  url?: string
}

interface CodeBlock {
  language: string
  code: string
}

const quickPrompts = [
  { icon: Sparkles, text: 'Generate daily briefing', color: 'cyan' },
  { icon: Code, text: 'Help me code', color: 'purple' },
  { icon: Mic, text: 'Voice memo summary', color: 'green' },
  { icon: Image, text: 'Analyze this image', color: 'orange' },
]

const sampleConversations = [
  { id: '1', title: 'Q4 Planning Strategy', preview: 'Let\'s break down the quarterly goals...', date: 'Today' },
  { id: '2', title: 'Code Review Help', preview: 'Here\'s how to optimize that function...', date: 'Yesterday' },
  { id: '3', title: 'Meeting Prep', preview: 'Key points to cover in tomorrow\'s...', date: '2 days ago' },
]

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! I\'m your AI Clone, designed to learn from your patterns and assist you throughout your day. I can help with tasks, schedule management, coding, analysis, and much more. What would you like to work on?',
      timestamp: new Date(),
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')

    // Simulate AI response
    const loadingMessage: Message = {
      id: 'loading',
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isLoading: true,
    }

    setMessages(prev => [...prev, loadingMessage])

    setTimeout(() => {
      setMessages(prev => prev.filter(m => m.id !== 'loading'))
      
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateResponse(inputValue),
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, aiResponse])
    }, 1500)
  }

  const generateResponse = (input: string): string => {
    const lowerInput = input.toLowerCase()
    if (lowerInput.includes('task') || lowerInput.includes('todo')) {
      return "I've analyzed your task list. You have 3 high-priority items for today:\n\n1. **Review quarterly report** - Due today, urgent priority\n2. **Client call preparation** - High priority, due tomorrow\n3. **Team sync notes** - Already completed ✓\n\nBased on your calendar, I recommend tackling the quarterly report first as you have a 2-hour focused block starting at 9 AM. Would you like me to create a detailed breakdown for any of these tasks?"
    }
    if (lowerInput.includes('schedule') || lowerInput.includes('calendar')) {
      return "Here's your schedule for today:\n\n**10:00 AM** - Executive Meeting (1 hour)\n**2:00 PM** - Product Review (1.5 hours)\n**4:00 PM** - AI Training Session (45 minutes)\n\nI've noticed you typically need 15-minute buffers between meetings. Would you like me to block those windows automatically?"
    }
    if (lowerInput.includes('code') || lowerInput.includes('programming')) {
      return "I'd be happy to help with coding! I can:\n\n• Review and optimize your code\n• Explain complex algorithms\n• Generate boilerplate code\n• Debug errors\n• Suggest best practices\n\nWhat language or framework are you working with today?"
    }
    return "I understand. I'm here to help you with whatever you need. Based on your recent activity, I can see you've been focusing on productivity and task management. Would you like me to:\n\n• Generate a daily briefing\n• Help organize your tasks\n• Analyze your productivity patterns\n• Or something else?"
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] -m-8">
      {/* Sidebar */}
      <div className="w-72 bg-[var(--color-bg-secondary)]/50 border-r border-[var(--color-border)] flex flex-col">
        <div className="p-4 border-b border-[var(--color-border)]">
          <button className="w-full btn-primary flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            New Conversation
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <p className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider mb-3">Recent</p>
          <div className="space-y-2">
            {sampleConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv.id)}
                className={`w-full text-left p-3 rounded-xl transition-all ${
                  selectedConversation === conv.id 
                    ? 'bg-[var(--color-accent-cyan)]/10 border border-[var(--color-accent-cyan)]/30' 
                    : 'hover:bg-[var(--color-bg-tertiary)]'
                }`}
              >
                <p className="font-medium text-white text-sm mb-1">{conv.title}</p>
                <p className="text-xs text-[var(--color-text-muted)] truncate">{conv.preview}</p>
                <p className="text-[10px] text-[var(--color-text-muted)] mt-2">{conv.date}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-[var(--color-border)]">
          <div className="flex items-center gap-3 p-3 bg-[var(--color-bg-tertiary)] rounded-xl">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-accent-cyan)] to-[var(--color-accent-purple)] flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">AI Clone</p>
              <p className="text-xs text-[var(--color-text-muted)]">Personalized for you</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-6">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-accent-cyan)] to-[var(--color-accent-purple)] flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}
                
                <div className={`max-w-[70%] ${message.role === 'user' ? 'order-1' : ''}`}>
                  <div className={message.role === 'user' ? 'chat-message-user' : 'chat-message-ai'}>
                    {message.isLoading ? (
                      <div className="flex items-center gap-2 py-2">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                          className="w-2 h-2 rounded-full bg-[var(--color-accent-cyan)]"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          className="w-2 h-2 rounded-full bg-[var(--color-accent-cyan)]"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                          className="w-2 h-2 rounded-full bg-[var(--color-accent-cyan)]"
                        />
                      </div>
                    ) : (
                      <div className="prose prose-invert max-w-none">
                        {message.content.split('\n').map((line, i) => (
                          <p key={i} className={line.startsWith('**') ? 'font-semibold text-[var(--color-accent-cyan)]' : ''}>
                            {line.replace(/\*\*/g, '')}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {!message.isLoading && message.role === 'assistant' && (
                    <div className="flex items-center gap-2 mt-2 ml-1">
                      <button 
                        onClick={() => copyToClipboard(message.content)}
                        className="p-1.5 text-[var(--color-text-muted)] hover:text-white hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-all"
                        title="Copy"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-accent-green)] hover:bg-[var(--color-accent-green)]/10 rounded-lg transition-all" title="Helpful">
                        <ThumbsUp className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-accent-red)] hover:bg-[var(--color-accent-red)]/10 rounded-lg transition-all" title="Not helpful">
                        <ThumbsDown className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-[var(--color-text-muted)] hover:text-white hover:bg-[var(--color-bg-tertiary)] rounded-lg transition-all" title="Regenerate">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {message.role === 'user' && (
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-accent-purple)]/20 flex items-center justify-center flex-shrink-0 order-2">
                    <User className="w-5 h-5 text-[var(--color-accent-purple)]" />
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        {messages.length < 3 && (
          <div className="px-8 mb-4">
            <p className="text-sm text-[var(--color-text-muted)] mb-3">Quick actions</p>
            <div className="flex gap-3">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => setInputValue(prompt.text)}
                  className={`flex items-center gap-2 px-4 py-2 bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-xl hover:border-[var(--color-accent-${prompt.color})]/50 transition-all`}
                >
                  <prompt.icon className={`w-4 h-4 text-[var(--color-accent-${prompt.color})]`} />
                  <span className="text-sm text-[var(--color-text-secondary)]">{prompt.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-6 border-t border-[var(--color-border)]">
          <div className="relative max-w-4xl mx-auto">
            <div className="flex items-end gap-2 p-4 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] rounded-2xl focus-within:border-[var(--color-accent-cyan)]/50 focus-within:shadow-[var(--glow-cyan)] transition-all">
              <button className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-accent-cyan)] transition-colors rounded-lg hover:bg-[var(--color-bg-tertiary)]">
                <Paperclip className="w-5 h-5" />
              </button>
              
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Message your AI Clone..."
                rows={1}
                className="flex-1 bg-transparent border-none outline-none resize-none text-white placeholder-[var(--color-text-muted)] min-h-[24px] max-h-[200px]"
                style={{ height: 'auto' }}
              />
              
              <button 
                onClick={() => setIsRecording(!isRecording)}
                className={`p-2 rounded-lg transition-colors ${isRecording ? 'text-[var(--color-accent-red)] bg-[var(--color-accent-red)]/10 animate-pulse' : 'text-[var(--color-text-muted)] hover:text-[var(--color-accent-cyan)] hover:bg-[var(--color-bg-tertiary)]'}`}
              >
                <Mic className="w-5 h-5" />
              </button>
              
              <button
                onClick={handleSend}
                disabled={!inputValue.trim()}
                className="p-2 bg-gradient-to-r from-[var(--color-accent-cyan)] to-[var(--color-accent-purple)] rounded-xl text-white hover:shadow-[var(--glow-cyan)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            
            <p className="text-center text-xs text-[var(--color-text-muted)] mt-3">
              AI Clone can make mistakes. Please verify important information.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
