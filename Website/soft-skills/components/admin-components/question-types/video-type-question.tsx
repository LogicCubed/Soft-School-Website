"use client";

import React, { useState, useEffect, useTransition } from "react";
import { Circle, CheckCircle } from "lucide-react";
import { OptionTextInput } from "@/components/admin-components/admin-edit/edit-answer";
import { NewOptionInput } from "@/components/admin-components/admin-create/add-option";
import { ExplanationTextInput } from "@/components/admin-components/admin-create/explanation-button";
import { DeleteAnswerButton } from "@/components/admin-components/admin-delete/delete-answer-button";
import { CallToActionTextInput } from "@/components/admin-components/admin-edit/edit-calltoaction";
import { useEditing } from "../admin-context/editing-context";
import VideoUpload from "../admin-create/video-upload";

interface VideoTypeQuestionProps {
  challenge: {
    id: number;
    question: string;
    callToAction: string;
    videoUrl?: string | null;
    challengeOptions: {
      id: number;
      text: string;
      correct: boolean;
      explanation?: string | null;
    }[];
  };
}

export function VideoTypeQuestion({ challenge }: VideoTypeQuestionProps) {
  const [isPending] = useTransition();
  const [currentVideo, setCurrentVideo] = useState<string | null>(challenge.videoUrl ?? null);

  const {
    pendingDeletedOptions,
    updateCorrectAnswer,
    getMergedCorrectAnswer,
    updateVideoForChallenge,
  } = useEditing();

  const mergedCorrectOptionId = getMergedCorrectAnswer(
    challenge.id,
    challenge.challengeOptions.find((o) => o.correct)?.id ?? -1
  );

  useEffect(() => {
    async function fetchVideo() {
      const res = await fetch(`/api/challenges/${challenge.id}`);
      if (res.ok) {
        const data = await res.json();
        setCurrentVideo(data.videoUrl ?? null);
      }
    }
    fetchVideo();
  }, [challenge.id]);

  const handleVideoUpload = async (url: string) => {
    setCurrentVideo(url);
    updateVideoForChallenge(challenge.id, url);

    await fetch(`/api/challenges/${challenge.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ videoUrl: url }),
    });
  };

  const handleSetCorrect = (optionId: number) => {
    updateCorrectAnswer(challenge.id, optionId);
  };

  return (
    <>
      <div className="flex flex-col gap-2 mt-4 w-full items-center">
        <div className="flex justify-center w-full max-w-md">
          <VideoUpload videoSrc={currentVideo} onUpload={handleVideoUpload} />
        </div>

        {currentVideo && currentVideo.trim() !== "" && (
          <div className="flex justify-center w-full max-w-md mt-2">
            <video
              key={currentVideo}
              src={currentVideo}
              controls
              className="rounded-lg max-h-[300px] w-full"
            />
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <CallToActionTextInput initialText={challenge.callToAction} questionId={challenge.id} />
      </div>

      <div className="relative mt-5">
        {challenge.challengeOptions
          .slice()
          .sort((a, b) => a.id - b.id)
          .filter((option) => !pendingDeletedOptions.has(option.id))
          .map((option) => (
            <div
              key={option.id}
              className="group flex items-center hover:decoration-gray-300 hover:underline-offset-4 mt-5 pr-12"
              style={{ position: "relative" }}
            >
              <div className="w-[90%] flex items-center">
                <button
                  onClick={() => handleSetCorrect(option.id)}
                  disabled={isPending}
                  className="mr-5 ml-5 cursor-pointer"
                >
                  {mergedCorrectOptionId === option.id ? (
                    <CheckCircle className="text-green-500" />
                  ) : (
                    <Circle className="text-gray-300" />
                  )}
                </button>
                <OptionTextInput initialText={option.text} optionId={option.id} />
                <div className="ml-5">
                  <ExplanationTextInput initialExplanation={option.explanation ?? ""} answerId={option.id} />
                </div>
              </div>

              <div
                className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-4"
                style={{ width: "40px", textAlign: "center" }}
              >
                <DeleteAnswerButton answerId={option.id} />
              </div>
            </div>
          ))}
      </div>

      <div className="w-[85.5%] flex items-center mt-5 ml-2.75">
        <NewOptionInput challengeId={challenge.id} />
      </div>
    </>
  );
}