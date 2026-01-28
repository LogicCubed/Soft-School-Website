import Image from "next/image";

type SectionProps = {
  title: string;
  description: string;
  imageSrc: string;
  reverse?: boolean;
};

const Section = ({ title, description, imageSrc, reverse = false }: SectionProps) => {
  return (
    <section className="w-[60vw] mx-auto py-12">
      <div className={`flex flex-col md:flex-row items-center gap-12 md:gap-40 ${reverse ? "md:flex-row-reverse" : ""}`}>
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-extrabold text-sky-400 tracking-wide mb-5">{title}</h2>
          <p className="text-lg text-gray-500">{description}</p>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <Image
            src={imageSrc}
            alt={title}
            height={325}
            width={325}
            className="relative overflow-hidden"
          />
        </div>
      </div>
    </section>
  );
};

export default Section;