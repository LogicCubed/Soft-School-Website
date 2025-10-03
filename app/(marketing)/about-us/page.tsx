import Section from "../section";

export default function Page() {
  return (
    <div className="w-full">
      <div className="w-[60vw] mx-auto text-left text-4xl font-extrabold text-sky-400 tracking-wide mb-10 mt-10">
        About Us
      </div>
      <div className="w-[60vw] mx-auto border-b border-gray-300"></div>
      <div className="w-[60vw] mx-auto py-8 text-left">
        <h2 className="text-3xl font-extrabold text-sky-400 mb-4">Soft Skills</h2>
        <p className="italic text-gray-400 text-lg mb-6">/sôft skils/</p>
        <p className="text-gray-400 text-xl">
          Personal attributes that enable someone to interact effectively and harmoniously with other people.
        </p>
      </div>
      <div className="w-[60vw] mx-auto border-b border-gray-300"></div>
      <div className="w-[70vw] mx-auto space-y-10 mb-20">
        <Section
          title="Our Mission"
          description="SoftSchool was created to open doors that were never available before — a space where students can build confidence, communicate more openly, and learn to thrive both in and out of the classroom. The goal is to foster growth in self-awareness, empathy, and real-world communication, empowering a generation to better understand themselves and each other."
          imageSrc="/softy-assets/softyhappy.svg"
        />
        <div className="w-[60vw] mx-auto border-b border-gray-300"></div>
        <Section
          title="Empowering communication through empathy"
          description="Kids today are facing real emotional and social challenges — anxiety, isolation, and pressure — but often without tools or spaces to talk about them. We’re building what we wish we had: a platform where students learn to express themselves, understand others, and build real connections through Soft Skills."
          imageSrc="/softy-assets/softygaming.svg"
          reverse
        />
        <div className="w-[60vw] mx-auto border-b border-gray-300"></div>
        <Section
          title="Making Soft Skills second nature"
          description="Screens are everywhere, but real-world communication is getting harder. Our approach turns critical Soft Skills — like active listening, teamwork, and conflict resolution — into interactive, gamified experiences that feel more like fun than a chore. Kids don’t just learn them — they live them."
          imageSrc="/softy-assets/softyglasses.svg"
        />
      </div>
    </div>
  );
}