"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { cards } from "./(constants)";
import Card from "./(components)/Card";
import useMediaQuery from "./(hooks)/useMediaQuery";

const Page = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState<number>(0);
  const [clicked, setClicked] = useState<boolean>(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const dragRef = useRef<{
    start: number | null; // mouse position
    prev: number | null; // mouse positon
    rotated: number;
    snapRotated: number;
  }>({
    start: null,
    prev: null,
    rotated: 0,
    snapRotated: 0,
  });

  const { contextSafe } = useGSAP({ dependencies: [], scope: containerRef });

  // handlers
  const rotateClockwise = contextSafe((cardCount: number) => {
    gsap.to(carouselRef.current, {
      rotateY: "-=60",
      duration: 0.6,
      ease: "power3.out",
    });
    dragRef.current.rotated -= 60;
    dragRef.current.snapRotated -= 60;
    setIndex((index) => gsap.utils.wrap(0, cardCount, index + 1));
  });

  const rotateCounterclockwise = contextSafe((cardCount: number) => {
    gsap.to(carouselRef.current, {
      rotateY: "+=60",
      duration: 0.6,
      ease: "power3.out",
    });
    dragRef.current.rotated += 60;
    dragRef.current.snapRotated += 60;
    setIndex((index) => gsap.utils.wrap(0, cardCount, index - 1));
  });

  const rotateCarousel = contextSafe((e: MouseEvent) => {
    if (!dragRef.current.prev || !dragRef.current.start) return;

    const prevMove = dragRef.current.prev - dragRef.current.start;
    const nowMove = e.clientX - dragRef.current.start;

    const times = isMobile ? 0.3 : 0.1;

    const newr = dragRef.current.rotated - (prevMove - nowMove) * times;
    console.log(newr);

    gsap.to(carouselRef.current, {
      ease: "none",
      rotateY: newr,
    });

    dragRef.current.prev = e.clientX;
    dragRef.current.rotated = newr;
  });

  const snapCard = contextSafe((newRotate: number) => {
    gsap.to(carouselRef.current, {
      rotateY: newRotate,
      duration: 0.8,
      ease: "expo",
      onStart() {
        changeIndex(cards.length, newRotate);
      },
      onComplete() {
        dragRef.current.rotated = newRotate;
        dragRef.current.snapRotated = newRotate;
      },
    });
  });

  const changeIndex = (cardCount: number, finalRotated: number) => {
    const stepAngle = 360 / cardCount;

    // 이전 회전 각도와 현재 각도를 비교하여 인덱스 변경
    if (dragRef.current.snapRotated !== finalRotated) {
      const changedIndex =
        -(finalRotated - dragRef.current.snapRotated) / stepAngle;

      setIndex((index) => {
        const newIndex = gsap.utils.wrap(0, cardCount, index + changedIndex);
        return newIndex;
      });
    }
  };

  // effect
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    gsap.utils.toArray<HTMLDivElement>(".carousel-2-card").forEach((el, i) => {
      gsap.set(el, {
        rotateY: i * (360 / cards.length),
      });
    });

    const onPointerDown = (e: PointerEvent) => {
      el.setPointerCapture(e.pointerId); // move/up 요소로 고정 캡처
      dragRef.current.start = e.clientX;
      dragRef.current.prev = e.clientX;
      setClicked(true);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!el.hasPointerCapture?.(e.pointerId)) return;
      if (e.buttons === 0) return onPointerUp(e);
      if (dragRef.current.start === null || !clicked) return;

      rotateCarousel(e);
    };

    const onPointerUp = (e: PointerEvent) => {
      if (el.hasPointerCapture?.(e.pointerId))
        el.releasePointerCapture(e.pointerId);

      dragRef.current.start = null;
      dragRef.current.prev = null;
      setClicked(false);

      const stepAngle = 360 / cards.length;
      const rotated = gsap.getProperty(
        carouselRef.current,
        "rotateY"
      ) as number;
      const steps = Math.round(rotated / stepAngle);
      const snapRotate = steps * stepAngle;

      snapCard(snapRotate);
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", onPointerUp);
    el.addEventListener("pointercancel", onPointerUp);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", onPointerUp);
      el.removeEventListener("pointercancel", onPointerUp);
    };
  }, [rotateCarousel, snapCard]);

  useGSAP(() => {
    // title animation
    gsap.from(".card-title", {
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });

    return () => {};
  }, [index]);

  return (
    <main
      className={`bg-black w-full h-screen overflow-hidden flex flex-col justify-center items-center font-montserrat perspective-[900px]`}
    >
      <div className="absolute bottom-0 left-0 w-full h-[40vh] bg-gradient-to-t from-white to-white/0 opacity-30"></div>

      {/* cards */}
      <div
        ref={containerRef}
        className={`transform-3d relative w-full h-[50vh] ${
          clicked ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        <div
          ref={carouselRef}
          className="transform-3d absolute inset-0 select-none"
        >
          {cards.map((card) => (
            <Card key={card.img} zIndex={card.zIndex} img={card.img} />
          ))}
        </div>
      </div>

      <div className="absolute z-40 text-white flex flex-col gap-4 items-center ">
        <h1 className="card-title font-bold text-5xl md:text-8xl uppercase pointer-events-none select-none">
          {cards[index].title}
        </h1>
        <button className="rounded-full bg-white text-black px-10 py-[8px]  md:px-14 md:py-[10px] text-[0.8rem] md:text-[1rem] font-bold uppercase">
          <Link href={cards[index].link}>view case</Link>
        </button>
      </div>

      <div className="absolute bottom-25 w-fit h-fit uppercase text-white space-x-10 text-3xl">
        <button
          className="hover:opacity-80"
          onClick={() => rotateCounterclockwise(6)}
        >
          {"< prev"}
        </button>
        <button className="hover:opacity-80" onClick={() => rotateClockwise(6)}>
          {"next >"}
        </button>
      </div>
    </main>
  );
};
export default Page;
