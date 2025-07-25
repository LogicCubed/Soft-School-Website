
import { Challenge } from "@/app/lesson/challenge";

type Option = {
  id: number;
  challengeId: number;
  text: string;
  correct: boolean;
  explanation: string;
};

type Props = {
  question: string;
  callToAction?: string;
  options: Option[];
  selectedIds: number[];
  onChange: (ids: number[]) => void;
  status: "correct" | "wrong" | "none";
};

export const MultiSelect = ({
  question,
  callToAction,
  options,
  selectedIds,
  onChange,
  status,
}: Props) => {
  const toggleOption = (id: number) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter((i) => i !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  const handleSelect = (id: number) => {
    toggleOption(id);
  };

  return (
    <div>
        <div className="text-gray-600 text-xl mb-6 text-center">{callToAction}</div>
        <Challenge
            options={options}
            onSelect={handleSelect}
            status={status}
            selectedIds={selectedIds}
            type="MULTI_SELECT"
            callToAction={undefined}
        />
    </div>
  );
};