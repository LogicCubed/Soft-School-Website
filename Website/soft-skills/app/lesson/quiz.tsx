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
import { Button } from "@/components/ui/button";
import { Volume2Icon } from "lucide-react";
import { useLoading } from "@/store/loadingStore";
import { Explanation } from "./explanation";

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
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    const { setLoading } = useLoading.getState();
    setLoading(false);
  }, []);

  const { width, height } = windowSize;
  const router = useRouter();

  const [correctAudio, , correctControls] = useAudio({ src: "/sounds/correct.wav" });
  const [incorrectAudio, , incorrectControls] = useAudio({ src: "/sounds/incorrect.wav" });

  const [pending, startTransition] = useTransition();

  const [lessonId] = useState(initialLessonId);
  const [percentage, setPercentage] = useState(() => (initialPercentage === 100 ? 0 : initialPercentage));
  const [challenges] = useState(initialLessonChallenges);

  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed);
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });

  const [selectedOption, setSelectedOption] = useState<number>();
  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

  const challenge = challenges[activeIndex];
  const audioRef = useRef<HTMLAudioElement>(null);
  const options = challenge?.challengeOptions ?? [];

  const [videoEnded, setVideoEnded] = useState(false);
  const [audioEnded, setAudioEnded] = useState(false);

  const [showContent, setShowContent] = useState(true);
  const onNext = () => {
    setShowContent(false);
    setTimeout(() => {
      setActiveIndex((current) => current + 1);
      setShowContent(true);
    }, 300);
  };

  const [attempted, setAttempted] = useState(0);
  const [correct, setCorrect] = useState(0);
  const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;

  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isLessonComplete, setIsLessonComplete] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [hasUpdatedLastActivity, setHasUpdatedLastActivity] = useState(false);
  useEffect(() => {
    if (isLessonComplete && !hasUpdatedLastActivity) {
      setHasUpdatedLastActivity(true);
      fetch("/api/user", {
        method: "POST",
      }).catch(console.error);
    }
  }, [isLessonComplete, hasUpdatedLastActivity]);

  useEffect(() => {
    const start = Date.now();

    const interval = setInterval(() => {
      setElapsedTime(Date.now() - start);
    }, 1000);

    timerRef.current = interval;

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isLessonComplete && timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, [isLessonComplete]);

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (!challenge) {
      setIsLessonComplete(true);
    }
  }, [challenge]);

  const onSelect = (id: number) => {
    if (status === "wrong") {
      setStatus("none");
    }
    setSelectedOption(id);
  };

  const [isChecking, setIsChecking] = useState(false);

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

          setTimeout(() => {
            setStatus("none");
            setSelectedOption(undefined);
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
        setIsChecking(false);
      });
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
            <Explanation explanation={selectedExplanation} status={status} />
          </div>

          {/* Challenge content */}
          <div className="flex flex-col gap-y-12 w-full">
            <h1 className="text-lg lg:text-3xl text-center lg:text-left font-bold text-neutral-700">{title}</h1>

            {challenge.type !== "VIDEO" && challenge.type !== "AUDIO" && (
              <div>
                <div className="text-gray-600 mt-5 text-xl">{challenge.callToAction}</div>
              </div>
            )}

            <div>
              {challenge.type === "VIDEO" ? (
                <div>
                  <video
                    controls
                    autoPlay
                    controlsList="nodownload noplaybackrate"
                    className="w-full rounded-xl mb-4"
                    src={challenge.videoUrl || undefined}
                    onEnded={() => setVideoEnded(true)}
                  />
                  <div className={`transition-opacity duration-500 ${videoEnded ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                    {videoEnded && (
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
              ) : challenge.type === "AUDIO" ? (
                <div>
                  <div className="flex justify-center items-center h-full mb-10">
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
                    <audio ref={audioRef} src={challenge.audio || ""} onEnded={() => setAudioEnded(true)} />
                  </div>

                  <div className={`transition-opacity duration-500 ${audioEnded ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                    {audioEnded && (
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
      <Footer disabled={pending || !selectedOption} status={status} onCheck={onContinue} />
    </>
  );
};