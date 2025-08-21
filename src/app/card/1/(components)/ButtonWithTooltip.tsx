const ButtonWithTooltip = ({
  children,
  tooltipContent,
  onClick,
}: {
  children: React.ReactNode;
  tooltipContent: string;
  onClick?: () => void;
}) => {
  return (
    <button
      className="group relative text-[1rem]"
      onClick={onClick}
    >
      {/* icon */}
      {children}
      {/* tooltip */}
      <span className="absolute inline-block px-2.5 py-2 text-nowrap font-medium bg-neutral-800 text-white rounded-xl bottom-[140%] right-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {tooltipContent}
      </span>
    </button>
  );
};

export default ButtonWithTooltip;
