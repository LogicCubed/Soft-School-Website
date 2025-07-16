import { cn } from "@/lib/utils";
import Image from "next/image";

type Props = {
  explanation: string;
  status?: "correct" | "wrong" | "none";
};

export const Explanation = ({ explanation, status = "none" }: Props) => {
  const imageSrc =
    status === "correct"
      ? "/softy-assets/softyhappy.svg"
      : status === "wrong"
      ? "/softy-assets/softysad.svg"
      : "/softy-assets/softyhappy.svg";

  const showExplanationBox = status === "correct" || status === "wrong";

  return (
    <div className="relative flex flex-col items-center min-h-[260px]">
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
          style={{ width: 300, maxWidth: "90vw", transform: "translateX(-50%)", padding: "0 12px" }}
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