// Wordmark-only logo — pure text, no image.
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display font-bold tracking-tight ${className}`}>
      Tonu<span className="text-gradient">Soft</span>
    </span>
  );
}
