import { type TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, id, className = "", ...props }, ref) => {
    const textareaId = id ?? label.toLowerCase().replace(/\s+/g, "-");
    const errorId = `${textareaId}-error`;
    const hintId = `${textareaId}-hint`;

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={textareaId}
          className="text-sm font-medium text-slate-700"
        >
          {label}
          {props.required && (
            <span className="ml-1 text-red-500" aria-hidden="true">
              *
            </span>
          )}
        </label>
        <textarea
          ref={ref}
          id={textareaId}
          aria-describedby={
            [error && errorId, hint && hintId].filter(Boolean).join(" ") ||
            undefined
          }
          aria-invalid={error ? true : undefined}
          className={[
            "w-full resize-y rounded-lg border px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400",
            "transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent",
            error
              ? "border-red-400 bg-red-50 focus:ring-red-500"
              : "border-slate-300 bg-white hover:border-slate-400",
            className,
          ].join(" ")}
          {...props}
        />
        {hint && !error && (
          <p id={hintId} className="text-xs text-slate-500">
            {hint}
          </p>
        )}
        {error && (
          <p id={errorId} role="alert" className="text-xs text-red-600">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
