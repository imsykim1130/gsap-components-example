import Header1 from "@/app/header/1/(components)/Header1";

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
