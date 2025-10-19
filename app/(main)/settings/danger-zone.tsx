"use client";

import { Button } from "@/components/ui/button";

type Props = {
  onReset: () => void;
};

export const DangerZone = ({ onReset }: Props) => {
  return (
    <section className="my-6 w-full">
      <h1 className="font-bold text-rose-500 text-2xl text-center sm:text-left mb-6">
        DANGER ZONE
      </h1>

      <Button
        variant="danger"
        className="cursor-pointer mb-10 sm:mb-5 self-center sm:self-start"
        onClick={onReset}
      >
        RESET PROGRESS
      </Button>
    </section>
  );
};