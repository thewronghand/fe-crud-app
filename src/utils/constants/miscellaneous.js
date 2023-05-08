const getRandomIndex = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const colorSchemes = [
  {
    background: "white",
    color: "black",
    alt: "#DE3E7D",
  },
  {
    background: "white",
    color: "black",
    alt: "#DE3E7D",
  },
  {
    background: "white",
    color: "black",
    alt: "#DE3E7D",
  },
  {
    background: "white",
    color: "black",
    alt: "#DE3E7D",
  },
];

export const getRandomColorScheme = () => {
  return colorSchemes[getRandomIndex(0, colorSchemes.length - 1)];
};
