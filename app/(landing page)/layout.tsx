import { Header } from "./header";
import { Footer } from "./footer";

type Props = {
  children: React.ReactNode;
}

const MarketingLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 w-full flex flex-col items-center justify-center pb-50 overflow-x-hidden">
        {children}
      </div>

      <Footer />
    </div>
  );
};

export default MarketingLayout;