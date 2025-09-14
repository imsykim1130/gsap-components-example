"use client";
import { useRef, useState } from "react";
import Card from "./(components)/Card";
import ButtonWithTooltip from "./(components)/ButtonWithTooltip";

import "./style.scss";

const Page = () => {
  const [cards, setCards] = useState([
    { id: 1, name: "Clear Scope", price: "$40", isNew: false },
    { id: 2, name: "SEO Booster", price: "$30", isNew: false },
    { id: 3, name: "Content Enhancer", price: "$50", isNew: false },
  ]);

  const cardId = useRef<number>(cards.length);

  const addNewCard = () => {
    const newCard = {
      id: ++cardId.current,
      name: "New Booster " + cardId.current,
      price: "$20",
      isNew: true,
    };
    setCards([...cards, newCard]);
  };

  return (
    <main className="px-10 pt-30 w-screen h-screen flex justify-center">
      <div>
        <div>
          <div className="flex gap-4 items-end">
            <h2 className="leading-[100%] font-medium text-2xl">Boosters</h2>

            <ButtonWithTooltip tooltipContent="Learn more about Boosters">
              <span className="rounded-full flex justify-center items-center size-5 border-[0.2px] border-neutral-300 text-[13px] font-medium">
                i
              </span>
            </ButtonWithTooltip>
          </div>

          <p className="text-neutral-500 mt-2">
            Looking to get more out of your content? Try an add-on to
            supercharge SEO results!
          </p>
        </div>

        <div className="mt-5 space-y-3 w-[40rem]">
          {/* cards */}
          {cards.map((card) => (
            <Card
              key={card.id}
              name={card.name}
              price={card.price}
              isNew={card.isNew}
              onDelete={() => setCards(cards.filter((c) => c.id !== card.id))}
            />
          ))}

          {/* add card button */}
          <button
            className="w-full rounded-xl border-2 border-neutral-200 p-3 flex justify-center items-center transform-view duration-400 bg-neutral-50 hover:bg-neutral-100 text-neutral-500 font-medium"
            onClick={addNewCard}
          >
            + Add Booster
          </button>
        </div>
      </div>
    </main>
  );
};

export default Page;
