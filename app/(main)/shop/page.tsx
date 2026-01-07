import { FeedWrapper } from "@/components/feed-wrapper";
import { getUserProgress } from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";
import { UserPoints } from "@/app/(main)/shop/user-points";
import { Category } from "./category";
import { Item } from "./items";

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
                        <Item
                            points={100}
                            name="Test Item"
                            cost={20}
                            imageSrc="/softy-assets/softyhappy.svg"
                            description="Temporary Description"
                        />
                        <Item
                            points={100}
                            name="Test Item"
                            cost={20}
                            imageSrc="/softy-assets/softyhappy.svg"
                            description="Temporary Description"
                        />
                    </Category>
                    <Category title="Cosmetics">
                        <Item
                            points={100}
                            name="Test Item"
                            cost={20}
                            imageSrc="/softy-assets/softyhappy.svg"
                            description="Temporary Description"
                        />
                        <Item
                            points={100}
                            name="Test Item"
                            cost={20}
                            imageSrc="/softy-assets/softyhappy.svg"
                            description="Temporary Description"
                        />
                    </Category>
                    <Category title="Pets">
                        <Item
                            points={100}
                            name="Test Item"
                            cost={20}
                            imageSrc="/softy-assets/softyhappy.svg"
                            description="Temporary Description"
                        />
                        <Item
                            points={100}
                            name="Test Item"
                            cost={20}
                            imageSrc="/softy-assets/softyhappy.svg"
                            description="Temporary Description"
                        />
                    </Category>
                    <Category title="Themes">
                        <Item
                            points={100}
                            name="Test Item"
                            cost={20}
                            imageSrc="/softy-assets/softyhappy.svg"
                            description="Temporary Description"
                        />
                        <Item
                            points={100}
                            name="Test Item"
                            cost={20}
                            imageSrc="/softy-assets/softyhappy.svg"
                            description="Temporary Description"
                        />
                    </Category>
                </div>
            </FeedWrapper>
        </div>
    );
};

export default ShopPage;