import Section from "../section";

export default function Page() {
  return (
    <div className="w-full">
      <div className="w-[60vw] mx-auto text-left text-4xl font-extrabold text-sky-400 tracking-wide mb-10 mt-10">
        Course Catalogue
      </div>
      <div className="w-[60vw] mx-auto border-b border-gray-300"></div>

      <div className="w-[70vw] mx-auto space-y-10 mb-20">
        <Section
          title="Conflict Resolution"
          description="Learn how to manage disagreements constructively. This course teaches you to listen actively, stay calm under pressure, and find common ground—skills that improve relationships at school, work, and beyond."
          imageSrc="/courses/conflictresolution.svg"
        />
        <Section
          title="Problem Solving"
          description="Master the art of thinking critically and acting decisively. This course walks you through step-by-step approaches to analyze challenges, explore solutions, and make confident decisions in real-life situations."
          imageSrc="/courses/problemsolving.svg"
          reverse
        />
        <Section
          title="Teamwork"
          description="Develop collaboration skills that help you thrive in group settings. From communication to accountability, this course covers everything you need to become a reliable and respected team player."
          imageSrc="/courses/teamwork.svg"
        />
        <Section
          title="Speaking"
          description="Build the confidence to speak clearly and be heard. Whether it's class presentations or group discussions, this course helps you organize your thoughts and express yourself with clarity and purpose."
          imageSrc="/courses/speaking.svg"
          reverse
        />
      </div>
    </div>
  );
}