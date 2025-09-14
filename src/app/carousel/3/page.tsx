/* 
  데스크탑 환경에서 드래그 하지 않고 마우스 위치에 따라 자동으로 드래그를 해주는 캐러셀
  마우스로 가로 드래깅은 불편한 경우가 많은데 이를 해결하기 위함
  마우스를 올려놓아도 드래그가 된다는 것을 알려주기 위해서 

*/
"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";

import gsap from "gsap";
import Image from "next/image";

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

      const init = () => {
        // 스크롤 할 길이 계산
        const carouselWidth = cards[0].clientWidth * cards.length;
        const containerWidth = container.clientWidth;
        const scroll = carouselWidth - containerWidth;

        // 스크롤 상태 초기화
        gsap.set(carousel, {
          x: 0,
        });

        // 애니메이션 초기화
        const prevTw = moveRef.current.tw;
        if (prevTw) {
          prevTw.kill();
        }

        //  캐러샐 내용의 길이가 캐러셀 컨테이너의 길이보다 작을 경우 애니메이션 삭제(스크롤 동작 x)
        if (scroll <= 0) {
          moveRef.current.tw = undefined;
          return;
        }

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
      };

      moveRef.current.leftTw = gsap.fromTo(
        left,
        {
          opacity: 1,
        },
        {
          opacity: 0,
          duration: 0.5,
          ease: "power1.in",
          repeat: -1,
          yoyo: true,
          paused: true,
        }
      );

      moveRef.current.rightTw = gsap.fromTo(
        right,
        {
          opacity: 1,
        },
        {
          opacity: 0,
          duration: 0.5,
          ease: "power1.in",
          repeat: -1,
          yoyo: true,
          paused: true,
        }
      );

      init();
      gsap.set(left, {
        visibility: "hidden",
      });

      window.addEventListener("resize", init);

      return () => {
        window.removeEventListener("resize", init);
      };
    },
    { scope: containerRef }
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
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden bg-amber-100"
      >
        {/* items */}
        <div className="carousel h-full">
          {Array.from({ length: 5 }).map((_, index) => (
            <Card
              key={index}
              img={`/sunglass/sunglass-${index + 1}.jpg`}
              width={cardWidth}
              height={cardWidth}
              name="퓨리-01"
              price={"130,000"}
            />
          ))}
        </div>
        {/* left */}
        <div
          className="left absolute left-0 top-0 w-30 h-full flex items-center justify-center select-none bg-white blur-[100px]"
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
          PREV
        </div>
        {/* right */}
        <div
          className="right absolute right-0 top-0 w-30 h-full flex justify-center items-center select-none bg-white blur-[100px]"
          onMouseEnter={() => {
            moveRef.current.tw?.play();
            moveRef.current.rightTw?.play();
          }}
          onMouseLeave={(e) => {
            moveRef.current.tw?.pause();
            moveRef.current.rightTw?.pause();
            gsap.set(e.target, { opacity: 1 });
          }}
        ></div>
      </div>

      {/* <div className="flex gap-10 justify-center mt-10 text-md font-medium">
        <button>prev</button>
        <button>next</button>
      </div> */}
    </main>
  );
};

const Card = ({
  img,
  width,
  height,
  name,
  price,
}: {
  img: string;
  width: number;
  height: number;
  name: string;
  price: string;
}) => {
  return (
    <article
      className={`card absolute top-0 left-0 h-full group cursor-pointer`}
    >
      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-[opacity]"></div>
      <Image src={img} width={width} height={height} alt="" />
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
