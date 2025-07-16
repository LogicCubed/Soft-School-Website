import { challengeOptions, challenges } from "@/db/schema";
import { cn } from "@/lib/utils";
import { Card } from "./card";

type Props = {
    options: typeof challengeOptions.$inferSelect[];
    onSelect: (id: number) => void;
    status: "correct" | "wrong" | "none";
    selectedOption?: number;
    disabled?: boolean;
    type: typeof challenges.$inferSelect["type"];
    callToAction?: string;
};

export const Challenge = ({
    options,
    onSelect,
    status,
    selectedOption,
    type,
    callToAction,
}: Props) => {
    return (
        <div className="flex gap-8">
          <div className="flex flex-col flex-1">
            {callToAction && (
              <div className="mb-4 text-gray-600 text-xl">{callToAction}</div>
            )}

            <div
              className={cn(
                "grid gap-2",
                (type === "SELECT" || type === "VIDEO" || type === "AUDIO") && "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]"
              )}
            >
              {options.map((option, i) => (
                <Card
                  key={option.id}
                  id={option.id}
                  text={option.text}
                  shortcut={`${i + 1}`}
                  selected={selectedOption === option.id}
                  onClick={() => onSelect(option.id)}
                  status={status}
                  type={type}
                />
              ))}
            </div>
          </div>
        </div>
    );
};