import { FeedWrapper } from "@/components/feed-wrapper";
import { getUserProgress } from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Category } from "./category";
import { Item, UserPointsProvider } from "./items";
import Head from "next/head";
import { UserPoints } from "./user-points";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { StickyFooter } from "@/components/sticky-footer";
import Customization from "../profile/customization";

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
        <StickyWrapper>
          <UserPoints points={userProgress.points}/>
          <Customization/>
          <StickyFooter/>
        </StickyWrapper>
        <FeedWrapper>
          <UserPointsProvider points={userProgress.points}>
            <div className="w-full flex flex-col items-center mb-10">
              <header className="flex flex-col items-center mb-6">
                <Image src="/icons/shop.svg" alt="Shop" height={90} width={90} />
                <div className="flex items-center gap-2 relative group">
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-sky-400 text-center">
                    Shop
                  </h1>
                  <Image
                    src="/icons/info.png"
                    alt="info"
                    height={24}
                    width={24}
                    className="cursor-pointer translate-y-1"
                  />
                  <div className="absolute top-1/2 left-full ml-4 transform -translate-y-1/2
                                  border-4 bg-slate-700 border-slate-500 text-white text-left font-semibold
                                  px-4 py-2 z-50 rounded opacity-0 group-hover:opacity-100 transition-opacity
                                  min-w-40 max-w-75 wrap-break-word">
                    <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-0 h-0 z-0
                                    border-t-12 border-b-12 border-r-12 border-t-transparent border-b-transparent border-r-slate-500" />
                    You can earn more stars by completing lessons, games, puzzles, and increasing your soft streak!
                  </div>
                </div>
              </header>

              <Category title="Power-Ups" titleColor="#fcb02b">
                <Item
                  name="Streak Freeze"
                  cost={20}
                  imageSrc="/shop/streak_freeze.png"
                  description="Freezes your precious streak for 24 hours!"
                />
                <Item
                  name="XP Boost"
                  cost={30}
                  imageSrc="/shop/exp_boost.png"
                  description="Boost your points earned by 2x for 2 hours!"
                />
              </Category>

              <Category title="Cosmetics" titleColor="#f472b6">
                <Item
                  name="Baseball Cap"
                  cost={15}
                  imageSrc="/shop/baseball_cap.png"
                  description="Lookin' cool!"
                />
                <Item
                  name="Cowboy Hat"
                  cost={25}
                  imageSrc="/shop/cowboy_hat.png"
                  description="Yeehaw!"
                />
                <Item
                  name="Crown"
                  cost={100}
                  imageSrc="/shop/crown.png"
                  description="You look like royalty!"
                />
              </Category>

              <Category title="Pets" titleColor="#34d399">
                <Item
                  name="Dog"
                  cost={100}
                  imageSrc="/shop/dog.png"
                  description="A loyal companion!"
                />
                <Item
                  name="Cat"
                  cost={100}
                  imageSrc="/shop/cat.png"
                  description="Nothing cozier than a cat!"
                />
                <Item
                  name="Dragon"
                  cost={200}
                  imageSrc="/shop/dragon.png"
                  description="The friendliest dragon out there!"
                />
              </Category>

              <Category title="Themes" titleColor="#818cf8">
                <Item
                  name="Sports"
                  cost={100}
                  imageSrc="/shop/sports.png"
                  description="Feelin' Athletic?"
                />
                <Item
                  name="Space"
                  cost={200}
                  imageSrc="/shop/spaceship.png"
                  description="Reach for the Stars!"
                />
              </Category>
            </div>
          </UserPointsProvider>
        </FeedWrapper>
      </div>
    </>
  );
};

export default ShopPage;