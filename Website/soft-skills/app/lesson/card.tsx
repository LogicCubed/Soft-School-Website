import { cn } from "@/lib/utils";
import { challenges } from "@/db/schema";
import { useCallback } from "react";
import { useKey } from "react-use";
import { CheckSquare, Square } from "lucide-react";

type Props = {
  id: number;
  text: string;
  shortcut: string;
  selected?: boolean;          // for single select
  selectedIds?: number[];      // for multi-select
  correctIds?: number[];       // for multi-select
  onClick: () => void;
  disabled?: boolean;
  status?: "correct" | "wrong" | "none";
  type: typeof challenges.$inferSelect["type"];
};

export const Card = ({
  id,
  text,
  shortcut,
  selected,
  selectedIds = [],
  correctIds = [],
  onClick,
  disabled,
  status = "none",
  type,
}: Props) => {
  const handleClick = useCallback(() => {
    if (disabled) return;
    onClick();
  }, [disabled, onClick]);

  useKey(shortcut, handleClick, {}, [handleClick]);

  const isMulti = type === "MULTI_SELECT" && status !== "none";
  const isSelectedMulti = selectedIds.includes(id);
  const isCorrectAnswer = correctIds.includes(id);

  // For checkbox color & card coloring, unify selected logic for single and multi
  const isSelected = type === "MULTI_SELECT" ? isSelectedMulti : selected ?? false;

  const borderClass = (() => {
    if (!isMulti) {
      if (selected && status === "correct") return "border-green-300 bg-green-100 hover:bg-green-100";
      if (selected && status === "wrong") return "border-rose-300 bg-rose-100 hover:bg-rose-100";
      if (selected) return "border-sky-300 bg-sky-100 hover:bg-sky-100";
      return "";
    }

    if (status === "correct") {
      if (isSelectedMulti && isCorrectAnswer) return "border-green-300 bg-green-100 hover:bg-green-100";
      if (isSelectedMulti) return "border-sky-300 bg-sky-100 hover:bg-sky-100";
    } else if (status === "wrong") {
      if (isSelectedMulti && isCorrectAnswer) return "border-yellow-400 bg-yellow-100 hover:bg-yellow-100";
      if (isSelectedMulti && !isCorrectAnswer) return "border-rose-300 bg-rose-100 hover:bg-rose-100";
    }

    if (isSelectedMulti) return "border-sky-300 bg-sky-100 hover:bg-sky-100";
    return "";
  })();

  const textClass = (() => {
    if (!isMulti) {
      if (selected && status === "correct") return "text-green-500";
      if (selected && status === "wrong") return "text-rose-500";
      if (selected) return "text-sky-400";
      return "text-neutral-600";
    }

    if (status === "correct") {
      if (isSelectedMulti && isCorrectAnswer) return "text-green-500";
      if (isSelectedMulti) return "text-sky-400";
    } else if (status === "wrong") {
      if (isSelectedMulti && isCorrectAnswer) return "text-yellow-600";
      if (isSelectedMulti && !isCorrectAnswer) return "text-rose-500";
    }

    if (isSelectedMulti) return "text-sky-400";
    return "text-neutral-600";
  })();

  const checkboxColorClass = (() => {
    if (!isSelected) return "text-sky-500";

    if (!isMulti) {
      if (status === "correct") return "text-green-500";
      if (status === "wrong") return "text-rose-500";
      return "text-sky-500";
    }

    if (status === "correct") {
      if (isCorrectAnswer) return "text-green-500";
      return "text-sky-500";
    }
    if (status === "wrong") {
      if (isCorrectAnswer) return "text-yellow-500";
      return "text-rose-500";
    }

    return "text-sky-500";
  })();

  return (
    <div
      onClick={handleClick}
      className={cn(
        "relative",
        "h-full border-2 border-b-4 rounded-xl hover:bg-black/5 p-4 lg:p-6 cursor-pointer transition-transform active:translate-y-[2px]",
        borderClass,
        disabled && "pointer-events-none hover:bg-white"
      )}
    >
      {type === "MULTI_SELECT" && (
        <div className={cn("absolute top-2 left-2", checkboxColorClass)}>
          {isSelected ? <CheckSquare size={18} /> : <Square size={18} />}
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className={cn("text-sm lg:text-base", textClass)}>{text}</p>
      </div>
    </div>
  );
};