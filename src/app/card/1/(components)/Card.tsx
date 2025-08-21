"use client";

import { useState } from "react";
import ButtonWithTooltip from "./ButtonWithTooltip";
import { LuPencilLine } from "react-icons/lu";
import { PiTrashSimple } from "react-icons/pi";

const Card = ({
  name,
  price,
  isNew,
  onDelete,
}: {
  name: string;
  price: string;
  isNew: boolean;
  onDelete: () => void;
}) => {
  // const [pendingEdit, setPendingEdit] = useState<boolean>(false);
  const [pendingDelete, setPendingDelete] = useState<boolean>(false);

  return (
    <article
      className={`card after:invisible relative flex justify-between items-center w-full p-7 rounded-2xl cursor-default ${
        pendingDelete ? "after:visible" : ""
      } ${isNew ? "new" : ""}`}
    >
      <div className="flex items-center gap-4">
        <div className="size-14 rounded-2xl bg-amber-200"></div>
        <div>
          <p className="text-neutral-800 font-medium text-xl">{name}</p>
          <p className="text-neutral-500">
            <strong className="text-neutral-800">{price}</strong> /blog post
          </p>
        </div>
      </div>
      <div className="relative flex gap-6">
        {/* edit button */}
        <ButtonWithTooltip tooltipContent="Edit">
          <LuPencilLine
            className="relative z-0 size-7 cursor-pointer text-neutral-400 "
            strokeWidth={1.5}
          />
        </ButtonWithTooltip>

        {/* delete button */}
        <div className="flex items-center">
          <ButtonWithTooltip
            tooltipContent="Delete"
            onClick={() => setPendingDelete(!pendingDelete)}
          >
            {/* icon */}
            <PiTrashSimple
              className="relative z-0 size-7 cursor-pointer text-neutral-400"
              strokeWidth={1.5}
            />
          </ButtonWithTooltip>

          {/* popover */}
          <div
            className={`absolute z-5 top-full right-0 mt-2 w-fit min-w-70 bg-white border border-neutral-300 rounded-xl shadow-lg p-4 transition-transform duration-300 font-medium space-y-2 ${
              pendingDelete
                ? "translate-y-0 visible"
                : "translate-y-[-10px] opacity-0 invisible"
            }`}
          >
            <p className="text-start font-semibold">Delete this booster?</p>
            <div className="grid grid-cols-3 gap-2 font-medium">
              <button
                onClick={() => {
                  setPendingDelete(false);
                }}
                className="col-span-1 border-1 px-3 py-2 border-neutral-300 rounded-lg"
              >
                No
              </button>
              <button
                onClick={onDelete}
                className="col-span-2 border-1 px-3 py-2 border-neutral-300 rounded-lg bg-[#f20000] text-white"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Card;
