import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import AuthBranding from './AuthBranding';
import ThemeToggle from './ThemeToggle';

export default function AuthLayout({
  children,
  brandingTitle,
  brandingSubtitle,
  footerText,
  footerLinkText,
  footerLinkTo,
}) {
  return (
    <div className="relative min-h-screen overflow-hidden font-sans">
      <ThemeToggle />

      {/* Animated gradient background */}
      <div
        className="animate-gradient-bg absolute inset-0 bg-gradient-to-br from-slate-100 via-indigo-50/80 to-violet-100 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-200/40 via-transparent to-transparent dark:from-indigo-900/20"
        aria-hidden="true"
      />

      <div className="relative flex min-h-screen items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-white/40 bg-white/40 shadow-2xl shadow-slate-900/10 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-900/40 dark:shadow-black/30 lg:grid-cols-2">
          <AuthBranding title={brandingTitle} subtitle={brandingSubtitle} />

          <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
            {/* Mobile logo */}
            <div className="mb-8 flex items-center gap-2 lg:hidden">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">
                Perplexity
              </span>
            </div>

            <div className="animate-slide-in-right">{children}</div>

            {footerText && (
              <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
                {footerText}{' '}
                <Link
                  to={footerLinkTo}
                  className="font-semibold text-slate-900 underline-offset-4 transition hover:underline dark:text-white"
                >
                  {footerLinkText}
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
