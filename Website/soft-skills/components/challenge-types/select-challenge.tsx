"use client";

import { Challenge } from "@/app/lesson/challenge";
import React from "react";

type Option = {
  id: number;
  challengeId: number;
  text: string;
  correct: boolean;
  explanation: string;
};

type Props = {
  callToAction: string;
  options: Option[];
  selectedOption?: number;
  onSelect: (id: number) => void;
  status: "correct" | "wrong" | "none";
  disabled?: boolean;
  type?: string;
};

export const SelectChallenge = ({
  callToAction,
  options,
  selectedOption,
  onSelect,
  status,
  disabled = false,
}: Props) => {
  return (
    <div>
      <div className="text-gray-600 text-xl mb-6">{callToAction}</div>
      <Challenge
        options={options}
        selectedOption={selectedOption}
        onSelect={onSelect}
        status={status}
        disabled={disabled}
        type="SELECT"
      />
    </div>
  );
};