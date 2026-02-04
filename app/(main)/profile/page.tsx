import { FeedWrapper } from "@/components/feed-wrapper";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Profile from "./profile";
import { getUserProgress } from "@/db/queries";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { StickyFooter } from "@/components/sticky-footer";
import Customization from "./customization";
import Head from "next/head";

const UserProfilePage = async () => {
  const userProgressData = (await getUserProgress()) ?? null;
  const imageSrc = userProgressData?.userImageSrc ?? "/profile.svg";

  return (
    <>
      <Head>
        <title>User Profile</title>
        <meta
          name="description"
          content="View and customize your user profile. Track your progress and personal information within your Soft Skills account."
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="flex flex-col lg:flex-row-reverse lg:gap-[48px] px-4 sm:px-6 lg:px-6">
        <StickyWrapper>
          <Customization />
          <StickyFooter />
        </StickyWrapper>

        <FeedWrapper>
          <main className="w-full flex flex-col items-center text-center">
            <Avatar className="w-24 h-24 mb-2">
              <AvatarImage className="object-cover" src={imageSrc} />
            </Avatar>

            <header className="mb-6 text-center">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-sky-400">
                User Profile
              </h1>
            </header>

            <section className="w-full">
              <Profile stats={userProgressData} />
            </section>
          </main>
        </FeedWrapper>
      </div>
    </>
  );
};

export default UserProfilePage;