import chroma from "chroma-js";

const range = document.getElementById("range") as HTMLInputElement;
const box = document.querySelector(".box") as HTMLDivElement;

const boxPosition = box.getBoundingClientRect();
const rangePosition = range.getBoundingClientRect();
const boxStartX = boxPosition.width / 2;
const boxEndX = rangePosition.width - boxPosition.width / 2;

function getTransitionColor(
  color1: string,
  color2: string,
  percentage: number
) {
  const rgb1 = chroma(color1).css();
  const rgb2 = chroma(color2).css();
  return chroma.mix(rgb1, rgb2, percentage / 100);
}

const handleRangeValueChange = (e: Event) => {
  if (!e.target) return;
  const percentValue = Number((e.target as HTMLInputElement).value);
  const stepWidth = Math.round((boxEndX - boxStartX) / 100) * percentValue;
  box.style.left = `${stepWidth}px`;
  box.style.background = getTransitionColor(
    "green",
    "yellow",
    percentValue
  ).css();
  box.style.borderRadius = `${percentValue}%`;
};

range.addEventListener("input", handleRangeValueChange);
