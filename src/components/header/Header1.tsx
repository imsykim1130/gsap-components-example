"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import Link from "next/link";
// gsap
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
// react icons
import { IoLogoDribbble, IoLogoInstagram } from "react-icons/io";
import { RxNotionLogo } from "react-icons/rx";
import { MdArrowOutward } from "react-icons/md";

const Header1 = () => {
  const [open, setOpen] = useState<boolean>(false); // nav 상태
  const nav = useRef<HTMLElement>(null);
  const navTl = useRef<gsap.core.Timeline>(null);

  useGSAP(
    () => {
      if (!nav.current) return;

      // 자동으로 애니메이션이 실행되지 않고 네비게이션 토글 시에만 애니메이션 실행시키기 위해 paused 값 true 로 설정
      const tl = gsap.timeline({ paused: true });

      // 토글 시 애니메이션이 확실히 반대로 적용되도록 하기 위하여 fromTo 사용
      tl.fromTo(
        nav.current,
        {
          clipPath: "inset(0% 0% 100% 0%)",
        },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.1,
          ease: "power4.inOut",
        }
      ).fromTo(
        ".menu",
        {
          opacity: 0,
          y: "100%",
          rotate: 30,
        },
        {
          opacity: 1,
          y: 0,
          rotate: 0,
          duration: 2,
          ease: "power4.inOut",
          stagger: 0.2,
        },
        "-=1.7"
      );

      navTl.current = tl;
    },
    { scope: nav }
  );

  //
  useEffect(() => {
    if (!navTl.current) return;

    if (open) {
      navTl.current.play();
    } else {
      navTl.current.reverse();
    }
  }, [open]);

  return (
    <header className="fixed top-0 left-0 w-full  px-10 md:px-30">
      {/* navigation */}
      <nav
        ref={nav}
        className={`absolute z-0 top-0 left-0 w-full h-screen flex flex-col md:flex-row justify-between bg-blue-300 pt-30 pb-10 px-10 md:px-50`}
        style={{
          clipPath: "inset(0% 100% 0% 0%)",
        }}
      >
        <ul className="space-y-1 text-6xl md:text-7xl font-light md:min-w-90">
          {menuList.map((menu) => (
            <li
              key={menu}
              className="cursor-pointer w-full leading-14 tracking-tighter transition-all duration-500 ease-in-out hover:translate-x-5"
              style={{
                clipPath: "inset(0 0 0 0)",
              }}
            >
              <Link
                href="/header-1"
                className="menu block origin-top-left"
                onClick={() => {
                  setOpen(false);
                }}
              >
                {menu}
              </Link>
            </li>
          ))}
        </ul>

        <div>
          <ul className="font-medium tracking-tight">
            {socials.map((social) => (
              <li key={social.name} className="social flex items-center gap-2">
                <span>{social.icon}</span> {social.name} <MdArrowOutward />
              </li>
            ))}
            <li className="mt-3">imsykim1130@gmail.com</li>
          </ul>
        </div>
      </nav>

      <div className="relative z-1 flex justify-between items-center h-20 font-medium">
        {/* logo */}
        <div>LOGO</div>

        {/* menu/close button */}
        <button
          className="cursor-pointer"
          onClick={() => {
            setOpen(!open);
          }}
        >
          {open ? "close" : "menu"}
        </button>
      </div>
    </header>
  );
};

const menuList: string[] = ["HOME", "WORK", "ABOUT", "CONTACT"];
const socials: { name: string; icon?: ReactNode; link: string }[] = [
  {
    name: "instagram",
    icon: <IoLogoInstagram />,
    link: "#",
  },
  {
    name: "dribble",
    icon: <IoLogoDribbble />,
    link: "#",
  },
  {
    name: "notion",
    icon: <RxNotionLogo />,
    link: "#",
  },
];

export default Header1;
