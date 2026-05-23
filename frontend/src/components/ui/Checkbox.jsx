export default function Checkbox({
  id,
  label,
  description,
  error,
  className = '',
  ...props
}) {
  return (
    <div className={className}>
      <div className="flex items-start gap-3">
        <input
          id={id}
          type="checkbox"
          className="mt-1 h-4 w-4 shrink-0 rounded border-slate-300 text-slate-900 transition focus:ring-2 focus:ring-slate-900/20 focus:ring-offset-0 dark:border-slate-600 dark:bg-slate-800 dark:focus:ring-white/20"
          {...props}
        />
        <div className="flex-1">
          <label
            htmlFor={id}
            className="cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            {label}
          </label>
          {description && (
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {description}
            </p>
          )}
        </div>
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
