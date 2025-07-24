import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  explanation: string;
  status?: "correct" | "wrong" | "none";
  streakCount?: number;
  streakThreshold?: number;
};

export const Explanation = ({
  explanation,
  status = "none",
  streakCount = 0,
  streakThreshold = 2,
}: Props) => {
  const imageSrc =
    status === "correct"
      ? "/softy-assets/softyhappy.svg"
      : status === "wrong"
      ? "/softy-assets/softysad.svg"
      : "/softy-assets/softyhappy.svg";

  const showExplanationBox = status === "correct" || status === "wrong";

  const showStreakMessage =
    status === "correct" &&
    streakCount >= streakThreshold;

  const streakText = `That's ${streakCount} in a row!`;

  // State to control if message is rendered
  const [visible, setVisible] = useState(false);
  // State to control animation phase
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    let fadeOutTimeout: ReturnType<typeof setTimeout>;
    let removeTimeout: ReturnType<typeof setTimeout>;

    if (showStreakMessage) {
      setVisible(true);
      // Slight delay before animation start for smoothness (optional)
      setTimeout(() => setAnimate(true), 10);

      // After 2 seconds, start fade out
      fadeOutTimeout = setTimeout(() => setAnimate(false), 2000);
      // After fade out transition (2s), remove from DOM
      removeTimeout = setTimeout(() => setVisible(false), 4000);
    } else {
      // If streak message no longer should show, hide immediately
      setAnimate(false);
      setVisible(false);
    }

    return () => {
      clearTimeout(fadeOutTimeout);
      clearTimeout(removeTimeout);
    };
  }, [showStreakMessage]);

  return (
    <div className="relative flex flex-col items-center min-h-[260px]">
      {visible && (
        <div
          className={cn(
            "absolute -top-10 text-2xl font-bold text-sky-400 origin-bottom-left z-50 select-none whitespace-nowrap",
          )}
          style={{
            transform: animate
              ? "translateY(-40px) rotate(10deg)"
              : "translateY(0) rotate(10deg)",
            opacity: animate ? 1 : 0,
            transition: "transform 2s ease-out, opacity 1s ease-out",
            pointerEvents: "none",
          }}
        >
          {streakText}
        </div>
      )}

      <Image
        src={imageSrc}
        alt="Softy mascot"
        height={128}
        width={128}
        className="mb-4"
        priority
      />

      {showExplanationBox && (
        <div
          className="absolute top-[140px] left-1/2"
          style={{
            width: 300,
            maxWidth: "90vw",
            transform: "translateX(-50%)",
            padding: "0 12px",
          }}
        >
          {/* Triangle */}
          <div
            className={cn(
              "absolute left-1/2 -top-2 w-0 h-0 border-x-8 border-x-transparent border-b-8",
              status === "correct" && "border-b-green-300",
              status === "wrong" && "border-b-rose-300"
            )}
            style={{ transform: "translateX(-50%)" }}
          />
          {/* Textbox */}
          <div
            className={cn(
              "rounded-xl border-2 border-b-4 p-4 w-full text-center",
              status === "correct" && "border-green-300 bg-green-100 text-green-500",
              status === "wrong" && "border-rose-300 bg-rose-100 text-rose-500"
            )}
          >
            {explanation}
          </div>
        </div>
      )}
    </div>
  );
};