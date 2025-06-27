import { challengeOptions, challenges } from "@/db/schema";
import { cn } from "@/lib/utils";
import { Card } from "./card";
import { Explanation } from "@/components/explanation";

type Props = {
    options: typeof challengeOptions.$inferSelect[];
    onSelect: (id: number) => void;
    status: "correct" | "wrong" | "none";
    selectedOption?: number;
    disabled?: boolean;
    type: typeof challenges.$inferSelect["type"];
};

export const Challenge = ({
    options,
    onSelect,
    status,
    selectedOption,
    type,
}: Props) => {
    const selectedExplanation = options.find((option) => option.id === selectedOption)?.explanation ?? "";

    return (
        <div>
            <div>
            {status !== "none" && (
                <Explanation
                    explanation={selectedExplanation}
                    status={status}
                />
            )}
            </div>
                <div className={cn(
                    "grid gap-2",
                    type === "SELECT" && "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]",
                    type === "VIDEO" && "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]",
                    type === "AUDIO" && "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]"
                )}>
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
    )
}