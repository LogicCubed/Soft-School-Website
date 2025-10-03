import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";
import { useCallback } from "react";

type Props = {
  id: number;
  text: string;
  selected: boolean;
  disabled?: boolean;
  status?: "correct" | "wrong" | "none";
  onClick: () => void;
};

export const TrueFalseCard = ({
  text,
  selected,
  disabled,
  status = "none",
  onClick,
}: Props) => {
  const handleClick = useCallback(() => {
    if (disabled) return;
    onClick();
  }, [disabled, onClick]);

  const borderClass = (() => {
    if (selected && status === "correct") return "border-green-300 bg-green-100 hover:bg-green-100";
    if (selected && status === "wrong") return "border-rose-300 bg-rose-100 hover:bg-rose-100";
    if (selected) return "border-sky-300 bg-sky-100 hover:bg-sky-100";
    return "border-gray-300 bg-white hover:bg-black/5";
  })();

  const textClass = (() => {
    if (selected && status === "correct") return "text-green-500";
    if (selected && status === "wrong") return "text-rose-500";
    if (selected) return "text-sky-400";
    return "text-neutral-600";
  })();

  const iconColorClass = text === "True" ? "text-green-500" : "text-rose-500";

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      type="button"
      className={cn(
        "relative flex flex-col items-center justify-center border-2 border-b-4 rounded-xl cursor-pointer transition-transform active:translate-y-[2px]",
        "w-40 h-40 p-6 select-none",
        borderClass,
        disabled && "pointer-events-none opacity-60"
      )}
      aria-pressed={selected}
      aria-disabled={disabled}
    >
      {text === "True" ? (
        <Check className={cn("w-16 h-16 mb-2", iconColorClass)} />
      ) : (
        <X className={cn("w-16 h-16 mb-2", iconColorClass)} />
      )}
      <span className={cn("text-xl font-semibold", textClass)}>{text}</span>
    </button>
  );
};