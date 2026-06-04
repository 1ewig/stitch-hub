"use client";

import Link from "next/link";

interface GoldButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  shimmer?: boolean;
  type?: "button" | "submit" | "reset";
}

const sizeStyles: Record<string, string> = {
  sm: "px-5 py-2.5 text-xs",
  md: "px-6 py-3.5 text-sm",
  lg: "px-8 py-4 text-base",
};

export default function GoldButton({
  children,
  onClick,
  href,
  disabled,
  className = "",
  size = "lg",
  loading = false,
  shimmer = true,
  type = "button",
}: GoldButtonProps) {
  const base =
    "relative group overflow-hidden rounded-full font-bold text-black bg-linear-to-r from-[#b38e20] via-[#ebd06f] to-[#b38e20] bg-size-[200%_auto] hover:bg-right transition-all duration-500 flex items-center justify-center disabled:opacity-40 cursor-pointer";

  const btnClass = `${base} ${sizeStyles[size]} shadow-[0_0_30px_rgba(212,175,55,0.3)] ${className}`;

  const content = (
    <>
      {loading ? (
        <div className="flex items-center gap-2">
          <svg className="animate-spin h-5 w-5 text-black" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>{children}</span>
        </div>
      ) : (
        <>
          {shimmer && (
            <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer" />
          )}
          <span>{children}</span>
        </>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={btnClass}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} disabled={disabled} type={type} className={btnClass}>
      {content}
    </button>
  );
}
