interface AuthAlertProps {
  type: "error" | "success";
  message: string;
}

const styles: Record<string, string> = {
  error:
    "bg-red-500/10 border border-red-500/20 text-red-400",
  success:
    "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400",
};

export default function AuthAlert({ type, message }: AuthAlertProps) {
  if (!message) return null;

  return (
    <div
      className={`${styles[type]} text-xs px-4 py-3 rounded-xl font-medium animate-scaleIn`}
    >
      {message}
    </div>
  );
}
