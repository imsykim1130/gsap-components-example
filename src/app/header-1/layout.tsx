import Header1 from "@/components/header/Header1";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header1 />
      {children}
    </>
  );
};

export default Layout;
