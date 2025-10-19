import { FeedWrapper } from "@/components/feed-wrapper";
import { getUserProgress } from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Items } from "./items";
import { UserPoints } from "@/app/(main)/shop/user-points";
import { Category } from "./category";

const ShopPage = async () => {
    const userProgressData = getUserProgress();

    const [
        userProgress
    ] = await Promise.all([
        userProgressData,
    ]);

    if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses");
    }

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <FeedWrapper>
                <div className="w-full flex flex-col items-center mb-10">
                    <Image
                        src="/shop.svg"
                        alt="Shop"
                        height={90}
                        width={90}
                    />
                    <h1 className="mb-6 text-3xl sm:text-4xl font-extrabold text-sky-400 text-center">
                        Shop
                    </h1>
                    <div className="text-white text-center text-lg mb-6">
                        Purchase cosmetics and more for your avatar!
                    </div>
                    <div className="justify-center">
                        <UserPoints
                            points={userProgress.points}
                        />
                    </div>
                    <Category title="Power-Ups">
                        <Items points={userProgress.points} />
                        <Items points={userProgress.points} />
                    </Category>
                    <Category title="Cosmetics">
                        <Items points={userProgress.points} />
                        <Items points={userProgress.points} />
                    </Category>
                    <Category title="Pets">
                        <Items points={userProgress.points} />
                        <Items points={userProgress.points} />
                    </Category>
                    <Category title="Themes">
                        <Items points={userProgress.points} />
                        <Items points={userProgress.points} />
                    </Category>
                </div>
            </FeedWrapper>
        </div>
    );
};

export default ShopPage;