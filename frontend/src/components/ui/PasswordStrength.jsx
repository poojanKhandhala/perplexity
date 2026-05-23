import { getPasswordStrength } from '../../features/auth/utils/passwordStrength';

export default function PasswordStrength({ password }) {
  const { label, color, width, checks } = getPasswordStrength(password);

  if (!password) return null;

  return (
    <div className="space-y-2 animate-fade-in-up" aria-live="polite">
      <div className="flex items-center justify-between gap-2">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <div
            className={`h-full rounded-full transition-all duration-500 ${color} ${width}`}
          />
        </div>
        {label && (
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {label}
          </span>
        )}
      </div>
      <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
        {checks.map((check) => (
          <li
            key={check.label}
            className={`text-xs transition-colors ${
              check.met
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-slate-400 dark:text-slate-500'
            }`}
          >
            {check.met ? '✓' : '○'} {check.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
