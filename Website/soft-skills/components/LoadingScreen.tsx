"use client";

import Image from "next/image";
import { useLoading } from "@/store/loadingStore";
import { useEffect, useState } from "react";

export const LoadingScreen = () => {
  const isLoading = useLoading((s) => s.isLoading);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isLoading) {
      setShow(true);
    } else {
      // When loading ends, wait 2 seconds before hiding
      timeout = setTimeout(() => setShow(false), 2000);
    }

    return () => clearTimeout(timeout);
  }, [isLoading]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white">
      <Image
        src="/softy-assets/softyhappy.svg"
        alt="Softy"
        width={100}
        height={100}
        className="animate-bounce mb-4"
      />
      <div className="text-2xl font-bold animate-pulse text-sky-500">
        Loading...
      </div>
    </div>
  );
};