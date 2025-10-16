const PuzzleStats = async () => {
  return (
    <div className="mt-1 w-full rounded-xl bg-[#f34689] border-[#b01c55] p-5 border-2 border-b-[6px] text-white">
      <h3 className="text-2xl font-bold mb-4">Stats</h3>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-lg font-bold text-neutral-200">Puzzles Solved:</span>
          <span className="text-lg font-bold text-white">0</span>
        </div>

        <div className="flex justify-between">
          <span className="text-lg font-bold text-neutral-200">Current Streak:</span>
          <span className="text-lg font-bold text-white">0</span>
        </div>

        <div className="flex justify-between">
          <span className="text-lg font-bold text-neutral-200">Accuracy:</span>
          <span className="text-lg font-bold text-white">0</span>
        </div>
      </div>
    </div>
  );
};

export default PuzzleStats;