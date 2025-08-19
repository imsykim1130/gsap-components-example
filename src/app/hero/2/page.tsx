"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";
gsap.registerPlugin(ScrollTrigger, SplitText);

import Image from "next/image";

import { cards } from "./(constants)";
import Card from "./(components)/Card";

const Page = () => {
  useGSAP(() => {
    const split = SplitText.create(".title", { type: "chars" });

    gsap.set(".hero-2-nav", {
      y: "-150%",
    });

    gsap.set(split.chars, {
      y: "40vh",
    });

    const tl = gsap.timeline({
      // paused: false,
      scrollTrigger: {
        trigger: ".hero-2",
        start: "top top",
        end: "+=6000",
        scrub: 2.4,
        pin: true,
        // markers: true,
      },
    });

    tl.to(".hero-2-nav", {
      opacity: 1,
      y: 0,
    });

    tl.to(
      ".title",
      {
        scale: 0.3,
        duration: 1,
      },
      "<"
    );

    tl.to(
      split.chars,
      {
        duration: 1,
        y: 0,
        stagger: {
          each: 0.02,
          from: "random",
          grid: "auto",
        },
      },
      "<"
    );

    tl.to(
      ".sub-title",
      {
        duration: 2,
        opacity: 0,
        scale: 0,
        ease: "power3.out",
      },
      ">-=1"
    );

    tl.to(
      ".color-bg",
      {
        opacity: 0,
        duration: 0.5,
      },
      ">-=0.5"
    );

    tl.to(
      ".hero-text-container",
      {
        opacity: 1,
        translateZ: 0,
        duration: 3,
      },

      "<"
    );

    tl.to(
      ".hero-text",
      {
        stagger: 0,
        opacity: 1,
        rotateX: 0,
        duration: 4,
      },
      "<-=0.4"
    );

    tl.to(
      ".item-container",
      {
        y: "-100%",
        duration: 5,
      },
      ">-=2"
    );

    tl.to(
      [".item2", ".item3"],
      {
        rotate: 1050,
        duration: 4,
        onComplete() {
          console.log("complete");
        },
      },
      "<"
    );

    tl.to(
      ".card",
      {
        duration: 10,
        stagger: 1.2,
        rotateZ: -90,
        ease: "power2.out",
      },
      ">-=3"
    );
  }, []);

  return (
    <main className="hero-2 relative w-full h-screen flex justify-center items-center transform-3d perspective-normal overflow-hidden pointer-events-none">
      {/* full screen bg */}
      <div className="color-bg absolute top-0 left-0 w-screen h-screen bg-gradient-to-b from-green to-white flex flex-col items-center justify-end">
        <p className="sub-title text-[1.3vw] font-medium py-10 origin-bottom">
          Pharmacist and Nutritionist Formulated.
        </p>
      </div>

      {/* bg gradient */}
      <div className="-z-2 absolute w-[90vw] md:w-[50vw] aspect-square left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 bg-radial from-green/80 to-green/0 to-70%"></div>

      {/* text */}
      <div className="hero-text-container w-full uppercase text-[8rem] lg:text-[12rem] leading-38 font-extrabold text-neutral-800 text-center perspective-normal translate-z-130 opacity-0">
        <p className="hero-text rotate-x-70 opacity-0">wellness</p>
        <p>stories</p>
        <p className="hero-text -rotate-x-70 opacity-0">shared</p>
      </div>

      {/* floating items */}
      <div className="item-container absolute w-screen h-screen translate-y-[100%] top-0 left-0">
        <Image
          src="/item1.png"
          alt=""
          width={240}
          height={240}
          className="absolute top-[16%] left-[10%] blur-[4px] scale-110"
        />
        <Image
          src="/item2.png"
          alt=""
          width={240}
          height={240}
          className="item2 absolute top-[10%] right-[10%] scale-30"
        />
        <Image
          src="/item3.png"
          width={240}
          height={240}
          alt=""
          className="item3 absolute bottom-[10%] left-[25%] scale-40"
        />
        <Image
          src="/item4.png"
          width={240}
          height={240}
          alt=""
          className="absolute right-[5%] bottom-[30%] blur-[3px]"
        />
      </div>

      {/* cards */}
      {cards.map((card, index) => (
        <div
          key={card.name}
          className="card absolute w-screen h-screen translate-y-1/2  bottom-0 left-0 origin-bottom rotate-z-90"
        >
          <Card
            {...card}
            className={index % 2 === 0 ? "bg-white" : "bg-green"}
          />
        </div>
      ))}
    </main>
  );
};

export default Page;
