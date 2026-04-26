import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { GoogleSignInButton } from '../components/ui/GoogleSignInButton';
import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { User, Mail, Lock } from 'lucide-react';
import { useAuth, MOCK_USER } from '../context/AuthContext';

const signupSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(12, 'Password must be at least 12 characters')
    .regex(/[A-Z]/, 'Must contain an uppercase letter')
    .regex(/[0-9]/, 'Must contain a number'),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    // Simulate API call — replace with: const user = await api.signup(data)
    await new Promise((resolve) => setTimeout(resolve, 1400));
    login({
      id: 'usr_new',
      email: data.email,
      name: `${data.firstName} ${data.lastName}`,
    });
    navigate('/intake');
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="space-y-2">
        <h1 className="text-4xl font-black tracking-tighter text-white uppercase">Genesis.</h1>
        <p className="text-slate-400 font-medium">Create your founder profile and start building.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <Input
              label="First Name"
              placeholder="Jane"
              autoComplete="given-name"
              error={errors.firstName?.message}
              {...register('firstName')}
              className="pl-12"
            />
            <User
              className="absolute left-4 top-[38px] text-slate-500 pointer-events-none"
              size={18}
              aria-hidden="true"
            />
          </div>
          <Input
            label="Last Name"
            placeholder="Founder"
            autoComplete="family-name"
            error={errors.lastName?.message}
            {...register('lastName')}
          />
        </div>

        <div className="relative">
          <Input
            label="Email Address"
            placeholder="jane@founders.com"
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

        <div className="relative">
          <Input
            label="Password"
            type="password"
            placeholder="Min. 12 characters"
            autoComplete="new-password"
            hint="Must be 12+ chars, include uppercase and a number"
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

        <div className="pt-2">
          <Button
            type="submit"
            loading={isSubmitting}
            className="w-full h-14 text-lg font-black uppercase tracking-widest"
          >
            {!isSubmitting && 'Create Account'}
          </Button>
        </div>
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

      <GoogleSignInButton label="Sign up with Google" />

      <p className="text-center text-sm font-medium text-slate-500">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-black text-indigo-400 hover:text-indigo-300 transition-colors uppercase tracking-widest text-xs"
        >
          Sign in
        </Link>
      </p>

      <p className="text-[10px] text-slate-600 text-center leading-relaxed font-medium max-w-[280px] mx-auto">
        By continuing, you accept our{' '}
        <a href="#" className="underline hover:text-slate-400 transition-colors">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="#" className="underline hover:text-slate-400 transition-colors">
          Privacy Policy
        </a>
        .
      </p>
    </motion.div>
  );
}