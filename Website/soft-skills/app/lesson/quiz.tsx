"use client";

import { challengeOptions, challenges } from "@/db/schema";
import { Header } from "./header";
import { useEffect, useRef, useState, useTransition } from "react";
import { QuestionBubble } from "./question-bubble";
import { Challenge } from "./challenge";
import { Footer } from "./footer";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { useAudio } from "react-use";
import Image from "next/image";
import { ResultCard } from "./result-card";
import { useRouter } from "next/navigation";
import Confetti from "react-Confetti";
import { Button } from "@/components/ui/button";
import { Volume2Icon } from "lucide-react";

type Props ={
    initialPercentage: number;
    initialLessonId: number;
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengeOptions: typeof challengeOptions.$inferSelect[];
        videoUrl?: string;
    })[];
}

export const Quiz = ({
    initialPercentage,
    initialLessonId,
    initialLessonChallenges,
}: Props) => {
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }, []);

    const { width, height } = windowSize;

    const router = useRouter();

    // Correct and Incorrect Audio

    const [
        correctAudio,
        _c,
        correctControls,
    ]  = useAudio({ src: "/sounds/correct.wav" });
    const [
        incorrectAudio,
        _i,
        incorrectControls,
    ]  = useAudio({ src: "/sounds/incorrect.wav" });

    // Setup transition state

    const [pending, startTransition] = useTransition();

    // Percentage Bar

    const [lessonId] = useState(initialLessonId);
    const [percentage, setPercentage] = useState(() => {
        return initialPercentage === 100 ? 0 : initialPercentage;
    });
    const [challenges] = useState(initialLessonChallenges);

    // Track which challenge is currently active

    const [activeIndex, setActiveIndex] = useState(() => {
        const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed);
        return uncompletedIndex === -1 ? 0 : uncompletedIndex;
    });

    // Track selected option and answer status

    const [selectedOption, setSelectedOption] = useState<number>();
    const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

    // Reference and extract challenge details

    const challenge = challenges[activeIndex];
    const audioRef = useRef<HTMLAudioElement>(null);
    const options = challenge?.challengeOptions ?? [];

    // Transition between Questions
    
    const [showContent, setShowContent] = useState(true);
    const onNext = () => {
        setShowContent(false);
        setTimeout(() => {
            setActiveIndex((current) => current + 1);
            setShowContent(true);
    }, 300);
    };

    // Accuracy
    const [attempted, setAttempted] = useState(0);
    const [correct, setCorrect] = useState(0);
    const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;

    // Timer
    const [startTime, setStartTime] = useState<number | null>(null);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [isLessonComplete, setIsLessonComplete] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
      
    useEffect(() => {
        const start = Date.now();
        setStartTime(start);
      
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

    // On Answer Select

    const onSelect = (id: number) => {
        if(status !== "none") return;

        setSelectedOption(id);
    };

    const onContinue = () => {
        if (!selectedOption) return;
        
        if (status === "wrong") {
            setStatus("none");
            setSelectedOption(undefined);
            return;
        };

        if (status === "correct") {
            setStatus("none");
            setSelectedOption(undefined);
            onNext();
            return;
        };

        const correctOption = options.find((option) => option.correct);

        if (!correctOption) {
            return;
        }

        if (correctOption && correctOption.id === selectedOption) {
            startTransition(() => {
                upsertChallengeProgress(challenge.id)
                    .then((response) => {
                        correctControls.play();
                        setStatus("correct");

                        // Accuracy
                        setAttempted((prev) => prev + 1);
                        setCorrect((prev) => prev + 1);

                        // Progress Bar
                        setPercentage((prev) => prev + 100 / challenges.length);
                    })
            });
        } else {
            startTransition(() => {
                incorrectControls.play();
                setStatus("wrong");

                // Accuracy

                setAttempted((prev) => prev + 1);
            })
        }
    };

    if (!challenge) {
        return (
            <>
                <Confetti
                    width={width}
                    height={height}
                    recycle={false}
                    numberOfPieces={500}
                    tweenDuration={10000}
                />
                <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
                    <Image
                        src="/softy-assets/softyhappy.svg"
                        alt="Finish"
                        className="hidden lg:block"
                        height={100}
                        width={100}
                    />
                    <Image
                        src="/softy-assets/softyhappy.svg"
                        alt="Finish"
                        className="block lg:hidden"
                        height={50}
                        width={50}
                    />
                    <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
                        Great Job! <br/> You&apos;ve completed this lesson!
                    </h1>
                    <div className="flex items-center gap-x-4 w-full">
                        <ResultCard
                            value={challenges.length * 10}
                            accuracy={accuracy}
                            time={formatTime(elapsedTime)}
                        />
                    </div>
                </div>
                <Footer
                    lessonId={lessonId}
                    status="completed"
                    onCheck={() => router.push("/learn")}
                />
            </>
        );
    };

    const title = challenge.type === "ASSIST"
        ? "Select the correct response"
        : challenge.question;

    return (
        <>
            {incorrectAudio}
            {correctAudio}
            <Header
            percentage={percentage}
            />
            <div className="flex-1">
                <div className="h-full flex items-center justify-center">
                <div className={`transition-opacity duration-300 ${showContent ? "opacity-100" : "opacity-0"} lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12`}>
                        <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
                            {title}
                        </h1>
                        <div>
                            {challenge.type === "ASSIST" && (
                                <QuestionBubble question={challenge.question}/>
                            )}

                            {challenge.type === "VIDEO" ? (
                                <div>
                                    <video
                                        controls
                                        className="w-full rounded-xl mb-4"
                                        src={challenge.videoUrl || undefined}
                                    >
                                    </video>
                                        <Challenge
                                        options={options}
                                        onSelect={onSelect}
                                        status={status}
                                        selectedOption={selectedOption}
                                        disabled={pending}
                                        type={challenge.type}
                                        />
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
                                            <Volume2Icon className="w-24 h-24"/>
                                        </Button>
                                        <audio ref={audioRef} src={challenge.audio || ""} />
                                    </div>
                                    <Challenge
                                        options={options}
                                        onSelect={onSelect}
                                        status={status}
                                        selectedOption={selectedOption}
                                        disabled={pending}
                                        type={challenge.type}
                                    />
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
            <Footer
                disabled={pending || !selectedOption}
                status={status}
                onCheck={onContinue}
            />
        </>
    )
}