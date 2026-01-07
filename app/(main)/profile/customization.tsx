import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

const Customization = async () => {
  return (
    <div>
        <div className="relative w-full aspect-square rounded-xl bg-[#1c1c1c] border-[#0d0d0d] p-5 border-2 border-b-[6px] text-white">
            <Button
                variant="dark"
                className="absolute top-3 right-3 flex items-center justify-center cursor-pointer"
            >
                <Pencil className="w-12 h-12 text-white" strokeWidth={3} />
            </Button>
        </div>
        <div className="mt-4 w-full rounded-xl bg-[#477cde] border-[#204893] p-5 border-2 border-b-[6px] text-white">
            <h3 className="text-2xl font-bold mb-4">Inventory</h3>
        </div>
    </div>
  );
};

export default Customization;