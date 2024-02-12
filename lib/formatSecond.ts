export const formatSecond = (second: number): string => {
  const floorSecond = Math.floor(second);
  const mm = String(Math.floor(floorSecond / 60)).padStart(2, "0");
  const ss = String(Math.floor(floorSecond % 60)).padStart(2, "0");
  return `${mm}:${ss}`;
};
