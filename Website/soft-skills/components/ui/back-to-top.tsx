"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "./button";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative w-full">
      <Button
        variant="primary"
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`absolute right-4 bottom-10 sm:bottom-12 md:bottom-8 z-50 w-12 h-12 p-0 rounded-md cursor-pointer
          transition-transform duration-300 ease-in-out
          ${visible 
            ? "opacity-100 scale-100 pointer-events-auto delay-[150ms]" 
            : "opacity-0 scale-0 pointer-events-none delay-0"
          }
        `}
        style={{ transformOrigin: "center" }}
      >
        <ArrowUp className="w-8 h-8 stroke-[4]" />
      </Button>
    </div>
  );
}