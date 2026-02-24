import { BarChart } from "lucide-react";

const GameStats = async () => {
  return (
    <div className="mt-1 w-full rounded-xl bg-[#2823bd] border-[#141177] p-5 border-2 border-b-[6px] text-white">
      <div className="flex items-center gap-3 mb-4">
        <BarChart size={32} strokeWidth={2.5}/>
        <h3 className="text-2xl font-bold">Stats</h3>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-lg font-bold text-neutral-200">Games Completed:</span>
          <span className="text-lg font-bold text-white">0</span>
        </div>
      </div>
    </div>
  );
};

export default GameStats;