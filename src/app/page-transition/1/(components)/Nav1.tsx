import Link from "next/link";

const Nav1 = () => {
  return (
    <nav className="fixed w-[100vw] p-8 flex justify-between items-center z-1 uppercase font-[dm-mono] font-medium text-[0.9rem] text-black">
      <div className="text-[1.25rem]">
        <Link href={"/"}>Silhouette</Link>
      </div>
      <div className="flex gap-8">
        <Link href={"/page-transition/1"}>Home</Link>
        <Link href={"/page-transition/1/archive"}>Archive</Link>
        <Link href={"/page-transition/1/contact"}>Contact</Link>
      </div>
    </nav>
  );
};
export default Nav1;
