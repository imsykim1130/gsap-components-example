"use client";

// style
import "./style.scss";

import Link from "next/link";
import { useEffect } from "react";

// gsap
import gsap from "gsap";
import { Draggable } from "gsap/all";
gsap.registerPlugin(Draggable);

const Page = () => {
  useEffect(() => {
    const timeline = document.querySelector(".timeline") as HTMLDivElement;
    const scroller = document.querySelector(".scroller") as HTMLDivElement;
    const wrapper = document.querySelector(".wrapper") as HTMLDivElement;

    const init = () => {
      // marker 만들기
      const timelineWidth = timeline.offsetWidth;
      const scrollerWidth = scroller.offsetWidth;
      const gap = parseInt(window.getComputedStyle(document.body).fontSize);

      console.log(timelineWidth);

      const maxDragX = timelineWidth - scrollerWidth - 2 * gap;

      for (let i = 0; i < 50; i++) {
        const marker = document.createElement("div");
        marker.classList.add("marker");
        timeline.appendChild(marker);
      }

      // gsap to 메서드를 여러번 반복할 때 최적화를 위해 quickTo 를 사용
      const moveX = gsap.quickTo(wrapper, "x", {
        duration: 1,
        ease: "power3.out",
      });

      Draggable.create(scroller, {
        type: "x",
        bounds: {
          minX: gap,
          maxX: timelineWidth - scrollerWidth - gap,
        },
        onDrag() {
          const progress = (this.x - gap) / maxDragX;
          const wrapperX = -400 * (timelineWidth / 100) * progress;

          moveX(wrapperX);
        },
      });
    };

    init();

    window.addEventListener("resize", () => {
      // 이전의 marker 삭제
      document.querySelectorAll(".marker").forEach((el) => el.remove());
      Draggable.get(scroller).kill();
      init();
    });

    return () => {
      Draggable.get(scroller).kill();
    };
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 w-[100vw] p-[2em] flex justify-between z-10">
        <Link href={"#"}>Urban Exclipse</Link>
        <Link href={"#"}>About</Link>
        <Link href={"#"}>Contact</Link>
        <Link href={"#"}>Work</Link>
      </nav>
      <div className="absolute top-0 left-0 w-[100vw] lg:h-[90vh] h-[100vh] overflow-x-hidden py-5">
        <div className="wrapper w-[100vw] lg:w-[500vw] h-fit flex flex-col lg:flex-row">
          <section id="section-1">
            <h1>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
              omnis.
            </h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur, facilis! Necessitatibus perspiciatis magnam quis minus
              culpa iure ut adipisci optio.
            </p>
          </section>
          <section id="section-2">
            <img className="img img-1" src="/img_01.jpg" alt="" />
            <img className="img img-2" src="/img_02.jpg" alt="" />
            <img className="img img-3" src="/img_03.jpg" alt="" />
          </section>
          <section id="section-3">
            <img className="img img-4" src="/img_04.jpg" alt="" />
            <img className="img img-5" src="/img_05.jpg" alt="" />
            <img className="img img-6" src="/img_06.jpg" alt="" />
          </section>
          <section id="section-4">
            <h1>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
              omnis.
            </h1>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur, facilis! Necessitatibus perspiciatis magnam quis minus
              culpa iure ut adipisci optio.
            </p>
          </section>
          <section id="section-5">
            <img className="img img-7" src="/img_07.jpg" alt="" />
            <img className="img img-8" src="/img_08.jpg" alt="" />
            <img className="img img-9" src="/img_09.jpg" alt="" />
          </section>
        </div>
      </div>

      <div className="timeline fixed bottom-0 left-0 w-[100vw] h-[10vh] px-[2.25em] py-[1em] lg:flex justify-around hidden">
        <div className="scroller absolute top-1/2 left-0 -translate-y-1/2 uppercase bg-black cursor-pointer flex items-center">
          [<span>Drag</span>]
        </div>
      </div>
    </>
  );
};
export default Page;
