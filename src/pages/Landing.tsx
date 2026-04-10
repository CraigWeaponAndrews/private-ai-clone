import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Sparkles, Shield, Brain, Video, CheckSquare, ArrowRight, Lock, Globe,
  Zap, Cpu, Fingerprint, ChevronDown, Play, X
} from 'lucide-react'

const features = [
  { 
    icon: Brain, 
    title: 'Neural Memory', 
    description: 'Your AI Clone builds a living memory graph of your life, learning patterns and predicting needs before you ask.',
    color: 'cyan',
    stats: '10M+ memories indexed'
  },
  { 
    icon: Video, 
    title: 'Avatar Studio', 
    description: 'Generate cinema-quality video content with your digital twin. C2PA authenticated. Blockchain-verified.',
    color: 'purple',
    stats: '4K 60fps output'
  },
  { 
    icon: CheckSquare, 
    title: 'Autonomous Tasks', 
    description: 'AI agents that execute complex workflows across your tools. From email to code deployment.',
    color: 'green',
    stats: '500+ integrations'
  },
  { 
    icon: Shield, 
    title: 'Zero-Knowledge', 
    description: 'Your data is encrypted with keys only you possess. We cannot see, share, or sell your information. Ever.',
    color: 'pink',
    stats: 'AES-256 encryption'
  },
]

const stats = [
  { value: '99.99%', label: 'Uptime SLA', suffix: '' },
  { value: '50', label: 'ms Latency', suffix: 'ms' },
  { value: '0', label: 'Data Breaches', suffix: '' },
  { value: '10M+', label: 'AI Interactions', suffix: '' },
]

const testimonials = [
  { 
    name: 'Sarah Chen', 
    role: 'CEO, TechStart', 
    content: 'Private AI Clone handles 80% of my executive workload. It knows my preferences better than my actual assistant.',
    avatar: 'SC',
    metric: '40hrs saved/week'
  },
  { 
    name: 'Marcus Johnson', 
    role: 'Engineering Lead', 
    content: 'The code generation is scary good. It writes in my style, follows our patterns, and never leaks proprietary code.',
    avatar: 'MJ',
    metric: '3x productivity'
  },
  { 
    name: 'Emily Rodriguez', 
    content: 'I create a week of content in 2 hours. My avatar presents while I focus on strategy. Game changer.',
    role: 'Content Creator',
    avatar: 'ER',
    metric: '10x output'
  },
]

const pricingPlans = [
  { 
    name: 'Starter', 
    price: '0', 
    period: 'forever free',
    description: 'Experience the future of personal AI',
    features: [
      '1,000 AI interactions/month',
      'Basic neural memory',
      'Task automation',
      'End-to-end encryption',
      'Community support'
    ],
    cta: 'Start Free',
    popular: false,
  },
  { 
    name: 'Professional', 
    price: '29', 
    period: '/month',
    description: 'For professionals who demand the best',
    features: [
      'Unlimited AI interactions',
      'Advanced neural memory',
      'Avatar Studio (1080p)',
      'Priority compute',
      'API access',
      'Custom integrations',
      'Priority support'
    ],
    cta: 'Start 14-Day Trial',
    popular: true,
  },
  { 
    name: 'Enterprise', 
    price: 'Custom', 
    period: '',
    description: 'For organizations that need scale',
    features: [
      'Everything in Professional',
      'Team collaboration',
      'Custom AI training',
      'On-premise deployment',
      'Dedicated infrastructure',
      '24/7 white-glove support',
      'SLA guarantees'
    ],
    cta: 'Contact Sales',
    popular: false,
  },
]

function ParticleBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[var(--color-accent-cyan)] rounded-full"
          initial={{ 
            x: Math.random() * 100 + '%', 
            y: Math.random() * 100 + '%',
            opacity: 0 
          }}
          animate={{ 
            y: [null, Math.random() * 100 + '%'],
            opacity: [0, 0.5, 0]
          }}
          transition={{ 
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
          style={{
            boxShadow: '0 0 10px var(--color-accent-cyan)'
          }}
        />
      ))}
    </div>
  )
}

function FloatingOrbs() {
  return (
    <>
      <motion.div 
        className="absolute top-20 left-10 w-72 h-72 bg-[var(--color-accent-cyan)]/10 rounded-full blur-[100px]"
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-96 h-96 bg-[var(--color-accent-purple)]/10 rounded-full blur-[120px]"
        animate={{ 
          scale: [1.2, 1, 1.2],
          x: [0, -30, 0],
          y: [0, -50, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--color-accent-pink)]/5 rounded-full blur-[150px]"
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 180, 360]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
    </>
  )
}

export function Landing() {
  const [showVideo, setShowVideo] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const { scrollYProgress } = useScroll()
  useTransform(scrollYProgress, [0, 1], [0, -100])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] relative overflow-hidden">
      <ParticleBackground />
      <FloatingOrbs />
      
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg-primary)]/80 backdrop-blur-xl border-b border-[var(--color-border)]"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-accent-cyan)] via-[var(--color-accent-purple)] to-[var(--color-accent-pink)] flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 180 }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <span className="font-bold text-xl text-gradient">Private AI Clone</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            {['Features', 'Security', 'Pricing', 'Docs'].map((item) => (
              <motion.a 
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[var(--color-text-muted)] hover:text-white transition-colors relative group"
                whileHover={{ y: -2 }}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[var(--color-accent-cyan)] to-[var(--color-accent-purple)] group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link to="/sign-in" className="text-[var(--color-text-muted)] hover:text-white transition-colors">
              Sign In
            </Link>
            <Link to="/sign-in" className="btn-primary flex items-center gap-2">
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-32 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent-cyan)]/10 border border-[var(--color-accent-cyan)]/30 text-[var(--color-accent-cyan)] text-sm font-medium mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-accent-cyan)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-accent-cyan)]"></span>
            </span>
            Now with GPT-5 integration
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold text-white mb-8 leading-[1.1] tracking-tight"
          >
            Your Digital Twin.
            <br />
            <span className="text-gradient">Infinite Possibilities.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-[var(--color-text-secondary)] mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Train an AI that thinks like you, works like you, and scales your impact 
            while keeping your data locked in a vault only you can open.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            <Link to="/sign-in" className="btn-primary text-lg px-8 py-4 flex items-center gap-2">
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </Link>
            <button 
              onClick={() => setShowVideo(true)}
              className="btn-secondary text-lg px-8 py-4 flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              Watch Demo
            </button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-16 flex items-center justify-center gap-12 flex-wrap"
          >
            {[
              { icon: Shield, text: 'SOC 2 Type II' },
              { icon: Lock, text: 'GDPR Compliant' },
              { icon: Fingerprint, text: 'Passkey Ready' },
              { icon: Cpu, text: 'Local AI' },
            ].map((item, index) => (
              <motion.div 
                key={index}
                className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <item.icon className="w-4 h-4 text-[var(--color-accent-cyan)]" />
                {item.text}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6 text-[var(--color-text-muted)]" />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 border-y border-[var(--color-border)] bg-[var(--color-bg-secondary)]/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-bold text-gradient mb-2">{stat.value}</p>
                <p className="text-[var(--color-text-muted)]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[var(--color-accent-cyan)] text-sm font-medium uppercase tracking-wider">Capabilities</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              One AI. <span className="text-gradient">Every Task.</span>
            </h2>
            <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto">
              From managing your calendar to creating Hollywood-quality videos, 
              your AI Clone handles it all with privacy at its core.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-8 hover:border-[var(--color-accent-cyan)]/30 transition-all group card-shine"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-[var(--color-accent-${feature.color})]/10`}>
                    <feature.icon className={`w-7 h-7 text-[var(--color-accent-${feature.color})]`} />
                  </div>
                  <span className="text-xs text-[var(--color-text-muted)] font-mono">{feature.stats}</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-[var(--color-text-muted)]">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 px-6 bg-[var(--color-bg-secondary)]/30">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[var(--color-accent-purple)] text-sm font-medium uppercase tracking-wider">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
              Trusted by <span className="text-gradient">Leaders</span>
            </h2>
          </motion.div>
          
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="glass-card p-10 text-center"
              >
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Zap key={i} className="w-5 h-5 text-[var(--color-accent-yellow)] fill-current" />
                  ))}
                </div>
                <p className="text-xl md:text-2xl text-[var(--color-text-secondary)] mb-8 leading-relaxed">
                  "{testimonials[activeTestimonial].content}"
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--color-accent-cyan)] to-[var(--color-accent-purple)] flex items-center justify-center text-white text-lg font-bold">
                    {testimonials[activeTestimonial].avatar}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-white">{testimonials[activeTestimonial].name}</p>
                    <p className="text-sm text-[var(--color-text-muted)]">{testimonials[activeTestimonial].role}</p>
                  </div>
                  <div className="ml-6 pl-6 border-l border-[var(--color-border)]">
                    <p className="text-[var(--color-accent-green)] font-mono text-sm">{testimonials[activeTestimonial].metric}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeTestimonial === index 
                      ? 'w-8 bg-[var(--color-accent-cyan)]' 
                      : 'bg-[var(--color-border)] hover:bg-[var(--color-border-hover)]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-[var(--color-accent-green)] text-sm font-medium uppercase tracking-wider">Pricing</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6">
              Simple. <span className="text-gradient">Transparent.</span>
            </h2>
            <p className="text-[var(--color-text-secondary)] text-lg max-w-2xl mx-auto">
              Start free, upgrade when you need more power. No hidden fees.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6 items-start">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`glass-card p-8 relative ${
                  plan.popular ? 'border-[var(--color-accent-cyan)]/50 scale-105 z-10' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="badge badge-cyan">Most Popular</span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                  <p className="text-sm text-[var(--color-text-muted)] mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-1">
                    {plan.price !== 'Custom' && <span className="text-[var(--color-text-muted)]">$</span>}
                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                    <span className="text-[var(--color-text-muted)]">{plan.period}</span>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-[var(--color-text-secondary)]">
                      <span className="w-5 h-5 rounded-full bg-[var(--color-accent-green)]/20 flex items-center justify-center">
                        <span className="text-[var(--color-accent-green)] text-xs">✓</span>
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}>
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-accent-cyan)]/5 to-transparent" />
        <motion.div 
          className="max-w-4xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Meet Your
            <br />
            <span className="text-gradient">Digital Twin?</span>
          </h2>
          <p className="text-xl text-[var(--color-text-secondary)] mb-10 max-w-2xl mx-auto">
            Join thousands of professionals who have already cloned themselves. 
            Your first 14 days are free.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link to="/sign-in" className="btn-primary text-lg px-10 py-5">
              Start Free Trial
            </Link>
            <button className="btn-secondary text-lg px-10 py-5">
              Talk to Sales
            </button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-16 px-6 bg-[var(--color-bg-secondary)]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--color-accent-cyan)] to-[var(--color-accent-purple)] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl text-gradient">Private AI Clone</span>
              </div>
              <p className="text-[var(--color-text-muted)] text-sm">
                Your private AI double. Organized, protected, and under your control.
              </p>
            </div>
            
            {[
              { title: 'Product', links: ['Features', 'Security', 'Pricing', 'Changelog'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Press'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Security', 'Cookies'] },
            ].map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold text-white mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a href="#" className="text-[var(--color-text-muted)] hover:text-white transition-colors text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-8 border-t border-[var(--color-border)] flex items-center justify-between flex-wrap gap-4">
            <p className="text-[var(--color-text-muted)] text-sm">
              © 2026 Private AI Clone. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {[
                { icon: Shield, text: 'SOC 2' },
                { icon: Lock, text: 'GDPR' },
                { icon: Globe, text: 'Open Source' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
                  <item.icon className="w-4 h-4" />
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setShowVideo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-video bg-[var(--color-bg-secondary)] rounded-2xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowVideo(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </button>
              <div className="w-full h-full flex items-center justify-center text-[var(--color-text-muted)]">
                <div className="text-center">
                  <Play className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Demo video coming soon</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}