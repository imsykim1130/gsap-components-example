export type cardProps = {
  comment: string;
  name: string;
  nickname: string;
  region: string;
  className?: string;
};

export const cards: Omit<cardProps, "className">[] = [
  {
    comment:
      "Finally a supplement that tastes great and fits my vegan lifestyle.",
    name: "Nick Y.",
    nickname: "NY",
    region: "San Francisco, CA",
  },
  {
    comment:
      "Tastes like a candy I used to enjoy as a kid, but it’s a vitamin. It tastes amazing!",
    name: "Priay D.",
    nickname: "PD",
    region: "San Francisco, CA",
  },
  {
    comment:
      "I love that I can trust this brand and its supplements. Ethical, clean and effective.",
    name: "Trevor D",
    nickname: "TD",
    region: "Washington DC",
  },
];
