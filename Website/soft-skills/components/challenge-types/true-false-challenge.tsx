import { TrueFalseCard } from "@/components/challenge-types/truefalsecard";


type Option = {
  id: number;
  text: string;
};

type Props = {
  selectedOption: number | undefined;
  onSelect: (id: number) => void;
  disabled?: boolean;
  status?: "correct" | "wrong" | "none";
  options: Option[];
};

export const TrueFalseChallenge = ({
  selectedOption,
  onSelect,
  disabled,
  status = "none",
  options,
}: Props) => {
  return (
    <div className="grid grid-cols-2 gap-x-0 gap-y-4 mt-6">
      {options.map((option) => (
        <TrueFalseCard
          key={option.id}
          id={option.id}
          text={option.text}
          selected={selectedOption === option.id}
          onClick={() => !disabled && onSelect(option.id)}
          disabled={disabled}
          status={status}
        />
      ))}
    </div>
  );
};