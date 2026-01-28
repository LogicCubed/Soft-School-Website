import Section from "@/app/(landing page)/section";
import { Button } from "@/components/ui/button";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Middle } from "./middle";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="max-w-[988px] mx-auto w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
          <div className="relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0">
            <Image src="/softy-assets/softylogin.svg" fill alt="Logo"/>
          </div>
          <div className="flex flex-col items-center gap-y-8">
            <h1 className="text-xl lg:text-4xl font-bold text-sky-500 max-w-[480px] text-center">
              Build, Apply, and Refine Your Soft Skills
            </h1>
            <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
              <ClerkLoading>
                <Loader className="h-5 w-5 text-muted-foreground animate-spin"/>
              </ClerkLoading>
              <ClerkLoaded>
                <SignedOut>
                  <SignUpButton>
                    <Button size="lg" variant="secondary" className="w-full cursor-pointer">
                      Get Started
                    </Button>
                  </SignUpButton>
                  <SignInButton mode="modal">
                    <Button size="lg" variant="primaryOutline" className="w-full cursor-pointer">
                      I already have an account
                    </Button>
                  </SignInButton>
                </SignedOut>
                <SignedIn>
                  <Button size="lg" variant="secondary" className="w-full" asChild>
                    <Link href="/learn">
                      Continue Learning
                    </Link>
                  </Button>
                </SignedIn>
              </ClerkLoaded>
            </div>
          </div>
        </div>
      </div>

      <Middle />

      <div className="mt-20 mb-20">
        <Section
          title="Engaging Modules"
          description="Learn soft skills through interactive modules that blend real-life scenarios with practical exercises. Each lesson is crafted to build confidence, boost communication, and help you grow—one step at a time."
          imageSrc="/softy-assets/softyglasses.svg"
        />
        <Section
          title="Games"
          description="Put your skills to the test with fun, replayable games designed to reinforce what you've learned. Every challenge sharpens your thinking, builds habits, and keeps you coming back for more!"
          imageSrc="/softy-assets/softygaming.svg"
          reverse
        />
        {/* TODO: Would be really great if we could officially showcase this, wouldn't it? */}
        {/*
        <div className="mt-20 gap-5 flex items-center justify-center">
            <Image
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="Download on the App Store"
              width={270}
              height={80}
            />
            <Image
              src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
              alt="Get it on Google Play"
              width={340}
              height={80}
            />
        </div>
        */}
      </div>
    </div>
  );
}