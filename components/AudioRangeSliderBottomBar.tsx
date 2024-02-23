import { FC, useEffect, useRef } from "react";
import styles from "./AudioRangeSliderBottomBar.module.css";

type Props = {
  durationSecond: number;
  currentTime: number;
};

const baseColor = "#808080";
const activeColor = "#FFF";

export const AudioRangeSliderBottomBar: FC<Props> = ({
  durationSecond,
  currentTime,
}) => {
  const range = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const valuePercent = (currentTime / durationSecond) * 100;
    if (range.current) {
      range.current.style.height = "2px";
      range.current.style.background = `linear-gradient(to right, ${activeColor} ${valuePercent}%, ${baseColor} ${valuePercent}%)`;
    }
  }, [currentTime]);

  return (
    <div className="w-full h-3 relative">
      <input
        type="range"
        ref={range}
        max={isNaN(durationSecond) ? 0 : durationSecond}
        value={currentTime}
        className={`${styles.thumb} absolute bottom-0`}
        readOnly
      />
    </div>
  );
};
