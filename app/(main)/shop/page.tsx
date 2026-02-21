import { FeedWrapper } from "@/components/feed-wrapper";
import { getUserProgress } from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";
import { UserPoints } from "@/app/(main)/shop/user-points";
import { Category } from "./category";
import { Item } from "./items";
import Head from "next/head";

const ShopPage = async () => {
  const userProgressData = getUserProgress();

  const [userProgress] = await Promise.all([userProgressData]);

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  return (
    <>
      <Head>
        <title>Shop</title>
        <meta
          name="description"
          content="Purchase cosmetics, power-ups, pets, and themes for your avatar. Track your points and customize your experience in the Soft Skills app."
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="flex flex-row-reverse gap-12 px-6">
        <FeedWrapper>
          <div className="w-full flex flex-col items-center mb-10">
            <header className="flex flex-col items-center mb-6">
              <Image src="/icons/shop.svg" alt="Shop" height={90} width={90} />
              <h1 className="text-3xl sm:text-4xl font-extrabold text-sky-400 text-center">
                Shop
              </h1>
              <p className="text-white text-center text-lg">
                Purchase cosmetics and more for your avatar!
              </p>
            </header>

            <div className="justify-center mb-6">
              <UserPoints points={userProgress.points} />
            </div>

            <Category title="Power-Ups">
              <Item
                points={100}
                name="Streak Freeze"
                cost={20}
                imageSrc="/shop/streak_freeze.png"
                description="Freezes your precious streak for 24 hours!"
              />
              <Item
                points={100}
                name="XP Boost"
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
    </>
  );
};

export default ShopPage;