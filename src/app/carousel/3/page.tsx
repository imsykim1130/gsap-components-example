"use client";

import Image from "next/image";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { Draggable, InertiaPlugin } from "gsap/all";
gsap.registerPlugin(Draggable, InertiaPlugin);

const Page = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const moveRef = useRef<{
    moved: number;
    scroll: number;
    tw: gsap.core.Tween | undefined;
    leftTw: gsap.core.Tween | undefined;
    rightTw: gsap.core.Tween | undefined;
  }>({
    moved: 0,
    scroll: 0,
    tw: undefined,
    leftTw: undefined,
    rightTw: undefined,
  });
  const cardWidth = 600;

  useGSAP(
    () => {
      if (!containerRef.current) return;
      const container = containerRef.current;

      const cards = Array.from<HTMLDivElement>(
        container.querySelectorAll(".card")
      );
      const carouselWidth = cards[0].clientWidth * cards.length;

      const carousel = container.querySelector<HTMLDivElement>(".carousel");
      const left = container.querySelector<HTMLDivElement>(".left");
      const right = container.querySelector<HTMLDivElement>(".right");

      // 초기 세팅
      gsap.set(container, {
        height: cardWidth,
      });
      gsap.set(cards, {
        x: (index) => index * cardWidth,
        width: cardWidth,
      });
      gsap.set(left, {
        visibility: "hidden",
      });

      const commonVars: gsap.TweenVars = {
        opacity: 0,
        duration: 0.8,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        paused: true,
      };

      moveRef.current.leftTw = gsap.fromTo(
        left,
        {
          opacity: 1,
        },
        commonVars
      );

      moveRef.current.rightTw = gsap.fromTo(
        right,
        {
          opacity: 1,
        },
        commonVars
      );

      // 리사이징 할 때 다시 설정해야 하는 것들을 실행하는 함수
      const init = () => {
        const containerWidth = container.clientWidth;
        const scroll = carouselWidth - containerWidth;

        // 애니메이션 초기화
        moveRef.current.tw?.kill();
        moveRef.current.leftTw?.progress(0);
        moveRef.current.rightTw?.progress(0);

        // 캐러셀 이동 버튼 상태 초기화
        gsap.set(left, { visibility: "hidden" });
        gsap.set(right, { visibility: "visible" });

        //  캐러샐 내용의 길이가 캐러셀 컨테이너의 길이보다 작을 경우 애니메이션 삭제(스크롤 동작 x)
        if (scroll <= 0) {
          moveRef.current.tw = undefined;
          return;
        }

        gsap.set(carousel, {
          x: 0,
        });

        moveRef.current.tw = gsap.to(carousel, {
          paused: true,
          x: -scroll,
          duration: scroll * 0.008,
          ease: "none",
          onUpdate() {
            const progress = this.progress();
            if (progress === 0) {
              gsap.set(left, {
                visibility: "hidden",
              });
            } else if (progress === 1) {
              gsap.set(right, {
                visibility: "hidden",
              });
            } else {
              if (gsap.getProperty(left, "visibility") === "hidden") {
                gsap.set(left, { visibility: "visible" });
              }

              if (gsap.getProperty(right, "visibility") === "hidden") {
                gsap.set(right, { visibility: "visible" });
              }
            }
          },
        });

        Draggable.get(carousel)?.kill();
        Draggable.create(carousel, {
          type: "x",
          bounds: { minX: -scroll, maxX: 0 },
          inertia: true,
          onDrag() {
            const percent = -this.x / scroll;
            console.log(percent);
            if (moveRef.current.tw) {
              moveRef.current.tw.progress(percent);
            }
          },
        });
      };

      init();

      window.addEventListener("resize", init);

      return () => {
        window.removeEventListener("resize", init);
        moveRef.current.tw?.kill();
        moveRef.current.leftTw?.kill();
        moveRef.current.rightTw?.kill();
        Draggable.get(carousel)?.kill();
      };
    },
    { scope: containerRef, dependencies: [] }
  );

  return (
    <main className="flex flex-col justify-center w-full h-screen">
      <div className="px-20 mb-3">
        <h2 className="text-[1.1rem] font-medium select-none">
          새로 선보이는 신제품
        </h2>
        <button className="text-[0.9rem]">더 보기</button>
      </div>
      {/* carousel */}
      <div ref={containerRef} className="relative w-full overflow-hidden">
        {/* items */}
        <div className="carousel h-full">
          {Array.from({ length: 5 }).map((_, index) => (
            <Card
              key={index}
              lookImg={`/sunglass/sunglass-${index + 1}.jpg`}
              itemImg={`/sunglass/sunglass-${index + 1}-front.png`}
              width={cardWidth}
              height={cardWidth}
              name="퓨리-01"
              price={"130,000"}
            />
          ))}
        </div>
        {/* left */}
        <div
          className="left absolute left-0 top-0 w-30 h-full flex items-center justify-center select-none"
          onMouseEnter={() => {
            moveRef.current.tw?.reverse();
            moveRef.current.leftTw?.play();
          }}
          onMouseLeave={(e) => {
            moveRef.current.tw?.pause();
            moveRef.current.leftTw?.pause();
            gsap.set(e.target, { opacity: 1 });
          }}
        >
          <div className="py-10 px-5 bg-white/30 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="45"
              viewBox="0 0 24 45"
              fill="none"
              className="black"
            >
              <path
                d="M1.18628 22.6066L23.1066 0.686279M1.64642 22.3536L23.5667 44.2739"
                stroke="black"
              />
            </svg>
          </div>
        </div>
        {/* right */}
        <div
          className="right absolute right-0 top-0 w-30 h-full flex justify-center items-center select-none"
          onMouseEnter={() => {
            moveRef.current.tw?.play();
            moveRef.current.rightTw?.play();
          }}
          onMouseLeave={(e) => {
            moveRef.current.tw?.pause();
            moveRef.current.rightTw?.pause();
            gsap.set(e.target, { opacity: 1 });
          }}
        >
          <div className="py-10 px-5 bg-white/40 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="45"
              viewBox="0 0 24 45"
              fill="none"
              className="rotate-y-180"
            >
              <path
                d="M1.18628 22.6066L23.1066 0.686279M1.64642 22.3536L23.5667 44.2739"
                stroke="black"
              />
            </svg>
          </div>
        </div>
      </div>
    </main>
  );
};

const Card = ({
  lookImg,
  itemImg,
  width,
  height,
  name,
  price,
}: {
  lookImg: string;
  itemImg: string;
  width: number;
  height: number;
  name: string;
  price: string;
}) => {
  return (
    <article
      className={`card absolute top-0 left-0 h-full group cursor-pointer`}
    >
      {/* <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-[opacity]"></div> */}
      {/* look */}
      <Image src={lookImg} width={width} height={height} alt="" />
      {/* item */}
      <Image
        src={itemImg}
        width={width}
        height={height}
        alt=""
        className="absolute top-0 right-0 opacity-0 group-hover:opacity-95 transition-[opacity] duration-300"
      />

      <div className="absolute bottom-10 left-10 text-[0.75rem] text-neutral-800">
        <h3>{name}</h3>
        <p>₩{price}</p>
        <button className="mt-1 underline underline-offset-3">
          위시 리스트에 추가하기
        </button>
      </div>
    </article>
  );
};
export default Page;
