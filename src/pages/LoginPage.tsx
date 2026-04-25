import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { Loader2, Mail, Lock } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    // Simulate API call
    console.log('Login attempt:', data);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    navigate('/dashboard');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="space-y-2">
        <h1 className="text-4xl font-black tracking-tighter text-white">IGNITION.</h1>
        <p className="text-slate-400 font-medium">Re-authorize access to your venture workspace.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="relative">
          <Input 
            label="Neural Identifier" 
            placeholder="name@founders.com" 
            type="email" 
            error={errors.email?.message}
            {...register('email')}
            className="pl-12"
          />
          <Mail className="absolute left-4 top-[42px] text-slate-500" size={18} />
        </div>
        
        <div className="space-y-2">
          <div className="relative">
            <Input 
              label="Security Key" 
              type="password" 
              placeholder="••••••••" 
              error={errors.password?.message}
              {...register('password')}
              className="pl-12"
            />
            <Lock className="absolute left-4 top-[42px] text-slate-500" size={18} />
          </div>
          <div className="flex justify-end">
             <button type="button" className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-indigo-400 transition-colors">Access Recovery?</button>
          </div>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full h-14 text-lg font-black uppercase tracking-widest">
          {isLoading ? <Loader2 className="animate-spin mr-2" size={20} /> : 'Authorize Launch'}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5"></span></div>
        <div className="relative flex justify-center text-[10px] uppercase font-black"><span className="bg-[#020617] px-4 text-slate-500 tracking-[0.3em]">Or use biometrics</span></div>
      </div>

      <Button variant="outline" className="w-full h-12 flex items-center justify-center gap-3 font-bold">
        <svg width={20} height={20} viewBox="0 0 24 24" className="w-5 h-5"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
        Federated Auth (Google)
      </Button>

      <p className="text-center text-sm font-medium text-slate-500">
        New explorer? {' '}
        <Link to="/signup" className="font-black text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-widest text-xs">Initiate Account</Link>
      </p>
    </motion.div>
  );
}
