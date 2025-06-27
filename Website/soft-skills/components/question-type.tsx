"use client";

import * as Select from '@radix-ui/react-select';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  CircleDotIcon,
  BotIcon,
  VideoIcon,
  Volume2Icon
} from "lucide-react";

interface QuestionTypeProps {
  defaultValue: string;
  onValueChange?: (value: string) => void;
}

const questionTypes = [
  { value: "SELECT", label: "SELECT", icon: <CircleDotIcon className="w-4 h-4 mr-2" /> },
  { value: "VIDEO", label: "VIDEO", icon: <VideoIcon className="w-4 h-4 mr-2" /> },
  { value: "AUDIO", label: "AUDIO", icon: <Volume2Icon className="w-4 h-4 mr-2" /> },
];

export function QuestionType({ defaultValue, onValueChange }: QuestionTypeProps) {
  return (
    <Select.Root defaultValue={defaultValue} onValueChange={onValueChange}>
      <Select.Trigger className="inline-flex items-center justify-between rounded border border-gray-300 px-3 py-1 text-sm leading-none cursor-pointer select-none">
        <Select.Value />
        <Select.Icon>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
            position="popper"
            side="bottom"
            sideOffset={4}
            align="start"
            className="overflow-hidden rounded border border-gray-300 bg-white shadow-lg"
        >
            <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-white cursor-default">
                <ChevronUpIcon />
            </Select.ScrollUpButton>

            <Select.Viewport>
                {questionTypes.map((type) => (
                    <Select.Item
                        key={type.value}
                        value={type.value}
                        className="relative flex items-center px-4 py-2 text-sm cursor-pointer select-none gap-2
                        data-[highlighted]:bg-blue-500
                        data-[state=checked]:bg-blue-100"
                    >
                        {type.icon}
                        <Select.ItemText>{type.label}</Select.ItemText>
                    </Select.Item>
                ))}
            </Select.Viewport>

            <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-white cursor-default">
                <ChevronDownIcon />
            </Select.ScrollDownButton>
        </Select.Content>
        </Select.Portal>
    </Select.Root>
  );
}
