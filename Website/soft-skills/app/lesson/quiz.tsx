"use client";

import { challengeOptions, challenges } from "@/db/schema";
import { Header } from "./header";
import { useEffect, useRef, useState, useTransition } from "react";
import { QuestionBubble } from "./question-bubble";
import { Challenge } from "./challenge";
import { Footer } from "./footer";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { useAudio, useWindowSize } from "react-use";
import Image from "next/image";
import { ResultCard } from "./result-card";
import { useRouter } from "next/navigation";
import Confetti from "react-Confetti";
import { getVideoUrl } from "@/db/queries";
import { Button } from "@/components/ui/button";
import { Icon, Volume2, Volume2Icon } from "lucide-react";

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

    const [pending, startTransition] = useTransition();

    const [lessonId] = useState(initialLessonId);
    const [percentage, setPercentage] = useState(() => {
        return initialPercentage === 100 ? 0 : initialPercentage;
    });
    const [challenges] = useState(initialLessonChallenges);

    const [activeIndex, setActiveIndex] = useState(() => {
        const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed);
        return uncompletedIndex === -1 ? 0 : uncompletedIndex;
    });

    const [selectedOption, setSelectedOption] = useState<number>();
    const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

    const challenge = challenges[activeIndex];
    const videoUrl = challenge?.videoUrl;
    const audioRef = useRef<HTMLAudioElement>(null);
    const options = challenge?.challengeOptions ?? [];

    const onNext = () => {
        setActiveIndex((current) => current + 1);
    };

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
                        setPercentage((prev) => prev + 100 / challenges.length);
                    })
            });
        } else {
            startTransition(() => {
                incorrectControls.play();
                setStatus("wrong");
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
                    <div className="lg:min-h-[350[x] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
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