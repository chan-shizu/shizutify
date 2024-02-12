import Image from "next/image";
import { FC } from "react";

type Props = { imagePath: string; songTitle: string; songId: string };

export const HistorySongCard: FC<Props> = ({
  imagePath,
  songTitle,
  songId,
}) => {
  return (
    <div className="text-sm flex-none">
      <Image src={imagePath} width={120} height={120} alt="artist image" />
      <p className="mt-2">{songTitle}</p>
    </div>
  );
};
