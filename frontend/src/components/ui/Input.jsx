import { forwardRef } from 'react';

const Input = forwardRef(function Input(
  {
    id,
    label,
    type = 'text',
    error,
    hint,
    leftIcon: LeftIcon,
    rightElement,
    className = '',
    containerClassName = '',
    ...props
  },
  ref,
) {
  const errorId = error ? `${id}-error` : undefined;
  const hintId = hint ? `${id}-hint` : undefined;

  return (
    <div className={`space-y-1.5 ${containerClassName}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-slate-700 dark:text-slate-200"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {LeftIcon && (
          <LeftIcon
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500"
            aria-hidden="true"
          />
        )}
        <input
          ref={ref}
          id={id}
          type={type}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={[errorId, hintId].filter(Boolean).join(' ') || undefined}
          className={`w-full rounded-xl border bg-white/80 px-4 py-2.5 text-sm text-slate-900 shadow-sm transition-all duration-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 dark:bg-slate-900/60 dark:text-slate-100 dark:placeholder:text-slate-500 ${
            LeftIcon ? 'pl-10' : ''
          } ${rightElement ? 'pr-11' : ''} ${
            error
              ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20 dark:border-red-500'
              : 'border-slate-200 hover:border-slate-300 focus:border-slate-900 focus:ring-slate-900/10 dark:border-slate-700 dark:hover:border-slate-600 dark:focus:border-slate-400 dark:focus:ring-white/10'
          } ${className}`}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
      {hint && !error && (
        <p id={hintId} className="text-xs text-slate-500 dark:text-slate-400">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

export default Input;
