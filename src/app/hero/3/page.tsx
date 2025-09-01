"use client";
import { useEffect, useRef } from "react";

const Page = () => {
  const count = 5; // 보여줄 타이틀 개수
  const duration = 1000; // (ms) 애니메이션 실행시간
  const paused = 400; // (ms) 애니메이션 간 딜레이
  const timerRef = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    const first = document.querySelector(".first") as HTMLDivElement;
    const second = document.querySelector(".second") as HTMLDivElement;
    const title = document.querySelector(".title") as HTMLDivElement;

    const clearTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };

    const startCarousel = () => {
      // 시작할 때 타이머 초기화하여 처음부터 시작
      clearTimer();
      let i = 1;

      const height = title.clientHeight;

      // 위치 초기화
      first.style.top = "0px";
      second.style.top = `${count * height}px`;

      // 초기 이동값
      let firstY = -height;
      let secondY = -height;

      const tick = () => {
        // 아래로 이동할 때 보이지 않도록 z-index 조정
        if (i <= count + 1) {
          first.style.zIndex = "10";
          second.style.zIndex = "20";
        } else {
          first.style.zIndex = "20";
          second.style.zIndex = "10";
        }

        // 첫번째 요소가 모두 보여지고 두번째 요소의 첫 타이틀이 보일 때 두번째 요소 아래로 이동시켜 무한히 보여지도록 함
        if (i === count + 1) {
          firstY = (count - 1) * height;
        }

        // 두번째 요소가 모두 보여지고 첫번째 요소의 첫 타이틀이 보일 때 첫번째 요소 아래로 이동시켜 무한히 보여지도록 함
        if (i === count * 2 + 1) {
          secondY = -height;
          i = 1;
        }

        first.style.transform = `translateY(${firstY}px)`;
        second.style.transform = `translateY(${secondY}px)`;

        firstY -= height;
        secondY -= height;
        i++;

        timerRef.current = setTimeout(tick, duration + paused);
      };

      timerRef.current = setTimeout(tick, paused);
    };

    startCarousel();
    window.addEventListener("resize", startCarousel);

    return () => {
      window.removeEventListener("resize", startCarousel);
      clearTimer();
    };
  }, []);

  return (
    <main className="relative h-screen flex justify-center items-center bg-neutral-200">
      <div
        className="relative p-[10%] space-y-5 z-10"
        style={
          {
            "--title-font-size": "4rem",
          } as React.CSSProperties
        }
      >
        <h2
          className="font-bold uppercase"
          style={{
            fontSize: "var(--title-font-size)",
            lineHeight: "var(--title-font-size)",
          }}
        >
          <div>customer service</div>
          <div>solutions for</div>

          <div
            className="relative w-[90vw] overflow-y-hidden"
            style={{
              clipPath: "inset(0 0 0 0)",
              height: "var(--title-font-size)",
            }}
          >
            <div className="transition-transform duration-[600ms] text-neutral-500 text-nowrap">
              <div className="absolute w-full top-0 left-0 first transition-transform duration-300 ease-in-out">
                <div className="title">head of customer service</div>
                <div>chief executive officer</div>
                <div>chief technology officer</div>
                <div>head of marketing</div>
                <div>cheif finalcial officer</div>
              </div>

              <div
                className="second absolute w-full left-0 transition-transform duration-300 ease-in-out"
                aria-hidden
              >
                <div>head of customer service</div>
                <div>chief executive officer</div>
                <div>chief technology officer</div>
                <div>head of marketing</div>
                <div>cheif finalcial officer</div>
              </div>
            </div>
          </div>
        </h2>
        <p className="text-[1.3rem] lg:text-[1.8rem] font-medium text-neutral-800 max-w-[80%]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
          sapiente vitae enim id in veritatis dolores! Nostrum hic, commodi
          laudantium atque ab iusto eveniet quo quas, quae consectetur non
          blanditiis odio excepturi quidem vitae a ipsum unde eaque amet nihil?
        </p>
        <button className="mt-6 uppercase text-neutral-700 font-bold py-1 pr-10 border-b-[2px] border-neutral-400 hover:pl-10 transition-[padding-left] duration-300 ease-in-out">
          view
        </button>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[50vw] bg-amber-200 rounded-full blur-3xl opacity-40 z-1"></div>
      <div className="absolute top-1/2 left-1/2 size-[30vw] bg-green-200 rounded-full blur-3xl opacity-40 z-1"></div>
    </main>
  );
};
export default Page;
