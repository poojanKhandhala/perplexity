import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import SocialButton from '../components/SocialButton';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Checkbox from '../../../components/ui/Checkbox';
import PasswordStrength from '../../../components/ui/PasswordStrength';
import { useToast } from '../../../context/ToastContext';
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateUsername,
  validateRequiredCheckbox,
} from '../utils/validation';

function PasswordToggle({ show, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 dark:hover:bg-slate-800 dark:hover:text-slate-200"
      aria-label={show ? 'Hide password' : 'Show password'}
    >
      {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
    </button>
  );
}

export default function Register() {
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [touched, setTouched] = useState({});
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const next = {
      username: validateUsername(form.username),
      email: validateEmail(form.email),
      password: validatePassword(form.password),
      confirmPassword: validateConfirmPassword(form.password, form.confirmPassword),
      terms: validateRequiredCheckbox(
        form.terms,
        'You must accept the Terms & Conditions',
      ),
    };
    setErrors(next);
    return !Object.values(next).some(Boolean);
  };

  const fieldValidators = {
    username: () => validateUsername(form.username),
    email: () => validateEmail(form.email),
    password: () => validatePassword(form.password),
    confirmPassword: () =>
      validateConfirmPassword(form.password, form.confirmPassword),
    terms: () =>
      validateRequiredCheckbox(form.terms, 'You must accept the Terms & Conditions'),
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: fieldValidators[field]() }));
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    if (!touched[field] && field !== 'password') return;

    setErrors((prev) => {
      const next = { ...prev };
      if (field === 'username') next.username = validateUsername(value);
      if (field === 'email') next.email = validateEmail(value);
      if (field === 'password') {
        next.password = validatePassword(value);
        if (touched.confirmPassword) {
          next.confirmPassword = validateConfirmPassword(value, form.confirmPassword);
        }
      }
      if (field === 'confirmPassword') {
        next.confirmPassword = validateConfirmPassword(form.password, value);
      }
      return next;
    });
  };

  const handleCheckbox = (checked) => {
    setForm((prev) => ({ ...prev, terms: checked }));
    if (touched.terms) {
      setErrors((prev) => ({
        ...prev,
        terms: validateRequiredCheckbox(
          checked,
          'You must accept the Terms & Conditions',
        ),
      }));
    }
  };

  const simulateSubmit = async (callback) => {
    await new Promise((r) => setTimeout(r, 1200));
    callback();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({
      username: true,
      email: true,
      password: true,
      confirmPassword: true,
      terms: true,
    });
    if (!validate()) return;

    setLoading(true);
    try {
      await simulateSubmit(() => {
        toast('Account created successfully! Welcome aboard.', 'success');
      });
    } catch {
      toast('Registration failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try {
      await simulateSubmit(() => {
        toast('Google sign-up is not configured yet.', 'info');
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <AuthLayout
      brandingTitle="Start your journey"
      brandingSubtitle="Create an account to unlock powerful search, AI assistance, and seamless team collaboration."
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLinkTo="/login"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Create account
        </h2>
        <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
          Fill in your details to get started
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Input
          id="register-username"
          label="Username"
          type="text"
          autoComplete="username"
          placeholder="johndoe"
          value={form.username}
          onChange={(e) => handleChange('username', e.target.value)}
          onBlur={() => handleBlur('username')}
          error={touched.username ? errors.username : ''}
          leftIcon={User}
        />

        <Input
          id="register-email"
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

        <div className="space-y-2">
          <Input
            id="register-password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="••••••••"
            value={form.password}
            onChange={(e) => handleChange('password', e.target.value)}
            onBlur={() => handleBlur('password')}
            error={touched.password ? errors.password : ''}
            leftIcon={Lock}
            rightElement={
              <PasswordToggle
                show={showPassword}
                onToggle={() => setShowPassword((s) => !s)}
              />
            }
          />
          <PasswordStrength password={form.password} />
        </div>

        <Input
          id="register-confirm-password"
          label="Confirm password"
          type={showConfirm ? 'text' : 'password'}
          autoComplete="new-password"
          placeholder="••••••••"
          value={form.confirmPassword}
          onChange={(e) => handleChange('confirmPassword', e.target.value)}
          onBlur={() => handleBlur('confirmPassword')}
          error={touched.confirmPassword ? errors.confirmPassword : ''}
          leftIcon={Lock}
          rightElement={
            <PasswordToggle
              show={showConfirm}
              onToggle={() => setShowConfirm((s) => !s)}
            />
          }
        />

        <Checkbox
          id="terms"
          checked={form.terms}
          onChange={(e) => handleCheckbox(e.target.checked)}
          onBlur={() => handleBlur('terms')}
          error={touched.terms ? errors.terms : ''}
          label={
            <>
              I agree to the{' '}
              <Link
                to="/terms"
                className="font-semibold text-slate-900 underline-offset-2 hover:underline dark:text-white"
              >
                Terms & Conditions
              </Link>
            </>
          }
        />

        <Button type="submit" size="lg" loading={loading} className="mt-2">
          Create account
        </Button>

        <div className="relative py-1">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-slate-200 dark:border-slate-700" />
          </div>
          <p className="relative mx-auto w-fit px-3 text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
            or
          </p>
        </div>

        <SocialButton onClick={handleGoogle} loading={googleLoading} />
      </form>
    </AuthLayout>
  );
}
