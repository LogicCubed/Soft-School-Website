"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTransition, useContext, createContext, ReactNode } from "react";

type UserPointsContextType = { points: number };
const UserPointsContext = createContext<UserPointsContextType | null>(null);

export const useUserPoints = () => {
  const context = useContext(UserPointsContext);
  if (!context) throw new Error("useUserPoints must be used within UserPointsProvider");
  return context.points;
};

export const UserPointsProvider = ({ points, children }: { points: number; children: ReactNode }) => (
  <UserPointsContext.Provider value={{ points }}>{children}</UserPointsContext.Provider>
);

type ItemProps = {
  name: string;
  cost: number;
  imageSrc: string;
  description: string;
};

export const Item = ({ name, cost, imageSrc, description }: ItemProps) => {
  const userPoints = useUserPoints();
  const canAfford = userPoints >= cost;
  const [pending, startTransition] = useTransition();

  const onPurchase = () => {
    if (!canAfford) return;
    startTransition(() => {
      // TODO: purchase logic
    });
  };

  return (
    <div className="flex items-center w-full p-4 gap-x-4 border-t-2 border-slate-500">
      <Image src={imageSrc} alt={name} height={60} width={60} />
      <div className="flex-1 flex items-center gap-x-4">
        <p className="text-white-700 text-xl font-bold">{name}</p>
        <div className="relative group">
          <Image src="/icons/info.png" alt="info" height={24} width={24} className="cursor-pointer" />
          <div
            className="absolute top-1/2 left-full ml-4 transform -translate-y-1/2
                       border-4 bg-slate-700 border-slate-500 text-white text-left font-semibold
                       px-4 py-2 z-50 rounded opacity-0 group-hover:opacity-100 transition-opacity
                       min-w-40 max-w-75 wrap-break-word"
          >
            <div
              className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-0 h-0 z-0
                         border-t-12 border-b-12 border-r-12 border-t-transparent border-b-transparent border-r-slate-500"
            />
            {description}
          </div>
        </div>
      </div>

        <Button
            onClick={onPurchase}
            disabled={pending || !canAfford}
            variant={canAfford ? undefined : "locked"}
            className="cursor-pointer text-white text-xl bg-green-400 border-green-700 hover:bg-[#52ea89]"
            >
            <div className="flex items-center">
                <Image src="/icons/points.svg" alt="Points" height={20} width={20} />
                <p className="ml-2">{cost} BUY</p>
            </div>
        </Button>
    </div>
  );
};