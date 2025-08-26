"use client";
import Image from "next/image";
import Link from "next/link";
import "./style.scss";
import { useState } from "react";

const Page = () => {
  return (
    <div className="font-montserrat">
      <Header />
      <main className="px-10 pt-30 w-screen h-screen flex justify-center bg-[url(/header2-bg.png)] bg-cover bg-center">
        
      </main>
    </div>
  );
};

const Header = () => {
  const navItems = [
    { href: "/header/2", label: "Home" },
    { href: "/header/2/goals", label: "Goals" },
    { href: "/header/2/about", label: "About" },
  ];

  const menus = [{
    title: "Protect and build trust",
    subMenus: ["Safeguarding against fraud",
      "better, safer biometric checkout",
      "Identifying your cyber risks and preventing attacks",]
  }, {
    title: "Strengthen customer relationships",
    subMenus: ["A tailored loyalty approach",
      "The loyalty evolution",
      "Optimizing loyalty engagement",]
  }, {
    title: "Make data-guided decisions",
    subMenus: ["Insights into customer spending",
      "Revolutionizing spend analytics",
      "Maximizing profitability",]
  }, {
    title: "Drive business growth",
    subMenus: ["Unlocking growth opportunities",
      "Expanding your business reach",
      "Innovative solutions for growth",]
  }, {
    title: "Enhance operational efficiency",
    subMenus: ["Streamlining operations",
      "Optimizing payment processes",
      "Boosting operational performance",]
  }]

  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <header className="fixed top-0 left-0 w-full">
      <div className="relative z-10 flex items-center w-fit mx-auto my-6 px-5 py-3 backdrop-blur-[10px] bg-white/10 rounded-full">
        <Image
          src={"/mastercard.svg"}
          width={50}
          height={50}
          alt="logo"
        />

        <nav className="flex gap-6 ml-6 text-white font-semibold text-[14px] group">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-menu={item.label}
              className="h-[18px]"
              style={{
                clipPath: "inset(0 0 0 0)",
              }}
            >
              <div className="hover:-translate-y-1/2 transform-content duration-500 ease-in-out">
                <div>{item.label}</div>
                <div aria-hidden>{item.label}</div>
              </div>
            </Link>
          ))}
        </nav>

        <button
          className="relative menu-icon ml-6 size-8 rounded-full border-[1px] border-white/30 cursor-pointer hover:border-white/60 transform-border duration-300 ease-in-out"
          onClick={() => {
            setMenuOpen(!menuOpen);
          }}
        ></button>
      </div>

      <div
        className={`fixed inset-0 z-20 ${menuOpen ? "visible" : "opacity-0 invisible"}`}
      >
        <div className="w-[90%] max-w-[1000px] h-[80%] mx-auto my-6 rounded-2xl bg-white p-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <Image
                src={"/mastercard.svg"}
                width={50}
                height={50}
                alt="logo"
              />
              <div className="flex items-center gap-10 text-[14px] font-semibold">
                <Link
                  href={"/header/2"}
                  className="hover:text-orange-500 transform-content duration-200 ease-in-out"
                >
                  Home
                </Link>
                <Link
                  href={"/header/2"}
                  className="hover:text-orange-500 transform-content duration-200 ease-in-out"
                >
                  Goals | 06
                </Link>
              </div>
            </div>

            <div
              className="size-5 menu-close"
              onClick={() => {
                setMenuOpen(false);
              }}
            ></div>
          </div>
          <nav className="mt-15">
              {menus.map((menu) => (
                <Menu key={menu.title} {...menu}/>
              ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

const Menu = ({title, subMenus = ["Safeguarding against fraud",
    "better, safer biometric checkout",
    "Identifying your cyber risks and preventing attacks",]}:{title: string, subMenus?: string[]}) => {

  const [subOpen, setSubOpen] = useState<boolean>(false);

  return (
    <div className="flex gap-15 font-medium cursor-pointer mt-10">
      <p className="text-neutral-400 text-[0.9rem] translate-y-2">01</p>
      <div className="flex flex-1 flex-col border-b-[1px] border-neutral-200 pb-10">
        <div className="flex justify-between">
          <Link href={""} className={`relative text-2xl lg:text-4xl font-semibold`}>
            {title}
            <span className="absolute text-[0.9rem] text-neutral-400 flex justify-center items-center top-[-0.2rem] right-[-2.2rem] size-7 rounded-full border-[1px] border-neutral-200">{subMenus.length}</span>
          </Link>
          <div className={`border-[1px] border-neutral-200 object-center w-8 h-8 hover:w-12 hover:bg-orange-500 hover:text-white rounded-full flex items-center justify-center transform-content duration-500 ease-in-out`} onClick={() => setSubOpen(!subOpen)}>
            <Arrow className={`${subOpen ? 'rotate-180' : 'rotate-0'} transition-transform duration-200 ease-in-out`}/>
          </div>
        </div>
        {subMenus.length > 0 && (<ul className={`${subOpen ? 'flex' : 'hidden'} flex-col gap-5 pt-10 text-[0.9rem] text-neutral-400 font-semibold`}>
          {subMenus.map((menu) => (
            <li
              key={menu}
              className="hover:text-neutral-700 transition-color"
            >
              {menu}
            </li>
          ))}
        </ul>)}
      </div>
    </div>
  );
};

const Arrow = ({className} : {className?: string}) => {
  return (
    <svg
      width="9"
      height="5"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 9 5"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M8.854.146a.5.5 0 0 0-.708 0L4.5 3.793.854.146a.5.5 0 1 0-.708.708l4 4a.5.5 0 0 0 .708 0l4-4a.5.5 0 0 0 0-.708Z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default Page;
