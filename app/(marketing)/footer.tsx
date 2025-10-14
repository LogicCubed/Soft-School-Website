import { FooterColumns } from "./footercolumns";

export const Footer = () => {
  const footerData = [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about-us" },
        { label: "Courses", href: "/course-catalogue" }
      ],
    },
    {
      title: "Help and Support",
      links: [
        { label: "Soft School FAQs", href: "/help" },
        { label: "Contact Us", href: "/contact" },
      ],
    },
    {
      title: "Privacy and Terms",
      links: [
        { label: "Terms", href: "/terms" },
        { label: "Privacy", href: "/privacy" },
      ],
    },
    {
      title: "Social",
      links: [
        { label: "Instagram", href: "https://www.instagram.com/softschoolapp/" },
        { label: "Facebook", href: "https://facebook.com" },
        { label: "TikTok", href: "https://www.tiktok.com/@softschoolapp" },
        { label: "Twitter", href: "https://x.com/softschoolapp" },
        { label: "Youtube", href: "https://www.youtube.com/@SoftSchoolApp" },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/soft-school-app-5477b3374?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
      ],
    },
  ];

  return (
    <footer className="relative bg-sky-400">
      <div className="absolute top-0 left-0 w-full -translate-y-2/3 -z-10">
        <img src="/wave.svg" alt="Wave" className="w-full h-auto" />
      </div>

      <FooterColumns columns={footerData} />

      <div className="text-center text-sm text-white text-opacity-50 font-bold py-4">
        © {new Date().getFullYear()} Soft School. All rights reserved.
      </div>
    </footer>
  );
};