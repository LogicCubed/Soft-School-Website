"use client";

import { useState } from "react";
import { Challenge } from "../../app/lesson/challenge";

type Props = {
  videoUrl?: string;
  callToAction?: string;
  options: React.ComponentProps<typeof Challenge>["options"];
  onSelect: (id: number) => void;
  selectedOption?: number;
  status: "correct" | "wrong" | "none";
  disabled?: boolean;
  type: "VIDEO";
};

export const VideoChallenge = ({
  videoUrl,
  callToAction,
  options,
  onSelect,
  selectedOption,
  status,
  disabled,
  type,
}: Props) => {
  const [videoEnded, setVideoEnded] = useState(false);

  return (
    <div>
      <div className="text-gray-600 text-xl mb-6">{callToAction}</div>
      <video
        controls
        autoPlay
        controlsList="nodownload noplaybackrate"
        className="w-3/4 max-w-[600px] rounded-xl mb-6 mx-auto block"
        src={videoUrl}
        onEnded={() => setVideoEnded(true)}
      />
      <div
        className={`transition-opacity duration-500 ${
          videoEnded ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {videoEnded && (
          <Challenge
            options={options}
            onSelect={onSelect}
            selectedOption={selectedOption}
            status={status}
            disabled={disabled}
            type={type}
          />
        )}
      </div>
    </div>
  );
};