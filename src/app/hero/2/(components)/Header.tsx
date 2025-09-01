import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-screen h-30 py-5 z-10">
      <div className="hero-2-nav flex items-center justify-between px-10 relative bg-white rounded-4xl mx-auto w-[80%] h-full drop-shadow-sm">
        {/* mobile nav */}
        <div className="relative lg:hidden text-neutral-800 font-bold group">
          <button className="relative z-20">menu</button>
          <nav className="absolute pt-15 top-0 -left-1/2 invisible group-hover:visible">
            <div className="drop-shadow-sm rounded-2xl bg-white flex flex-col gap-5 p-5">
              <Link href={""}>About</Link>
              <Link href={""}>Shop</Link>
              <Link href={""}>Learn</Link>
            </div>
          </nav>
        </div>

        {/* desktop nav */}
        <nav className="font-bold invisible lg:visible flex gap-5 text-neutral-800">
          <Link href={""}>About</Link>
          <Link href={""}>Shop</Link>
          <Link href={""}>Learn</Link>
        </nav>

        <Link href={""} className="text-blue-600 font-bold">
          Cart
        </Link>
      </div>

      <h1 className="title absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  font-black text-nowrap text-[80px] origin-center text-[#0693e3] transition-[scale]">
        Ethical Life
      </h1>
    </header>
  );
};
export default Header;
