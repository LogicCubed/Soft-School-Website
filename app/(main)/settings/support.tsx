import { Button } from "@/components/ui/button";
import Link from "next/link";

const Support = async () => {
  return (
    <div className="mt-1 w-full rounded-xl bg-slate-500 border-slate-600 text-white p-5 flex items-start justify-between border-2 border-b-[6px]">
      <div className="flex flex-col space-y-1 w-full">
        <h3 className="text-2xl font-bold ml-4 mb-4">Support</h3>
        <Link href="/help">
          <Button
            variant="ghost"
            className="w-full justify-start cursor-pointer text-white"
          >
            Help Center
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Support;