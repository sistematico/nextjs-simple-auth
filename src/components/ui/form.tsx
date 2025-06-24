"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";

type FormFieldProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
};

export function FormField({
  label,
  name,
  type = "text",
  required = false,
}: FormFieldProps) {
  const id = React.useId();
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
    if (error) setError(null);
  };

  const onBlur = () => {
    if (required && !value) {
      setError("Este campo é obrigatório.");
    }
  };

  const isTextArea = type === "textarea";

  return (
    <div className="space-y-1">
      <Label htmlFor={id}>{label}</Label>
      {isTextArea ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          className="w-full border rounded px-2 py-1"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          className="w-full border rounded px-2 py-1"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
        />
      )}
      {error && (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
