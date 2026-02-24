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

            <Category title="Power-Ups" titleColor="#fcb02b">
              <Item
                points={20}
                name="Streak Freeze"
                cost={20}
                imageSrc="/shop/streak_freeze.png"
                description="Freezes your precious streak for 24 hours!"
              />
              <Item
                points={30}
                name="XP Boost"
                cost={30}
                imageSrc="/shop/exp_boost.png"
                description="Boost your points earned by 2x for 2 hours!"
              />
            </Category>

            <Category title="Cosmetics" titleColor="#f472b6">
              <Item
                points={15}
                name="Baseball Cap"
                cost={15}
                imageSrc="/shop/baseball_cap.png"
                description="Lookin' cool!"
              />
              <Item
                points={100}
                name="Crown"
                cost={100}
                imageSrc="/shop/crown.png"
                description="You look like royalty!"
              />
            </Category>

            <Category title="Pets" titleColor="#34d399">
              <Item
                points={100}
                name="Dog"
                cost={100}
                imageSrc="/shop/dog.png"
                description="A loyal companion!"
              />
              <Item
                points={100}
                name="Cat"
                cost={100}
                imageSrc="/shop/cat.png"
                description="Nothing cozier than a cat!"
              />
              <Item
                points={200}
                name="Dragon"
                cost={200}
                imageSrc="/shop/dragon.png"
                description="The friendliest dragon out there!"
              />
            </Category>

            <Category title="Themes" titleColor="#818cf8">
              <Item
                points={100}
                name="Sports"
                cost={100}
                imageSrc="/shop/sports.png"
                description="Feelin' Athletic?"
              />
              <Item
                points={200}
                name="Space"
                cost={200}
                imageSrc="/shop/spaceship.png"
                description="Reach for the Stars!"
              />
            </Category>
          </div>
        </FeedWrapper>
      </div>
    </>
  );
};

export default ShopPage;