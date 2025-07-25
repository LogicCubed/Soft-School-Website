"use client";

import { challengeOptions, challenges } from "@/db/schema";
import { Header } from "./header";
import { useEffect, useRef, useState, useTransition } from "react";
import { Challenge } from "./challenge";
import { Footer } from "./footer";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { useAudio } from "react-use";
import Image from "next/image";
import { ResultCard } from "./result-card";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import { useLoading } from "@/store/loadingStore";
import { Explanation } from "./explanation";
import { VideoChallenge } from "../../components/challenge-types/video-challenge";
import { AudioChallenge } from "@/components/challenge-types/audio-challenge";
import { MultiSelect } from "@/components/challenge-types/multi-select-challenge";

type Props = {
  initialPercentage: number;
  initialLessonId: number;
  initialLessonChallenges: (
    Omit<typeof challenges.$inferSelect, "videoUrl"> & {
      completed: boolean;
      challengeOptions: typeof challengeOptions.$inferSelect[];
      videoUrl?: string;
      explanation?: string;
    }
  )[];
};

export const Quiz = ({
  initialPercentage,
  initialLessonId,
  initialLessonChallenges,
}: Props) => {
  // Track window dimensions
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Initialize window size on mount
  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  // Disable loading spinner on load
  useEffect(() => {
    const { setLoading } = useLoading.getState();
    setLoading(false);
  }, []);

  // Destructure width and height from window size
  const { width, height } = windowSize;
  const router = useRouter();

  // Load correct/incorrect sounds
  const [correctAudio, , correctControls] = useAudio({ src: "/sounds/correct.wav" });
  const [incorrectAudio, , incorrectControls] = useAudio({ src: "/sounds/incorrect.wav" });

  // Handle React transitions
  const [pending, startTransition] = useTransition();

  // Track lesson state
  const [lessonId] = useState(initialLessonId);
  const [percentage, setPercentage] = useState(() => (initialPercentage === 100 ? 0 : initialPercentage));
  const [challenges] = useState(initialLessonChallenges);

  // Determine starting challenge index
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed);
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });

  // Track selected answer and correctness state
  const [selectedOption, setSelectedOption] = useState<number>();
  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

  // Get current challenge and its options
  const challenge = challenges[activeIndex];
  const options = challenge?.challengeOptions ?? [];

  // Handle content transitions between questions
  const [showContent, setShowContent] = useState(true);
  const onNext = () => {
    setShowContent(false);
    setTimeout(() => {
      setActiveIndex((current) => current + 1);
      setShowContent(true);
    }, 300);
  };

  // Track performance stats
  const [attempted, setAttempted] = useState(0);
  const [correct, setCorrect] = useState(0);
  const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;

  // Timer state
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isLessonComplete, setIsLessonComplete] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Update user activity on completion
  const [hasUpdatedLastActivity, setHasUpdatedLastActivity] = useState(false);
  useEffect(() => {
    if (isLessonComplete && !hasUpdatedLastActivity) {
      setHasUpdatedLastActivity(true);
      fetch("/api/user", {
        method: "POST",
      }).catch(console.error);
    }
  }, [isLessonComplete, hasUpdatedLastActivity]);

  // Start elapsed time tracking
  useEffect(() => {
    const start = Date.now();

    const interval = setInterval(() => {
      setElapsedTime(Date.now() - start);
    }, 1000);

    timerRef.current = interval;

    return () => clearInterval(interval);
  }, []);

  // Stop timer when lesson is done
  useEffect(() => {
    if (isLessonComplete && timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, [isLessonComplete]);

  // Format ms into mm:ss
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Mark lesson complete if no more challenges
  useEffect(() => {
    if (!challenge) {
      setIsLessonComplete(true);
    }
  }, [challenge]);

  // Handle single-select answer
  const onSelect = (id: number) => {
    if (status === "wrong") {
      setStatus("none");
    }
    setSelectedOption(id);
  };

  // TODO: Optimize Multi-Select states
  // Multi-select state
  const [selectedMulti, setSelectedMulti] = useState<number[]>([]);
  const [isChecking, setIsChecking] = useState(false);

  // Check if challenge is multi-select
  const isMultiSelect = challenge?.type === "MULTI_SELECT";

  // Disable continue button unless an option is selected
  const isDisabled = pending || (isMultiSelect ? selectedMulti.length === 0 : !selectedOption);

  // Track correct streak for rewards, streaks, etc
  const [correctStreak, setCorrectStreak] = useState(0);

  // Submit for single-select
  const onContinue = () => {
    if (!selectedOption || isChecking) return;

    setIsChecking(true);

    const correctOption = options.find((option) => option.correct);
    if (!correctOption) {
      setIsChecking(false);
      return;
    }

    if (correctOption.id === selectedOption) {
      startTransition(() => {
        upsertChallengeProgress(challenge.id).then(() => {
          correctControls.play();
          setStatus("correct");

          setAttempted((prev) => prev + 1);
          setCorrect((prev) => prev + 1);
          setPercentage((prev) => prev + 100 / challenges.length);

          setCorrectStreak((prev) => prev + 1);

          setTimeout(() => {
            setStatus("none");
            setSelectedOption(undefined);
            setSelectedMulti([]);
            onNext();
            setIsChecking(false);
          }, 2000);
        });
      });
    } else {
      startTransition(() => {
        incorrectControls.play();
        setStatus("wrong");
        setAttempted((prev) => prev + 1);
        setCorrectStreak(0);
        setIsChecking(false);
      });
    }
  };

  // Update selection in multi-select
  const onMultiSelectChange = (newSelectedIds: number[]) => {
  if (status === "wrong") {
    setStatus("none");
  }
  setSelectedMulti(newSelectedIds);
};

  // Submit multi-select answer
  const handleMultiSelectSubmit = (selectedIds: number[]) => {
  const correctOptionIds = options.filter(o => o.correct).map(o => o.id);
  const isCorrect =
    selectedIds.length === correctOptionIds.length &&
    selectedIds.every(id => correctOptionIds.includes(id));

  setAttempted(prev => prev + 1);

  if (isCorrect) {
    startTransition(() => {
      upsertChallengeProgress(challenge.id).then(() => {
        correctControls.play();
        setStatus("correct");
        setCorrect(prev => prev + 1);
        setPercentage(prev => prev + 100 / challenges.length);
        setCorrectStreak(prev => prev + 1);

        setTimeout(() => {
          setStatus("none");
          onNext();
        }, 2000);
      });
    });
  } else {
    incorrectControls.play();
    setStatus("wrong");
    setCorrectStreak(0);
  }
};

  if (!challenge) {
    return (
      <>
        <Confetti width={width} height={height} recycle={false} numberOfPieces={500} tweenDuration={10000} />
        <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full px-4">
          <Image src="/softy-assets/softyhappy.svg" alt="Finish" className="hidden lg:block" height={100} width={100} />
          <Image src="/softy-assets/softyhappy.svg" alt="Finish" className="block lg:hidden" height={50} width={50} />
          <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
            Great Job! <br />
            You&apos;ve completed this lesson!
          </h1>
          <div className="flex items-center gap-x-4 w-full justify-center">
            <ResultCard value={challenges.length * 10} accuracy={accuracy} time={formatTime(elapsedTime)} />
          </div>
        </div>
        <Footer lessonId={lessonId} status="completed" onCheck={() => router.push("/learn")} />
      </>
    );
  }

  const title = challenge.question;
  const selectedExplanation = options.find((opt) => opt.id === selectedOption)?.explanation ?? "";

  return (
    <>
      {incorrectAudio}
      {correctAudio}
      <Header percentage={percentage} />
      <div className="flex-1 flex justify-center px-4">
        <div
          className={`transition-opacity duration-300 flex flex-col lg:flex-row gap-10 items-center ${showContent ? "opacity-100" : "opacity-0"} max-w-[900px] px-4 lg:pl-12 mx-auto`}
        >
          {/* Explanation box */}
          <div className="hidden lg:flex w-[160px] flex-shrink-0 justify-center items-center lg:ml-[-4rem] lg:translate-x-[-125px]">
            <Explanation explanation={selectedExplanation} status={status} streakCount={correctStreak} streakThreshold={2} />
          </div>

          {/* Challenge content */}
          <div className="flex flex-col gap-y-12 w-full">
            <h1 className="text-lg lg:text-3xl text-center lg:text-left font-bold text-neutral-700 mt-5 lg:mt-0">{title}</h1>

            {/* TODO: Make this more efficient: call to action should be defined in each component anyway */}
            {challenge.type !== "VIDEO" && challenge.type !== "AUDIO" && challenge.type !=="MULTI_SELECT" && (
              <div>
                <div className="text-gray-600 text-xl">{challenge.callToAction}</div>
              </div>
            )}

            <div>
              {challenge.type === "VIDEO" ? (
                <VideoChallenge
                  videoUrl={challenge.videoUrl}
                  callToAction={challenge.callToAction}
                  options={options}
                  onSelect={onSelect}
                  selectedOption={selectedOption}
                  status={status}
                  disabled={pending}
                  type={challenge.type}
                />
              ) : challenge.type === "AUDIO" ? (
                <AudioChallenge
                  audioUrl={challenge.audio ?? undefined}
                  callToAction={challenge.callToAction}
                  options={options}
                  onSelect={onSelect}
                  selectedOption={selectedOption}
                  status={status}
                  disabled={pending}
                  type={challenge.type}
                />
              ) : challenge.type === "MULTI_SELECT" ? (
                <MultiSelect
                  question={challenge.question}
                  callToAction={challenge.callToAction}
                  options={options}
                  selectedIds={selectedMulti}
                  onChange={onMultiSelectChange}
                  status={status}
                />
              ) : (
                <Challenge
                  options={options}
                  onSelect={onSelect}
                  status={status}
                  selectedOption={selectedOption}
                  disabled={pending}
                  type={challenge.type}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer
  disabled={isDisabled}
  status={status}
  onCheck={isMultiSelect ? () => handleMultiSelectSubmit(selectedMulti) : onContinue}
/>
    </>
  );
};