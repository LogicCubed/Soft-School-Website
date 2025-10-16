"use client";

type Props = {
  title: string;
  children: React.ReactNode;
};

export const Category = ({ title, children }: Props) => {
  return (
    <div className="w-full mt-6">
      <h2 className="text-3xl text-sky-400 font-extrabold mb-3">{title}</h2>
      <div className="border-t-4 border-slate-500">{children}</div>
    </div>
  );
};