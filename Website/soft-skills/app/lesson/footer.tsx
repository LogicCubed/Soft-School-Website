"use client";

import { useKey, useMedia } from "react-use";
import { CheckCircle, XCircle, RotateCw, Home as HomeIcon } from "lucide-react";
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
        "lg:-h[140px] h-[100px] border-t-2 transition-colors duration-500 ease-in-out relative",
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
      <div className="max-w-[1140px] h-full mx-auto flex items-center px-6 lg:px-10 relative">
        {(status === "correct" || status === "wrong") && (
          <div
            className={cn(
              "font-bold text-base lg:text-2xl flex items-center text-ellipsis overflow-hidden whitespace-nowrap",
              status === "correct" ? "text-green-500" : "text-rose-500",
              isMobile
                ? "absolute left-6 top-1/2 transform -translate-y-1/2 max-w-[calc(50%)]"
                : "mr-auto"
            )}
            style={{ minWidth: isMobile ? "120px" : undefined }}
          >
            {status === "correct" && (
              <>
                <CheckCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
                {!isMobile && "Good Job!"}
              </>
            )}
            {status === "wrong" && (
              <>
                <XCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
                {!isMobile && "Try Again!"}
              </>
            )}
          </div>
        )}

        {/* Completed buttons with Practice left and Home right */}
        {status === "completed" ? (
          <div className="flex justify-between items-center w-full max-w-[400px] mx-auto">
            {/* Practice Again on far left */}
            <Button
              variant="default"
              className="cursor-pointer flex items-center justify-center gap-2"
              size={isMobile ? "sm" : "lg"}
              onClick={() => (window.location.href = `/lesson/${lessonId}`)}
            >
              <RotateCw className="w-5 h-5" />
              Practice Again
            </Button>

            {/* Home on far right */}
            <Button
              variant="secondary"
              className="cursor-pointer flex items-center justify-center gap-2"
              size={isMobile ? "sm" : "lg"}
              onClick={() => (window.location.href = "/learn")}
            >
              <HomeIcon className="w-5 h-5" />
              Home
            </Button>
          </div>
        ) : (
          <div
            className={cn(
              isMobile
                ? "absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                : "ml-auto"
            )}
          >
            <Button
              disabled={disabled}
              className="cursor-pointer"
              onClick={onCheck}
              size={isMobile ? "lg" : "lg"}
              variant="secondary"
            >
              Check
            </Button>
          </div>
        )}
      </div>
    </footer>
  );
};