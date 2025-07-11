import { useKey, useMedia } from "react-use";
import { CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type Props = {
  onCheck: () => void;
  status: "correct" | "wrong" | "none" | "completed";
  disabled?: boolean;
  lessonId?: number;
  showWrongFeedback?: boolean;
};

export const Footer = ({
  onCheck,
  status,
  disabled,
  lessonId,
}: Props) => {
  useKey("Enter", onCheck, {}, [onCheck]);
  const isMobile = useMedia("(max-width: 1024px)");

  return (
    <footer
      className={cn(
        "lg:-h[140px] h-[100px] border-t-2 transition-colors duration-500 ease-in-out",
        status === "correct" && "border-transparent bg-green-100",
        status === "wrong" && "border-transparent bg-rose-100",
        (status === "none" || status === "completed") && "bg-transparent border-gray-200"
      )}
      style={{
        transitionProperty: "background-color, border-color",
        transitionDuration: "500ms",
        transitionTimingFunction: "ease-in-out",
      }}
    >
      <div className="max-w-[1140px] h-full mx-auto flex items-center justify-between px-6 lg:px-10">
        {status === "correct" && (
          <div className="text-green-500 font-bold text-base lg:text-2xl flex items-center">
            <CheckCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
            Good Job!
          </div>
        )}
        {status === "wrong" && (
          <div className="text-rose-500 font-bold text-base lg:text-2xl flex items-center">
            <XCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
            Try Again!
          </div>
        )}

        {status === "completed" ? (
          <>
            <Button
              variant="default"
              className="cursor-pointer mr-4"
              size={isMobile ? "sm" : "lg"}
              onClick={() => window.location.href = `/lesson/${lessonId}`}
            >
              Practice Again
            </Button>
            <Button
              variant="secondary"
              className="cursor-pointer"
              size={isMobile ? "sm" : "lg"}
              onClick={() => window.location.href = "/learn"}
            >
              Home
            </Button>
          </>
        ) : (
          <Button
            disabled={disabled}
            className="ml-auto cursor-pointer"
            onClick={onCheck}
            size={isMobile ? "sm" : "lg"}
            variant="secondary"
          >
            Check
          </Button>
        )}
      </div>
    </footer>
  );
};