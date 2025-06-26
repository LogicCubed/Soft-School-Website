"use client";

import { FeedWrapper } from '@/components/feed-wrapper';
import { Separator } from '@/components/ui/separator';
import { useUser } from '@clerk/clerk-react';
import { Badges } from './badges';
import { Button } from '@/components/ui/button';
import { useDeleteModal } from '@/store/admin-modals/use-delete-modal';
import { Statistics } from './statistics';
import { useDeleteProgressModal } from '@/store/use-delete-progress-modal';

const Profile = () => {
  const { user } = useUser();
  const { open } = useDeleteModal();
  const { openDeleteProgressModal } = useDeleteProgressModal();

  const firstName = user?.firstName;
  const creationDate = user?.createdAt;

  const formattedDate = creationDate
    ? new Date(creationDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'Date not available';

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
        <FeedWrapper>
            <div className="w-full flex flex-col items-start">
                <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                    {firstName}
                </h1>
                <p className="text-muted-foreground text-center text-lg mb-6">
                    Joined {formattedDate}
                </p>
                <p className="text-center font-bold text-sky-500 text-2xl mb-6">
                    0 Friends
                </p>
                <Separator className="mb-4 h-0.5 rounded-full" />
                <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                    Statistics
                </h1>
                <div className="flex flex-wrap">
                    <Statistics
                        icon="/points.svg"
                        stat="Test"
                        caption="Test"
                    />
                </div>
                <Separator className="mb-4 h-0.5 rounded-full" />
                <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                    Badges
                </h1>
                <Badges
                    name="Test"
                    icon="/softy-assets/softyhappy.svg"
                />
                <Separator className="mb-4 h-0.5 rounded-full" />
                <h1 className="text-center font-bold text-rose-500 text-2xl my-6">
                    DANGER ZONE
                </h1>
                <Button
                    variant="danger"
                    className="cursor-pointer mb-5"
                    onClick={open}
                >
                    DELETE ACCOUNT
                </Button>
                <Button
                    variant="danger"
                    className="cursor-pointer mb-5"
                    onClick={openDeleteProgressModal}
                >
                    RESET PROGRESS
                </Button>
            </div>
        </FeedWrapper>
    </div>
  );
};

export default Profile;