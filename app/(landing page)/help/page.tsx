"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";

const faqSections = [
  {
    title: "Account",
    faqs: [
      {
        question: "How do I reset my password?",
        answer:
          "To reset your password, go to the login page and click on 'Forgot Password'. Follow the instructions sent to your email.",
      },
    ],
  },
  {
    title: "Using Soft Skills",
    faqs: [
      {
        question: "Can I access lessons offline?",
        answer:
          "Currently, lessons require an internet connection. Offline mode is planned for a future update.",
      },
      {
        question: "How do I find, follow, and block users on Soft School?",
        answer:
          "When you follow someone, they’ll show up on your friends list and you can encourage each other to stick with your Soft Skill goals!",
      },
    ],
  },
];

export default function Page() {
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  const toggleIndex = (key: string) => {
    setOpenIndex(openIndex === key ? null : key);
  };

  return (
    <div className="w-full">
      <div className="w-[60vw] mx-auto text-left text-4xl font-extrabold text-sky-400 tracking-wide mb-10 mt-10">
        Help
      </div>
      <div className="w-[60vw] mx-auto border-b border-gray-300"></div>

      <div className="space-y-12 mt-8 w-[60vw] mx-auto">
        {faqSections.map(({ title, faqs }, sectionIndex) => (
          <div
            key={title}
            className="bg-white rounded-2xl border border-gray-200"
          >
            <h3 className="px-6 py-4 font-bold text-lg text-sky-400">
              {title}
            </h3>
            <hr className="border-gray-300 mx-6" />

            {faqs.map(({ question, answer }, i) => {
              const key = `${sectionIndex}-${i}`;
              return (
                <div key={key}>
                  <button
                    onClick={() => toggleIndex(key)}
                    className="cursor-pointer w-full flex justify-between items-center px-6 py-4 text-left text-lg font-semibold text-gray-900 focus:outline-none"
                  >
                    <span>{question}</span>
                    <span
                      className={`transform transition-transform duration-300 ${
                        openIndex === key ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    >
                      ▼
                    </span>
                  </button>

                  {/* Divider except last question */}
                  {i < faqs.length - 1 && (
                    <hr className="border-gray-300 mx-6" />
                  )}

                  {/* Answer panel */}
                  {openIndex === key && (
                    <div className="px-6 py-4 text-gray-700">
                      <p>{answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="w-[60vw] mx-auto text-center mt-12 mb-20">
        <p className="text-lg font-bold text-sky-400 mb-4">
          Still unsure about something?
        </p>
        <Button variant="primary" className="cursor-pointer font-extrabold">
          CONTACT SUPPORT
        </Button>
      </div>
    </div>
  );
}