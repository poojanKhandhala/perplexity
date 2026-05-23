import { Sparkles, Zap, Shield } from 'lucide-react';

const FEATURES = [
  { icon: Zap, text: 'Lightning-fast search across your knowledge base' },
  { icon: Shield, text: 'Enterprise-grade security and privacy' },
  { icon: Sparkles, text: 'AI-powered insights at your fingertips' },
];

export default function AuthBranding({ title, subtitle }) {
  return (
    <div className="relative hidden flex-col justify-between overflow-hidden rounded-3xl bg-slate-900 p-10 text-white lg:flex lg:min-h-[640px]">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/40 via-slate-900 to-violet-900/50" />
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/30 blur-3xl" />
      <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-violet-500/20 blur-3xl" />

      <div className="relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
            <Sparkles className="h-5 w-5 text-indigo-300" />
          </div>
          <span className="text-xl font-bold tracking-tight">Perplexity</span>
        </div>
      </div>

      <div className="relative z-10 space-y-6">
        <div>
          <h1 className="text-3xl font-bold leading-tight tracking-tight xl:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-md text-base leading-relaxed text-slate-300">
            {subtitle}
          </p>
        </div>

        <ul className="space-y-4">
          {FEATURES.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-start gap-3 text-sm text-slate-300">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
                <Icon className="h-4 w-4 text-indigo-300" />
              </span>
              {text}
            </li>
          ))}
        </ul>
      </div>

      <p className="relative z-10 text-xs text-slate-500">
        © {new Date().getFullYear()} Perplexity. All rights reserved.
      </p>
    </div>
  );
}
