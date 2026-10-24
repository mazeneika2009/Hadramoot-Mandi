import {
  useId,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react';

interface FieldShellProps {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  children: ReactNode;
  required?: boolean;
}

const FieldShell = ({
  label,
  htmlFor,
  error,
  hint,
  children,
  required,
}: FieldShellProps) => (
  <div>
    <label htmlFor={htmlFor} className="field-label">
      {label}
      {required ? <span className="mr-1 text-red-500">*</span> : null}
    </label>
    {children}
    {error ? (
      <p className="field-error" role="alert">
        {error}
      </p>
    ) : hint ? (
      <p className="mt-1.5 text-xs text-night/50">{hint}</p>
    ) : null}
  </div>
);

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const InputField = ({
  label,
  error,
  hint,
  id,
  className = '',
  ...props
}: InputFieldProps) => {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  return (
    <FieldShell
      label={label}
      htmlFor={fieldId}
      error={error}
      hint={hint}
      required={props.required}
    >
      <input
        id={fieldId}
        className={`field-control ${error ? 'border-red-400' : ''} ${className}`}
        aria-invalid={Boolean(error)}
        {...props}
      />
    </FieldShell>
  );
};

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const TextareaField = ({
  label,
  error,
  hint,
  id,
  className = '',
  ...props
}: TextareaFieldProps) => {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  return (
    <FieldShell
      label={label}
      htmlFor={fieldId}
      error={error}
      hint={hint}
      required={props.required}
    >
      <textarea
        id={fieldId}
        className={`field-control min-h-28 resize-y ${error ? 'border-red-400' : ''} ${className}`}
        aria-invalid={Boolean(error)}
        {...props}
      />
    </FieldShell>
  );
};

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: readonly SelectOption[];
  error?: string;
  hint?: string;
}

export const SelectField = ({
  label,
  options,
  error,
  hint,
  id,
  className = '',
  ...props
}: SelectFieldProps) => {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  return (
    <FieldShell
      label={label}
      htmlFor={fieldId}
      error={error}
      hint={hint}
      required={props.required}
    >
      <select
        id={fieldId}
        className={`field-control appearance-none ${error ? 'border-red-400' : ''} ${className}`}
        aria-invalid={Boolean(error)}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
};
