import { Cabin, DM_Mono } from "next/font/google";
import PageTransition1 from "./(components)/PageTransition1";
import Nav1 from "./(components)/Nav1";

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: "500",
  style: "normal",
  display: "swap",
});

const cabin = Cabin({
  variable: "--font-cabin",
  subsets: ["latin"],
  style: "normal",
  display: "swap",
});

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className={`${cabin.className} ${dmMono.variable}`}>
      <PageTransition1>
        <Nav1 />
        {children}
      </PageTransition1>
    </main>
  );
};
export default Layout;
