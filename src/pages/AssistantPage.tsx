import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Progress } from '../components/ui/Progress';
import { Badge } from '../components/ui/Badge';
import { 
  Send, 
  Sparkles, 
  User, 
  Zap, 
  PieChart, 
  Terminal,
  Paperclip,
  CheckCircle2
} from 'lucide-react';
import { mockMessages, mockBusiness } from '../data/mock';
import { Message } from '../types';
import { cn } from '../utils/cn';

export default function AssistantPage() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Initial placeholder response
    setTimeout(() => {
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "Processing your request through the strategy neural network... Analyzing " + mockBusiness.name + " operational data.",
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const suggestions = [
     "Analyze Berlin competitor pricing",
     "Draft my Series A pitch narrative",
     "Optimize my operational roadmap",
     "Legal requirements for German LLC"
  ];

  return (
    <div className="h-[calc(100vh-10rem)] flex items-stretch gap-8 overflow-hidden">
      {/* Chat Section */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="mb-6 flex items-center justify-between">
           <div className="space-y-1">
              <h1 className="text-4xl font-black text-white italic tracking-tighter uppercase">NEURAL CO-PILOT.</h1>
              <div className="flex items-center gap-2">
                 <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">BizBot-Core 4.0 Alpha Online</span>
              </div>
           </div>
        </header>

        <Card className="flex-1 flex flex-col bg-slate-900/40 border-white/5 rounded-[40px] overflow-hidden backdrop-blur-xl">
           <div className="flex-1 p-8 overflow-y-auto space-y-8 scrollbar-hide">
              <AnimatePresence mode="popLayout">
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={cn(
                      "flex gap-4 max-w-[85%]",
                      m.role === 'user' ? "ml-auto flex-row-reverse" : ""
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border border-white/5",
                      m.role === 'assistant' ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" : "bg-white/5 text-slate-400"
                    )}>
                      {m.role === 'assistant' ? <Sparkles size={18} /> : <User size={18} />}
                    </div>
                    
                    <div className={cn(
                      "p-6 rounded-[28px] text-sm leading-relaxed font-medium relative",
                      m.role === 'assistant' 
                        ? "bg-white/5 text-slate-200 border border-white/5 rounded-tl-none" 
                        : "bg-indigo-600 text-white shadow-xl rounded-tr-none"
                    )}>
                       {m.content}
                       <span className="absolute bottom-[-20px] right-2 text-[8px] font-black text-slate-600 uppercase tracking-widest whitespace-nowrap">
                         {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                       </span>
                    </div>
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }}
                    className="flex gap-4 max-w-[85%]"
                  >
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-indigo-600 text-white border border-white/5">
                      <Sparkles size={18} className="animate-pulse" />
                    </div>
                    <div className="p-6 bg-white/5 border border-white/5 rounded-[28px] rounded-tl-none flex gap-1 items-center">
                       <span className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                       <span className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                       <span className="w-1 h-1 bg-indigo-400 rounded-full animate-bounce" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
           </div>

           {/* Suggestions */}
           <div className="px-8 py-4 flex gap-2 overflow-x-auto scrollbar-hide border-t border-white/5">
              {suggestions.map(s => (
                <button 
                  key={s} 
                  onClick={() => setInput(s)}
                  className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold text-slate-400 hover:text-white hover:border-indigo-500/50 transition-all whitespace-nowrap uppercase tracking-widest"
                >
                  {s}
                </button>
              ))}
           </div>

           {/* Input Area */}
           <div className="p-6 bg-white/[0.02]">
              <div className="relative group">
                 <div className="absolute inset-0 bg-indigo-500/10 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity" />
                 <div className="relative flex items-center gap-3 glass-panel p-2 rounded-2xl border-white/10 group-focus-within:border-indigo-500/50 transition-all">
                    <button className="p-3 text-slate-500 hover:text-white transition-colors">
                       <Paperclip size={20} />
                    </button>
                    <input 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Input strategic commands..." 
                      className="flex-1 bg-transparent border-none text-sm text-white placeholder:text-slate-600 focus:outline-none px-2"
                    />
                    <Button onClick={handleSend} className="w-12 h-12 p-0 flex items-center justify-center rounded-xl bg-indigo-600 hover:bg-indigo-500">
                       <Send size={18} />
                    </Button>
                 </div>
              </div>
           </div>
        </Card>
      </div>

      {/* Context Sidebar */}
      <aside className="w-80 space-y-6 hidden xl:block">
         <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 px-3">Session Metrics</h4>
         <Card className="p-6 space-y-8 bg-indigo-600/5 border-white/5">
            <div className="space-y-4">
               <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                     <PieChart size={16} className="text-indigo-400" />
                     <span className="text-xs font-bold text-slate-400">Memory Usage</span>
                  </div>
                  <span className="text-[10px] font-black text-white">4.2GB / 10GB</span>
               </div>
               <Progress value={42} className="h-1.5" />
            </div>

            <div className="space-y-4">
               <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                     <Zap size={16} className="text-amber-400" />
                     <span className="text-xs font-bold text-slate-400">Latency</span>
                  </div>
                  <span className="text-[10px] font-black text-emerald-400 uppercase">Ultra-Low</span>
               </div>
            </div>

            <div className="pt-6 border-t border-white/5 space-y-4">
                <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Directives Active</h5>
                {['MARKET_ANALYSIS', 'PRICING_OPTIMIZATION', 'RISK_MITIGATION'].map(d => (
                  <div key={d} className="flex items-center gap-2 text-[10px] font-mono font-bold text-slate-400">
                     <Terminal size={12} className="text-indigo-500" />
                     {d}
                  </div>
                ))}
            </div>
         </Card>

         <div className="p-6 space-y-4">
             <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-widest">Active Context</span>
                <Badge variant="outline" className="text-[9px]">LATEST</Badge>
             </div>
             <p className="text-xs text-slate-500 leading-relaxed font-medium">
                I am currently processing your <span className="text-white underline underline-offset-2 decoration-indigo-600">Berlin-Mitte Pilot</span> strategy. All responses will be weighed against German e-commerce regulations.
             </p>
         </div>

         <div className="p-6 rounded-[32px] border border-dashed border-white/5 bg-white/[0.01]">
            <div className="flex items-center gap-2 mb-2">
               <CheckCircle2 size={14} className="text-emerald-500" />
               <h5 className="text-[10px] font-black text-white uppercase tracking-wider">Synced Workspace</h5>
            </div>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none">&bull; Project: {mockBusiness.name}</p>
         </div>
      </aside>
    </div>
  );
}
