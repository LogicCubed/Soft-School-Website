import { FeedWrapper } from "@/components/feed-wrapper";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Profile from "./profile";
import { getUserProgress } from "@/db/queries";

const UserProfilePage = async () => {
  const userProgressData = (await getUserProgress()) ?? null;
  const imageSrc = userProgressData?.userImageSrc ?? "/profile.svg";

  return (
    <div className="flex flex-col lg:flex-row-reverse lg:gap-[48px] px-4 sm:px-6 lg:px-6">
      <FeedWrapper>
        <div className="w-full flex flex-col items-center text-center">
          <Avatar className="w-24 h-24 mb-2">
            <AvatarImage
              className="object-cover"
              src={imageSrc}
            />
          </Avatar>

          <h1 className="mb-6 text-3xl sm:text-4xl font-extrabold text-sky-400 text-center">
            User Profile
          </h1>

          <div className="w-full">
            <Profile stats={userProgressData} />
          </div>
        </div>
      </FeedWrapper>
    </div>
  );
};

export default UserProfilePage;