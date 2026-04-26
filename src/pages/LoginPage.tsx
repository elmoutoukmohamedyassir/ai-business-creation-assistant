import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { GoogleSignInButton } from '../components/ui/GoogleSignInButton';
import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Lock } from 'lucide-react';
import { useAuth, MOCK_USER } from '../context/AuthContext';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Redirect back to the page the user tried to visit, or dashboard
  const from = (location.state as { from?: Location })?.from?.pathname ?? '/dashboard';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (_data: LoginFormValues) => {
    // Simulate API call — replace with: const user = await api.login(data)
    await new Promise((resolve) => setTimeout(resolve, 1200));
    login(MOCK_USER);
    navigate(from, { replace: true });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="space-y-2">
        <h1 className="text-4xl font-black tracking-tighter text-white">IGNITION.</h1>
        <p className="text-slate-400 font-medium">Re-authorize access to your venture workspace.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <div className="relative">
          <Input
            label="Email Address"
            placeholder="name@founders.com"
            type="email"
            autoComplete="email"
            error={errors.email?.message}
            {...register('email')}
            className="pl-12"
          />
          <Mail
            className="absolute left-4 top-[38px] text-slate-500 pointer-events-none"
            size={18}
            aria-hidden="true"
          />
        </div>

        <div className="space-y-2">
          <div className="relative">
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              error={errors.password?.message}
              {...register('password')}
              className="pl-12"
            />
            <Lock
              className="absolute left-4 top-[38px] text-slate-500 pointer-events-none"
              size={18}
              aria-hidden="true"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="text-[10px] font-bold text-slate-500 uppercase tracking-widest hover:text-indigo-400 transition-colors"
            >
              Forgot password?
            </button>
          </div>
        </div>

        <Button
          type="submit"
          loading={isSubmitting}
          className="w-full h-14 text-lg font-black uppercase tracking-widest"
        >
          {!isSubmitting && 'Authorize Launch'}
        </Button>
      </form>

      <div className="relative" aria-hidden="true">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-white/5" />
        </div>
        <div className="relative flex justify-center text-[10px] uppercase font-black">
          <span className="px-4 text-slate-500 tracking-[0.3em] bg-slate-950/80 backdrop-blur-sm rounded">
            Or continue with
          </span>
        </div>
      </div>

      <GoogleSignInButton label="Sign in with Google" />

      <p className="text-center text-sm font-medium text-slate-500">
        New here?{' '}
        <Link
          to="/signup"
          className="font-black text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-widest text-xs"
        >
          Create account
        </Link>
      </p>
    </motion.div>
  );
}