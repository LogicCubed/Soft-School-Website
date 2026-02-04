import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyFooter } from "@/components/sticky-footer";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import AIHelperPanel from "./ai-helper-panel";
import Head from "next/head";

const AIHelperPage = async () => {
  const userProgress = await getUserProgress();

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  return (
    <>
      <Head>
        <title>AI Simulator</title>
        <meta
          name="description"
          content="Use the AI Simulator to practice soft skills in real-time. Track your course progress while interacting with the AI helper."
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="flex flex-row-reverse gap-[48px] px-6">
        <StickyWrapper>
          <UserProgress
            activeCourse={userProgress.activeCourse}
            points={userProgress.points}
          />
          <AIHelperPanel />
          <StickyFooter />
        </StickyWrapper>

        <FeedWrapper>
          <header className="text-center mb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-sky-400">
              AI Simulator
            </h1>
            <hr className="w-full border-b-2 border-slate-500 mt-2" />
          </header>

          <main className="flex justify-center">
            <iframe
              src="https://www.chatbase.co/chatbot-iframe/PdZDVMZeCwItf-I0gWh4j"
              width="90%"
              height="90%"
              className="rounded-xl w-full h-[80vh] md:w-full md:h-[80vh] lg:w-[90%] lg:h-[90%]"
              title="AI Simulator Chatbot"
            />
          </main>
        </FeedWrapper>
      </div>
    </>
  );
};

export default AIHelperPage;