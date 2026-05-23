import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import SocialButton from '../components/SocialButton';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Checkbox from '../../../components/ui/Checkbox';
import { useToast } from '../../../context/ToastContext';
import { validateEmail, validatePassword } from '../utils/validation';

export default function Login() {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [touched, setTouched] = useState({});
  const [form, setForm] = useState({
    email: '',
    password: '',
    remember: false,
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const next = {
      email: validateEmail(form.email),
      password: validatePassword(form.password),
    };
    setErrors(next);
    return !Object.values(next).some(Boolean);
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === 'email') {
      setErrors((prev) => ({ ...prev, email: validateEmail(form.email) }));
    }
    if (field === 'password') {
      setErrors((prev) => ({ ...prev, password: validatePassword(form.password) }));
    }
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      if (field === 'email') {
        setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
      }
      if (field === 'password') {
        setErrors((prev) => ({ ...prev, password: validatePassword(value) }));
      }
    }
  };

  const simulateSubmit = async (callback) => {
    await new Promise((r) => setTimeout(r, 1200));
    callback();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!validate()) return;

    setLoading(true);
    try {
      await simulateSubmit(() => {
        toast('Welcome back! You have signed in successfully.', 'success');
      });
    } catch {
      toast('Something went wrong. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try {
      await simulateSubmit(() => {
        toast('Google sign-in is not configured yet.', 'info');
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <AuthLayout
      brandingTitle="Welcome back"
      brandingSubtitle="Sign in to continue exploring insights, managing your workspace, and collaborating with your team."
      footerText="Don't have an account?"
      footerLinkText="Create one"
      footerLinkTo="/register"
    >
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Sign in
        </h2>
        <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
          Enter your credentials to access your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <Input
          id="login-email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          value={form.email}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          error={touched.email ? errors.email : ''}
          leftIcon={Mail}
        />

        <Input
          id="login-password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          placeholder="••••••••"
          value={form.password}
          onChange={(e) => handleChange('password', e.target.value)}
          onBlur={() => handleBlur('password')}
          error={touched.password ? errors.password : ''}
          leftIcon={Lock}
          rightElement={
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          }
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <Checkbox
            id="remember-me"
            label="Remember me"
            checked={form.remember}
            onChange={(e) => setForm((prev) => ({ ...prev, remember: e.target.checked }))}
          />
          <Link
            to="/forgot-password"
            className="text-sm font-medium text-slate-600 underline-offset-4 transition hover:text-slate-900 hover:underline dark:text-slate-400 dark:hover:text-white"
          >
            Forgot password?
          </Link>
        </div>

        <Button type="submit" size="lg" loading={loading}>
          Sign in
        </Button>

        <div className="relative py-1">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-slate-200 dark:border-slate-700" />
          </div>
          <p className="relative mx-auto w-fit bg-transparent px-3 text-xs font-medium uppercase tracking-wider text-slate-400 dark:bg-slate-900/0 dark:text-slate-500">
            or
          </p>
        </div>

        <SocialButton onClick={handleGoogle} loading={googleLoading} />
      </form>
    </AuthLayout>
  );
}
