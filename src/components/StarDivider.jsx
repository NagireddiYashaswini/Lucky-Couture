import { Star } from "lucide-react";

export default function StarDivider({ light = false, className = "" }) {
  const color = light ? "text-highlight" : "text-accent";
  const line = light ? "bg-highlight/40" : "bg-accent/40";
  return (
    <div className={`flex items-center justify-center gap-2.5 ${className}`}>
      <span className={`h-px w-8 ${line}`} />
      <Star size={13} className={`${color} fill-current`} />
      <span className={`h-px w-8 ${line}`} />
    </div>
  );
}
