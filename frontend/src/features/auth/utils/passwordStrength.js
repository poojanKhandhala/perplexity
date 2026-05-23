const LEVELS = [
  { label: 'Weak', color: 'bg-red-500', width: 'w-1/4' },
  { label: 'Fair', color: 'bg-orange-500', width: 'w-2/4' },
  { label: 'Good', color: 'bg-amber-500', width: 'w-3/4' },
  { label: 'Strong', color: 'bg-emerald-500', width: 'w-full' },
];

export function getPasswordStrength(password) {
  if (!password) return { score: 0, label: '', checks: [], color: '', width: 'w-0' };

  const checks = [
    { met: password.length >= 8, label: 'At least 8 characters' },
    { met: /[a-z]/.test(password), label: 'Lowercase letter' },
    { met: /[A-Z]/.test(password), label: 'Uppercase letter' },
    { met: /\d/.test(password), label: 'Number' },
    { met: /[^a-zA-Z0-9]/.test(password), label: 'Special character' },
  ];

  const score = checks.filter((c) => c.met).length;
  const index = score > 0 ? Math.min(score, 4) - 1 : 0;
  const activeLevel = score > 0 ? LEVELS[index] : LEVELS[0];

  return {
    score,
    label: score === 0 ? '' : activeLevel.label,
    color: activeLevel.color,
    width: score === 0 ? 'w-0' : activeLevel.width,
    checks,
  };
}
