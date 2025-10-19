import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyFooter } from "@/components/sticky-footer";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import AIHelperPanel from "./ai-helper-panel";

const AIHelperPage = async () => {
    const userProgress = await getUserProgress();
      
      if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses");
      }

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                    <UserProgress
                      activeCourse={userProgress.activeCourse}
                      points={userProgress.points}
                    />
                    <AIHelperPanel/>
                    <StickyFooter/>
            </StickyWrapper>
            <FeedWrapper>
                <h1 className="mb-6 text-3xl sm:text-4xl font-extrabold text-sky-400 text-center">
                    AI Simulator
                </h1>
                <div className="w-full border-b-2 border-slate-500 mb-6" />
                <iframe
                        src="https://www.chatbase.co/chatbot-iframe/PdZDVMZeCwItf-I0gWh4j"
                        width="90%"
                        height="90%"
                        className="rounded-xl mx-auto w-full h-[80vh] md:w-full md:h-[80vh] lg:w-[90%] lg:h-[90%]"
                />
            </FeedWrapper>
        </div>
    );
};

export default AIHelperPage;