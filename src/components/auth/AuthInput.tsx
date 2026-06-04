"use client";

interface AuthInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
}

export default function AuthInput({
  label,
  type,
  value,
  onChange,
  placeholder,
  required,
  autoComplete,
}: AuthInputProps) {
  return (
    <div>
      <label className="block text-[10px] font-bold uppercase tracking-wider text-zinc-500 mb-1.5">
        {label}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        className="w-full bg-[#18191d] border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:border-[#d4af37] focus:outline-none transition-colors"
        placeholder={placeholder}
      />
    </div>
  );
}
