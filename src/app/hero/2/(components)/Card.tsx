import { cardProps } from "../(constants)";

const Card = ({
  comment = "Finally a supplement that tastes great and fits my vegen lifestyle.",
  name = "Nick, Y",
  nickname = "NY",
  region = "San Francisco, CA",
  className,
}: cardProps) => {
  return (
    <div
      className={`absolute w-[35%] max-w-[400px] aspect-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl p-10 flex flex-col justify-between font-bold drop-shadow-2xl ${className}`}
    >
      <p className="text-3xl">{`"${comment}"`}</p>
      <div className="flex gap-4 items-center">
        <div className="size-12 bg-black text-white rounded-full flex justify-center items-center">
          {nickname}
        </div>
        <small className="text-xl font-medium">
          <strong>{name}</strong>
          <br />
          {region}
        </small>
      </div>
    </div>
  );
};
export default Card;
