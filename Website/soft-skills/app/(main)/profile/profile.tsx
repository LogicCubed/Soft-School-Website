"use client";

import { FeedWrapper } from '@/components/feed-wrapper';
import { Separator } from '@/components/ui/separator';
import { useUser } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Statistic } from './statistic';
import { useDeleteProgressModal } from '@/store/use-delete-progress-modal';
import { InferModel } from "drizzle-orm";
import { userProgress } from "@/db/schema";
import { Copy } from 'lucide-react';
import { useState } from 'react';

// TODO: Fix the deprecated declaration
type Props = {
  stats: InferModel<typeof userProgress> | null;
};

const Profile = ({ stats }: Props) => {
    const { user } = useUser();
    const { openDeleteProgressModal } = useDeleteProgressModal();

    const [copied, setCopied] = useState(false);

    const firstName = user?.firstName;
    const creationDate = user?.createdAt;
    const userId = user?.id;

    const formattedDate = creationDate
        ? new Date(creationDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        : 'Date not available';

    const formattedLastActivity = stats?.lastActivityDate
        ? new Date(stats.lastActivityDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
        : 'No recent activity';

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <FeedWrapper>
        <div className="w-full flex flex-col items-start">
          <h1 className="flex items-center gap-2 font-bold text-neutral-800 text-2xl mb-6">
            {firstName}
            {userId && (
              <button
                onClick={() => {
                  navigator.clipboard.writeText(user.id);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                }}
                className="flex items-center gap-1 hover:text-sky-600 text-gray-500 transition cursor-pointer"
                title="Copy User ID"
              >
                <Copy className="w-5 h-5" />
                {copied && <span className="text-xs text-gray-400 ml-1">Copied ID</span>}
              </button>
            )}
          </h1>
          <div className="text-muted-foreground text-center text-lg">
            Joined {formattedDate}
          </div>
          <div className="text-muted-foreground text-center text-lg mb-6">
            Last Seen {formattedLastActivity}
          </div>

          <p className="text-center font-bold text-sky-400 text-2xl mb-6">
            0 Friends
          </p>

          <Separator className="mb-4 h-0.5 rounded-full" />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Statistics
          </h1>

          <div className="flex flex-wrap">
            <Statistic
              icon="/points.svg"
              stat={stats ? stats.points.toString() : "-"}
              caption="Points"
            />
            <Statistic
              icon="/calendar.svg"
              stat={stats ? stats.currentStreak?.toString() ?? "0" : "-"}
              caption="Current Streak"
            />
            <Statistic
              icon="/mountains.svg"
              stat={stats ? stats.longestStreak?.toString() ?? "0" : "-"}
              caption="Longest Streak"
            />
          </div>

          <Separator className="mb-4 h-0.5 rounded-full" />
          <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
            Badges
          </h1>
          {/* BADGES WILL BE DISPLAYED HERE
          <Badge
            name="Test"
            icon="/softy-assets/softyhappy.svg"
          />
          */}

          <Separator className="mb-4 h-0.5 rounded-full" />
          <h1 className="text-center font-bold text-rose-500 text-2xl my-6">
            DANGER ZONE (TEST FEATURES)
          </h1>
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