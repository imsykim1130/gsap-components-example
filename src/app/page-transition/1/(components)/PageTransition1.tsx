"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import Logo from "./Logo";
import { usePathname } from "next/navigation";
import { ReactNode, useRef } from "react";

const PageTransition1 = ({ children }: { children: ReactNode }) => {
  const path = usePathname();
  const logoRef = useRef<SVGPathElement>(null);

  useGSAP(() => {
    // init
    gsap.set(".overlay-block", { scaleX: 1 });

    const logo = logoRef.current;
    if (!logo) return;

    const logoLength = logo.getTotalLength();

    gsap.set(logo, {
      strokeDasharray: logoLength,
      strokeDashoffset: logoLength,
      opacity: 1,
    });

    // animate
    gsap
      .timeline()
      .to(logo, {
        // logo
        strokeDashoffset: 0,
        duration: 1.3,
        delay: 0.4,
        ease: "power1.out",
        onCompleteParams: [logo],
        onComplete(logo) {
          gsap.to(logo, { opacity: 0, ease: "power1.out", duration: 0.8 });
        },
      })
      .to(".overlay-block", {
        // slide blocks
        scaleX: 0,
        stagger: 0.09,
        duration: 1,
        ease: "power2.out",
      });
  }, [path]);

  return (
    <>
      <div className="fixed top-0 left-0 w-[100vw] h-[100svh] flex pointer-events-none z-2">
        <div className="fixed top-0 left-0 w-[100vw] h-[100svh] z-2 flex justify-center items-center pointer-events-none opacity-100">
          <div className="size-[200px] flex justify-center items-center">
            <Logo ref={logoRef} />
          </div>
        </div>
        {/* slide blocks */}
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="overlay-block flex-1 h-full bg-[#222] scale-x-100 origin-left"
          />
        ))}
      </div>

      {children}
    </>
  );
};
export default PageTransition1;
