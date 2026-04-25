import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useState } from 'react';
import { Loader2, User, Mail, Lock } from 'lucide-react';

const signupSchema = z.object({
  firstName: z.string().min(2, 'First name is too short'),
  lastName: z.string().min(2, 'Last name is too short'),
  email: z.string().email('Please enter a valid work email'),
  password: z.string().min(12, 'Password must be at least 12 characters for maximum security'),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    // Simulate API call
    console.log('Signup attempt:', data);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    navigate('/intake');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="space-y-2">
        <h1 className="text-4xl font-black tracking-tighter text-white uppercase">Genesis.</h1>
        <p className="text-slate-400 font-medium italic">Initiate your neural profile and start building.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <Input 
              label="Core Alias" 
              placeholder="First" 
              error={errors.firstName?.message}
              {...register('firstName')}
              className="pl-12"
            />
            <User className="absolute left-4 top-[42px] text-slate-500" size={18} />
          </div>
          <Input 
            label="&nbsp;" 
            placeholder="Last" 
            error={errors.lastName?.message}
            {...register('lastName')}
          />
        </div>
        
        <div className="relative">
          <Input 
            label="Mission Email" 
            placeholder="jane@founders.com" 
            type="email" 
            error={errors.email?.message}
            {...register('email')}
            className="pl-12"
          />
          <Mail className="absolute left-4 top-[42px] text-slate-500" size={18} />
        </div>

        <div className="relative">
          <Input 
            label="Encryption Secret" 
            type="password" 
            placeholder="Min. 12 characters" 
            error={errors.password?.message}
            {...register('password')}
            className="pl-12"
          />
          <Lock className="absolute left-4 top-[42px] text-slate-500" size={18} />
        </div>
        
        <div className="pt-2">
          <Button type="submit" disabled={isLoading} className="w-full h-14 text-lg font-black uppercase tracking-widest">
            {isLoading ? <Loader2 className="animate-spin mr-2" size={20} /> : 'Establish Nexus'}
          </Button>
        </div>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-white/5"></span></div>
        <div className="relative flex justify-center text-[10px] uppercase font-black"><span className="bg-[#020617] px-4 text-slate-500 tracking-[0.3em]">Synapse Sync</span></div>
      </div>

      <Button variant="outline" className="w-full h-12 flex items-center justify-center gap-3 font-bold">
        <svg width={20} height={20} viewBox="0 0 24 24" className="w-5 h-5"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
        Sign up with Google
      </Button>

      <p className="text-center text-sm font-medium text-slate-500">
        Already registered? {' '}
        <Link to="/login" className="font-black text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-widest text-xs">Re-authenticate</Link>
      </p>

      <p className="text-[10px] text-slate-500 text-center leading-relaxed font-bold uppercase tracking-wider max-w-[280px] mx-auto opacity-40">
        By continuing, you accept the neural <span className="underline">protocols</span> and <span className="underline">privacy manifest</span>.
      </p>
    </motion.div>
  );
}
