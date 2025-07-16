"use client";

import Image from "next/image";
import { useLoading } from "@/store/loadingStore";
import { useEffect, useState, useRef } from "react";

export const LoadingScreen = () => {
  const isLoading = useLoading((s) => s.isLoading);
  const [show, setShow] = useState(false);
  const [visible, setVisible] = useState(false);

  const startTimeRef = useRef<number | null>(null);
  const fadeDuration = 500;
  const minDisplayTime = 2000;

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isLoading) {
      setShow(true);
      if (!startTimeRef.current) {
        startTimeRef.current = Date.now();
      }
      setTimeout(() => setVisible(true), 10);
    } else {
      const elapsed = startTimeRef.current ? Date.now() - startTimeRef.current : 0;
      const remainingTime = minDisplayTime - elapsed;

      timeout = setTimeout(() => {
        setVisible(false);

        timeout = setTimeout(() => {
          setShow(false);
          startTimeRef.current = null;
        }, fadeDuration);
      }, remainingTime > 0 ? remainingTime : 0);
    }

    return () => clearTimeout(timeout);
  }, [isLoading]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <Image
        src="/softy-assets/softyhappy.svg"
        alt="Softy"
        width={100}
        height={100}
        className="animate-bounce mb-4"
      />
      <div className="text-2xl font-bold animate-pulse text-sky-400">
        LOADING...
      </div>
    </div>
  );
};