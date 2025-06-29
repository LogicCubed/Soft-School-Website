type FooterColumnProps = {
  title: string;
  links: { label: string; href?: string }[];
};

export const FooterColumns = ({ columns }: { columns: FooterColumnProps[] }) => {
  return (
    <div className="max-w-screen-lg mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-white">
      {columns.map(({ title, links }) => (
        <div key={title}>
          <h4 className="mb-4 font-extrabold text-lg text-white text-opacity-90">{title}</h4>
          <ul className="space-y-2">
            {links.map(({ label, href }) => (
              <li key={label}>
                {href ? (
                  <a
                    href={href}
                    className="hover:underline font-bold text-white text-opacity-50"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {label}
                  </a>
                ) : (
                  <span className="font-bold text-white text-opacity-50">{label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};