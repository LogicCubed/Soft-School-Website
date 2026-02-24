"use client";

type Props = {
  title: string;
  children: React.ReactNode;
  titleColor?: string;
};

export const Category = ({
  title,
  children,
  titleColor = "#38bdf8",
}: Props) => {
  return (
    <div className="w-full mt-6">
      <h2
        className="text-3xl font-extrabold mb-3"
        style={{ color: titleColor }}
      >
        {title}
      </h2>
      <div className="border-t-4 border-slate-500">
        {children}
      </div>
    </div>
  );
};