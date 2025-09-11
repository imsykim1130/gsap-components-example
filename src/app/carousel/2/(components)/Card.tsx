import useMediaQuery from "../(hooks)/useMediaQuery";

const Card = ({
  img = "/img_01.jpg",
  zIndex = 10,
}: {
  img?: string;
  zIndex?: number;
}) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const size = isMobile ? 200 : 300; // 이미지 크기
  const translateZ = 400; // 회전 반지름

  return (
    <div
      className={`carousel-2-card absolute transform-3d left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        zIndex: `${zIndex}`,
      }}
    >
      <div
        className={`absolute inset-0 transform-3d rounded-sm`}
        style={{
          background: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translateZ(${translateZ}px)`,
        }}
      ></div>
    </div>
  );
};

export default Card;
