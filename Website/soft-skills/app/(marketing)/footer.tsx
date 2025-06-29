import { FooterColumns } from "./footercolumns";

export const Footer = () => {
  const footerData = [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Press" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", href: "/help" },
        { label: "Contact Us", href: "/contact" },
        { label: "Privacy Policy", href: "/privacy" },
      ],
    },
    {
      title: "Learn",
      links: [
        { label: "Courses", href: "/courses" },
        { label: "Blog", href: "/blog" },
        { label: "Tutorials" },
      ],
    },
    {
      title: "Follow Us",
      links: [
        { label: "Twitter", href: "https://twitter.com" },
        { label: "Facebook", href: "https://facebook.com" },
        { label: "Instagram", href: "https://instagram.com" },
      ],
    },
  ];

  return (
    <footer className="bg-sky-400 border-t border-gray-300">
      <FooterColumns columns={footerData} />
      <div className="text-center text-sm text-white text-opacity-50 font-bold py-4">
        © {new Date().getFullYear()} Soft School. All rights reserved.
      </div>
    </footer>
  );
};