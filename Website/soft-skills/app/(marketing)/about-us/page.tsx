import Section from "../section";

export default function Page() {
  return (
    <div className="w-full">
      <div className="w-[60vw] mx-auto text-left text-4xl font-extrabold text-sky-600 tracking-wide mb-10 mt-10">
        About Us
      </div>
      <div className="w-[60vw] mx-auto border-b border-gray-300"></div>

      <div className="w-[70vw] mx-auto space-y-10 mb-20">
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
      </div>
    </div>
  );
}