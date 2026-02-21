"use client";

import { FeedWrapper } from '@/components/feed-wrapper';
import { Separator } from '@/components/ui/separator';
import { useUser } from '@clerk/clerk-react';
import { Statistic } from './statistic';
import { InferModel } from "drizzle-orm";
import { userProgress } from "@/db/schema";
import { Copy } from 'lucide-react';
import { useState } from 'react';
import { Badges } from './badges';

type Props = {
  stats: InferModel<typeof userProgress> | null;
};

const Profile = ({ stats }: Props) => {
  const { user } = useUser();

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
    <div className="flex flex-col md:flex-col lg:flex-row-reverse gap-6 lg:gap-12 px-3 md:px-6 w-full overflow-x-hidden">
      <FeedWrapper>
        <div className="w-full flex flex-col items-center md:items-center lg:items-start">
          <h1 className="flex flex-wrap items-center gap-2 font-bold text-white text-3xl sm:text-4xl mb-4 sm:mb-6">
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
                <Copy className="w-5 h-5 sm:w-6 sm:h-6 mt-1 sm:mt-2" />
                {copied && <span className="text-xs text-gray-400 ml-1">Copied ID</span>}
              </button>
            )}
          </h1>

          <div className="text-slate-400 text-lg sm:text-lg text-center sm:text-left">
            Joined {formattedDate}
          </div>
          <div className="text-slate-400 text-lg sm:text-lg mb-4 sm:mb-6 text-center sm:text-left">
            Last Seen {formattedLastActivity}
          </div>

          <p className="text-center sm:text-left font-bold text-sky-400 text-xl sm:text-2xl mb-6">
            0 Friends
          </p>

          <Separator className="mb-2 h-0.5 rounded-full b-slate-500" />

          <h1 className="text-center sm:text-left font-bold text-white text-2xl my-6">
            Statistics
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <Statistic
              icon="/icons/points.svg"
              stat={stats ? stats.points.toString() : "-"}
              caption="Points"
            />
            <Statistic
              icon="/icons/streak.svg"
              stat={stats ? stats.currentStreak?.toString() ?? "0" : "-"}
              caption="Current Streak"
            />
          </div>

          <Separator className="mb-2 h-0.5 rounded-full b-slate-500" />

          <Badges/>

        </div>
      </FeedWrapper>
    </div>
  );
};

export default Profile;