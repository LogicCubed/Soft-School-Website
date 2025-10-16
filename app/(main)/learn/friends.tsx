import Image from "next/image";
import { ChevronRight } from "lucide-react";

const Friends = async () => {
  return (
    <div className="mt-1 w-full rounded-xl bg-green-400 p-5 text-white flex flex-col border-2 border-b-[6px] border-green-500">
      <div className="space-y-2.5">
        <h3 className="text-2xl font-bold">Friends</h3>
        <p className="text-lg font-semibold">Make learning a team effort!</p>
        <div className="flex items-center justify-between cursor-pointer mt-2">
          <div className="flex items-center gap-2 font-semibold text-lg">
            <Image
              src="/magnifyingglass.svg"
              alt="Search Icon"
              width={30}
              height={30}
            />
            <p className="font-semibold ml-2">Find Friends</p>
          </div>
          <ChevronRight className="w-6 h-6" strokeWidth={3} />
        </div>
      </div>
    </div>
  );
};

export default Friends;