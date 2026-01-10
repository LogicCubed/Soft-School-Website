"use client";

import { FeedWrapper } from "@/components/feed-wrapper";
import Profile from "@/components/settings/profile";

const SettingsProfilePage = () => {
    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <FeedWrapper>
                <div className="w-full flex flex-col items-center">
                    <h1 className="mb-6 text-3xl sm:text-4xl font-extrabold text-sky-400 text-center">
                        Profile
                    </h1>
                    <Profile />
                </div>
            </FeedWrapper>
        </div>
    );
};

export default SettingsProfilePage;