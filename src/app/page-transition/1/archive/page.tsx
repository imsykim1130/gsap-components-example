import { ReactLenis } from "lenis/react";

const Archive = () => {
  return (
    <>
      <ReactLenis root />
      <div className="__container">
        <div className="w-[30%] my-0 mx-auto py-[15rem] px-[2rem] flex flex-col gap-8">
          {Array.from({ length: 4 }).map((_, index) => {
            return (
              <img
                key={index}
                src={`/img_0${index + 1}.jpg`}
                alt={`img-${index + 1}`}
                className="w-full h-full object-cover aspect-5/7"
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Archive;
