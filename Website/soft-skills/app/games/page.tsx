"use client";

import { useEffect } from "react";
import { useLoading } from "@/store/loadingStore";
import { LoadingScreen } from "@/components/LoadingScreen";

export default function Page() {
  const setLoading = useLoading((state) => state.setLoading);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <>
      <LoadingScreen />
      <div>
        <h1>GAMES</h1>
      </div>
    </>
  );
}