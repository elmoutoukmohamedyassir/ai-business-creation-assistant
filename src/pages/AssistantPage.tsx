import React from 'react';
import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Progress } from '../components/ui/Progress';
import { Send, Sparkles, User, Zap, PieChart, Terminal, Paperclip } from 'lucide-react';
import { mockMessages, mockBusiness } from '../data/mock';
import type { Message } from '../types';
import { cn } from '../utils/cn';

const SUGGESTIONS = [
  'Analyze Berlin competitor pricing',
  'Draft my Series A pitch narrative',
  'Optimize my operational roadmap',
  'Legal requirements for German LLC',
] as const;

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: trimmed,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Auto-resize textarea back to default
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    // Placeholder — replace with: const reply = await api.chat(messages, trimmed)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: `Processing your request through the strategy neural network… Analyzing ${mockBusiness.name} operational data. Here is what I recommend based on your current phase and market signals.`,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, assistantMsg]);
    setIsTyping(false);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter sends; Shift+Enter inserts newline
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    // Auto-resize
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`;
  };

  const handleSuggestion = (suggestion: string) => {
    setInput(suggestion);
    textareaRef.current?.focus();
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex items-stretch gap-6 overflow-hidden">
      {/* Chat Section */}
      <section
        className="flex-1 flex flex-col min-w-0"
        aria-label="AI Assistant chat"
      >
        <header className="mb-5 flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-black text-white italic tracking-tighter uppercase">
              Neural Co-Pilot.
            </h1>
            <div className="flex items-center gap-2">
              <span
                className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                aria-hidden="true"
              />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                BizBot-Core 4.0 Alpha Online
              </span>
            </div>
          </div>
        </header>

        <Card className="flex-1 flex flex-col bg-slate-900/40 border-white/5 rounded-[32px] overflow-hidden backdrop-blur-xl">
          {/* Messages */}
          <div
            className="flex-1 p-6 overflow-y-auto space-y-6 scroll-smooth"
            role="log"
            aria-live="polite"
            aria-label="Conversation history"
          >
            <AnimatePresence mode="popLayout">
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={cn(
                    'flex gap-3 max-w-[86%]',
                    m.role === 'user' ? 'ml-auto flex-row-reverse' : ''
                  )}
                >
                  <div
                    className={cn(
                      'w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border border-white/5',
                      m.role === 'assistant'
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                        : 'bg-white/5 text-slate-400'
                    )}
                    aria-hidden="true"
                  >
                    {m.role === 'assistant' ? <Sparkles size={16} /> : <User size={16} />}
                  </div>

                  <div className="space-y-1.5 min-w-0">
                    <div
                      className={cn(
                        'px-5 py-4 rounded-2xl text-sm leading-relaxed font-medium',
                        m.role === 'assistant'
                          ? 'bg-white/5 text-slate-200 border border-white/5 rounded-tl-none'
                          : 'bg-indigo-600 text-white shadow-xl rounded-tr-none'
                      )}
                    >
                      {m.content}
                    </div>
                    <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest px-1">
                      {m.role === 'assistant' ? 'BizBot' : 'You'} ·{' '}
                      {new Date(m.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3 max-w-[86%]"
                  aria-label="Assistant is typing"
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-indigo-600 text-white border border-white/5">
                    <Sparkles size={16} className="animate-pulse" aria-hidden="true" />
                  </div>
                  <div className="px-5 py-4 bg-white/5 border border-white/5 rounded-2xl rounded-tl-none flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion chips */}
          <div
            className="px-6 py-3 flex gap-2 overflow-x-auto border-t border-white/5"
            role="group"
            aria-label="Suggested prompts"
          >
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => handleSuggestion(s)}
                className="px-3 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold text-slate-400 hover:text-white hover:border-indigo-500/50 transition-all whitespace-nowrap uppercase tracking-widest shrink-0"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input area */}
          <div className="p-4 bg-white/[0.02]">
            <div className="relative group">
              <div
                className="absolute inset-0 bg-indigo-500/10 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity"
                aria-hidden="true"
              />
              <div className="relative flex items-end gap-2 glass-panel p-2 rounded-2xl border-white/10 group-focus-within:border-indigo-500/50 transition-all">
                <button
                  type="button"
                  className="p-2.5 text-slate-500 hover:text-white transition-colors shrink-0 self-end mb-0.5"
                  aria-label="Attach file"
                >
                  <Paperclip size={18} aria-hidden="true" />
                </button>

                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={handleTextareaChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Input strategic commands… (Enter to send, Shift+Enter for newline)"
                  rows={1}
                  aria-label="Message input"
                  className="flex-1 bg-transparent border-none text-sm text-white placeholder:text-slate-600 focus:outline-none px-2 resize-none min-h-[40px] max-h-[160px] self-center py-2"
                />

                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  aria-label="Send message"
                  className="w-10 h-10 p-0 rounded-xl shrink-0 self-end"
                >
                  <Send size={16} aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Context Sidebar */}
      <aside
        className="w-72 space-y-5 hidden xl:flex flex-col"
        aria-label="Session information"
      >
        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 px-3">
          Session Metrics
        </h4>

        <Card className="p-5 space-y-6 bg-indigo-600/5 border-white/5">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <PieChart size={15} className="text-indigo-400" aria-hidden="true" />
                <span className="text-xs font-bold text-slate-400">Memory Usage</span>
              </div>
              <span className="text-[10px] font-black text-white">4.2 / 10 GB</span>
            </div>
            <Progress value={42} label="Memory usage: 42%" className="h-1.5" />
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Zap size={15} className="text-amber-400" aria-hidden="true" />
              <span className="text-xs font-bold text-slate-400">Latency</span>
            </div>
            <span className="text-[10px] font-black text-emerald-400 uppercase">Ultra-Low</span>
          </div>

          <div className="pt-4 border-t border-white/5 space-y-3">
            <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-500">
              Active Directives
            </h5>
            {['MARKET_ANALYSIS', 'PRICING_OPTIMIZATION', 'RISK_MITIGATION'].map((d) => (
              <div key={d} className="flex items-center gap-2 text-[10px] font-mono font-bold text-slate-400">
                <Terminal size={11} className="text-indigo-500" aria-hidden="true" />
                {d}
              </div>
            ))}
          </div>
        </Card>

        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white uppercase tracking-widest">
              Active Context
            </span>
            <Badge variant="outline" className="text-[9px]">
              LIVE
            </Badge>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            Currently processing your{' '}
            <span className="text-white underline underline-offset-2 decoration-indigo-600">
              Berlin-Mitte Pilot
            </span>{' '}
            strategy. Responses are weighted against German e-commerce regulations.
          </p>
        </div>

        <div className="p-4 rounded-[24px] border border-dashed border-white/5 bg-white/[0.01]">
          <p className="text-[10px] font-bold text-white uppercase tracking-wider mb-1">
            Synced Workspace
          </p>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
            · {mockBusiness.name}
          </p>
        </div>
      </aside>
    </div>
  );
}