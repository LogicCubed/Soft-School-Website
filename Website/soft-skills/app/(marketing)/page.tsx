import Section from "@/app/(marketing)/section";
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
            <h1 className="text-xl lg:text-3xl font-bold text-neutral-600 max-w-[480px] text-center">
              Learn, practice, and Master your Soft Skills
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
      <Section
          title="Engaging Modules"
          description="Lorem ipsum dolor sit amet. Et nisi sunt eum sint culpa non nisi dignissimos ad officia soluta. Est quisquam earum ut magni optio quo consequatur mollitia ea consectetur necessitatibus."
          imageSrc="/softy-assets/softyhappy.svg"
      />
      <Section
          title="Games"
          description="Lorem ipsum dolor sit amet. Et nisi sunt eum sint culpa non nisi dignissimos ad officia soluta. Est quisquam earum ut magni optio quo consequatur mollitia ea consectetur necessitatibus."
          imageSrc="/softy-assets/softyhappy.svg"
          reverse
      />
    </div>
  );
}