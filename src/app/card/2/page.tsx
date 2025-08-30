"use client";
import { MdArrowOutward } from "react-icons/md";
import "./style.scss";

type Card = { title: string; desc: string };
const cards: Card[] = [
  {
    title: "Design",
    desc: "Standing out is easier than you think. Our designers create visuals that grab attention and leave a lasting impression.",
  },
  {
    title: "Copywriting",
    desc: "Good copy drives action. Our writers turn complex ideas into clear, compelling headlines, blogs, and more.",
  },
  {
    title: "Videography",
    desc: "Video is the future of B2B marketing, and most brands haven’t caught up. At Dapper, we create thought leadership videos, webinars, and creative concepts—on-site or in our in-house studio.",
  },
  {
    title: "Motion Design",
    desc: "A motion design says more than a thousand pictures. It’s the smartest way to simplify and communicate complex ideas.",
  },
  {
    title: "Thought leadership",
    desc: "People buy from people. That’s why we’ve helped 100+ companies turn employees into thought leaders - making them famous in their niche.",
  },
  {
    title: "Search Engine Optimization",
    desc: "Why pay to be in the top results of Google? We help you optimize your SEO and rank organically.",
  },
];

const Page = () => {
  return (
    <main className="w-screen h-screen flex justify-center items-center bg-neutral-200 antialiased">
      <div className="space-y-10">
        <div className="space-y-3">
          <h1 className="font-bold text-5xl">
            Your <span className="font-serif font-light">one-step-shop</span>
            <br /> for B2B content
          </h1>
          <p className="font-medium">
            From SEO to LinkedIn Thoughtleadership, and everything in between.
          </p>
        </div>

        <div className="flex flex-col gap-1 w-[70em] h-[35em]">
          <div className="card-transition card-row">
            <CardItem {...cards[0]} />
            <CardItem {...cards[1]} />
            <CardItem {...cards[2]} />
          </div>
          <div className="card-transition card-row">
            <CardItem {...cards[3]} />
            <CardItem {...cards[4]} />
            <CardItem {...cards[5]} />
          </div>
        </div>
      </div>
    </main>
  );
};

const CardItem = ({ title, desc }: Card) => {
  return (
    <div className="relative group flex flex-col justify-between bg-white grow-1 w-[100%] hover:w-[140%] will-change-[width] transition-[width] card-transition p-4 rounded-md cursor-pointer">
      <h2 className="text-3xl font-medium">{title}</h2>
      <p className="mt-2 text-[0.9em] w-[20em] opacity-0 font-medium group-hover:opacity-100 transition-[opacity] duration-300 ease-in-out">
        {desc}
      </p>
      <div className="absolute right-4 bottom-4 size-8 bg-neutral-700 rounded-md flex justify-center items-center opacity-0 group-hover:opacity-100 transition-[opacity] card-transition">
        <MdArrowOutward className="text-white" />
      </div>
    </div>
  );
};

export default Page;
