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
    <div className="flex justify-center gap-x-6 mt-6">
      {options.map((option) => (
        <div key={option.id}>
          <TrueFalseCard
            id={option.id}
            text={option.text}
            selected={selectedOption === option.id}
            onClick={() => !disabled && onSelect(option.id)}
            disabled={disabled}
            status={status}
          />
        </div>
      ))}
    </div>
  );
};