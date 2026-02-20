import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  value: number;
  accuracy: number;
  time: string;
};

export const ResultCard = ({ value, accuracy, time }: Props) => {
  return (
    <div className="flex justify-center items-center gap-2 sm:gap-4 w-full px-2">
      {/* Total XP */}
      <div className="rounded-2xl border-4 w-[110px] sm:w-[180px] md:w-[250px] bg-[#ffcc00] border-[#ffcc00]">
        <div className="p-1 text-white rounded-t-xl font-bold text-center uppercase text-[10px] sm:text-xs md:text-sm bg-[#ffcc00]">
          Total XP
        </div>
        <div
          className={cn(
            "rounded-2xl bg-white items-center flex justify-center px-2 py-2 sm:py-4 md:py-6 font-bold text-[12px] sm:text-base md:text-lg text-[#ffcc00]"
          )}
        >
          <Image
            alt="Icon"
            src="/icons/points.svg"
            height={20}
            width={20}
            className="mr-1.5 sm:h-[24px] sm:w-[24px] md:h-[30px] md:w-[30px]"
          />
          {value}
        </div>
      </div>

      {/* Accuracy */}
      <div className="rounded-2xl border-4 w-[110px] sm:w-[180px] md:w-[250px] bg-[#1beb00] border-[#1beb00]">
        <div className="p-1 text-white rounded-t-xl font-bold text-center uppercase text-[10px] sm:text-xs md:text-sm bg-[#1beb00]">
          Accuracy
        </div>
        <div
          className={cn(
            "rounded-2xl bg-white items-center flex justify-center px-2 py-2 sm:py-4 md:py-6 font-bold text-[12px] sm:text-base md:text-lg text-[#1beb00]"
          )}
        >
          <Image
            alt="Icon"
            src="/icons/accuracy.svg"
            height={20}
            width={20}
            className="mr-1.5 sm:h-[24px] sm:w-[24px] md:h-[30px] md:w-[30px]"
          />
          {accuracy}%
        </div>
      </div>

      {/* Time */}
      <div className="rounded-2xl border-4 w-[110px] sm:w-[180px] md:w-[250px] bg-sky-500 border-sky-500">
        <div className="p-1 text-white rounded-t-xl font-bold text-center uppercase text-[10px] sm:text-xs md:text-sm bg-sky-500">
          Time
        </div>
        <div
          className={cn(
            "rounded-2xl bg-white items-center flex justify-center px-2 py-2 sm:py-4 md:py-6 font-bold text-[12px] sm:text-base md:text-lg text-sky-400"
          )}
        >
          <Image
            alt="Icon"
            src="/time.svg"
            height={20}
            width={20}
            className="mr-1.5 sm:h-[24px] sm:w-[24px] md:h-[30px] md:w-[30px]"
          />
          {time}
        </div>
      </div>
    </div>
  );
};