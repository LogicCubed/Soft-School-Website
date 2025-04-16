import { FeedWrapper } from "@/components/feed-wrapper";
import Image from "next/image";

const UserProfilePage = async () => {
    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <FeedWrapper>
                <div className="w-full flex flex-col items-center">
                    <Image
                        src="/profile.svg"
                        alt="Profile"
                        height={90}
                        width={90}
                    />
                    <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                        User Profile
                    </h1>
                    <p className="text-muted-foreground text-center text-lg mb-6">
                        View and Edit your User Profile!
                    </p>
                </div>
            </FeedWrapper>
        </div>
    );
};

export default UserProfilePage;