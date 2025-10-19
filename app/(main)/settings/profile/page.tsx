"use client";

import { FeedWrapper } from "@/components/feed-wrapper";
import { DangerZone } from "../danger-zone";
import { useDeleteProgressModal } from "@/store/use-delete-progress-modal";
import { Separator } from "@/components/ui/separator";

const SettingsProfilePage = () => {
    const { openDeleteProgressModal } = useDeleteProgressModal();

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <FeedWrapper>
                <div className="w-full flex flex-col items-center">
                    <h1 className="mb-6 text-3xl sm:text-4xl font-extrabold text-sky-400 text-center">
                        Profile
                    </h1>
                    <Separator className="mb-2 h-0.5 rounded-full b-slate-500" />
                    <DangerZone onReset={openDeleteProgressModal} />
                </div>
            </FeedWrapper>
        </div>
    );
};

export default SettingsProfilePage;