import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Header } from "./header";
import { UserProgress } from "@/components/user-progress";

const LearnPage = () => {
    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress
                    activeCourse={{ title: "Problem Solving", imageSrc: "/problemsolving.svg" }}
                />
            </StickyWrapper>
            <FeedWrapper>
                <Header title="Problem Solving" />
            </FeedWrapper>
        </div>
    );
};

export default LearnPage;