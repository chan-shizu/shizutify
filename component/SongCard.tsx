import Image from "next/image";
import { FC } from "react";

type Props = {
  imagePath: string;
  songTitle: string;
  artistName: string;
  songId: string;
};

export const SongCard: FC<Props> = ({
  imagePath,
  songTitle,
  artistName,
  songId,
}) => {
  return (
    <div className="flex w-full gap-x-4 bg-zinc-600 rounded-xl">
      <Image
        src={imagePath}
        width={80}
        height={80}
        alt="artist image"
        className="rounded-l-xl"
      />
      <div className="flex flex-col justify-center">
        <p className="text-sm text-gray-300">{artistName}</p>
        <p className="text-lg">{songTitle}</p>
      </div>
    </div>
  );
};
