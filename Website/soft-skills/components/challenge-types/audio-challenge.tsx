"use client";

import { useState, useRef } from "react";
import { Challenge } from "../../app/lesson/challenge";
import { Button } from "@/components/ui/button";
import { Volume2Icon } from "lucide-react";

type Props = {
  audioUrl?: string;
  callToAction?: string;
  options: React.ComponentProps<typeof Challenge>["options"];
  onSelect: (id: number) => void;
  selectedOption?: number;
  status: "correct" | "wrong" | "none";
  disabled?: boolean;
  type: "AUDIO";
};

export const AudioChallenge = ({
  audioUrl,
  callToAction,
  options,
  onSelect,
  selectedOption,
  status,
  disabled,
  type,
}: Props) => {
  const [audioEnded, setAudioEnded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <div>
        <div className="flex justify-center mb-6">
            <Button
                size="lg"
                className="cursor-pointer w-40 h-40"
                onClick={() => {
                if (audioRef.current) {
                    audioRef.current.currentTime = 0;
                    audioRef.current.play();
                }
                }}
            >
                <Volume2Icon className="w-24 h-24" />
            </Button>
        </div>
        <div className="text-gray-600 text-xl mb-6 text-center">{callToAction}</div>
        <audio
            ref={audioRef}
            src={audioUrl}
            onEnded={() => setAudioEnded(true)}
            preload="auto"
        />
        <div
            className={`transition-opacity duration-500 ${audioEnded ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
            <Challenge
                options={options}
                onSelect={onSelect}
                selectedOption={selectedOption}
                status={status}
                disabled={!audioEnded || disabled}
                type={type}
            />
        </div>
    </div>
  );
};