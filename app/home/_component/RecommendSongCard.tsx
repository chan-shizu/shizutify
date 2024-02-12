import Image from "next/image";
import { FC } from "react";

type Props = { imagePath: string; songTitle: string; songId: string };

export const RecommendSongCard: FC<Props> = ({
  imagePath,
  songTitle,
  songId,
}) => {
  return (
    <div className="flex w-full gap-x-2 bg-zinc-600 rounded-xl">
      <Image
        src={imagePath}
        width={60}
        height={60}
        alt="artist image"
        className="rounded-l-xl"
      />
      <p className="my-auto">{songTitle}</p>
    </div>
  );
};
