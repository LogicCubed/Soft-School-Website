import { Button } from "@/components/ui/button";

const AIHelperPanel = async () => {
  return (
    <div className="mt-1 w-full rounded-xl bg-[#2dd4bf] border-teal-600 p-5 border-2 border-b-[6px] text-white">
      <h3 className="text-2xl font-bold mb-4">AI Assistant</h3>

      <div className="space-y-3">
        <div>
            <Button
                variant="secondary"
                className="cursor-pointer"
            >
                New Chat
            </Button>
        </div>
        <div>
            <Button
                variant="secondary"
                className="cursor-pointer"
            >
                Save Chat
            </Button>
        </div>
      </div>
    </div>
  );
};

export default AIHelperPanel;