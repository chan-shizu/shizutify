import { FC, useCallback, useEffect, useRef } from "react";
import styles from "./AudioRangeSlider.module.css";
import { formatSecond } from "@/lib/formatSecond";

type Props = {
  durationSecond: number;
  currentTime: number;
  onChange: (val: number) => void;
};

const baseColor = "#808080";
const activeColor = "#FFF";

export const AudioRangeSlider: FC<Props> = ({
  durationSecond,
  currentTime,
  onChange,
}) => {
  const range = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const valuePercent = (currentTime / durationSecond) * 100;
    if (range.current) {
      range.current.style.height = "4px";
      range.current.style.borderRadius = "2px";
      range.current.style.background = `linear-gradient(to right, ${activeColor} ${valuePercent}%, ${baseColor} ${valuePercent}%)`;
    }
  }, [currentTime]);
  const durationSecondText = formatSecond(durationSecond);
  const currentTimeText = formatSecond(currentTime);

  return (
    <div className="w-full">
      <input
        type="range"
        ref={range}
        max={isNaN(durationSecond) ? 0 : durationSecond}
        value={currentTime}
        className={styles.thumb}
        onChange={(e) => onChange(+e.target.value)}
      />
      <div className="flex justify-between text-sm text-gray-100">
        <p>{currentTimeText}</p>
        <p>{durationSecondText}</p>
      </div>
    </div>
  );
};
