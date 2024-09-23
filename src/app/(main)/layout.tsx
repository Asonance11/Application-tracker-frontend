import Navbar from "@/components/common/Navbar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <section>
      <Navbar />
      {children}
    </section>
  );
};

export default MainLayout;
