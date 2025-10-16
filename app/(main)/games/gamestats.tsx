const GameStats = async () => {
  return (
    <div className="mt-1 w-full rounded-xl bg-[#2823bd] border-[#141177] p-5 border-2 border-b-[6px] text-white">
      <h3 className="text-2xl font-bold mb-4">Stats</h3>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-lg font-bold text-neutral-200">Games Completed:</span>
          <span className="text-lg font-bold text-white">0</span>
        </div>

        <div className="flex justify-between">
          <span className="text-lg font-bold text-neutral-200">Current Streak:</span>
          <span className="text-lg font-bold text-white">0</span>
        </div>
      </div>
    </div>
  );
};

export default GameStats;