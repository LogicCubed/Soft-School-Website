import { FeedWrapper } from "@/components/feed-wrapper";
import Preferences from "@/components/settings/preferences";

const SettingsPage = () => {
    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <FeedWrapper>
                <div className="w-full flex flex-col items-center">
                    <h1 className="mb-12 text-3xl sm:text-4xl font-extrabold text-sky-400 text-center">
                        Preferences
                    </h1>
                    <Preferences />
                </div>
            </FeedWrapper>
        </div>
    );
};

export default SettingsPage;