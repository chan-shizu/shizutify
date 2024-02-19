import { useChangeCurrentSong } from "@/lib/hooks/useChangeCurrentSong";
import Image from "next/image";
import { FC } from "react";

type Props = {
  songTitle: string;
  artistName: string;
  songId: string;
};

export const SongCard: FC<Props> = ({ songTitle, artistName, songId }) => {
  const changeCurrentSong = useChangeCurrentSong();

  const handleOnClick = () => {
    changeCurrentSong(songId);
  };

  const imagePath =
    process.env.NEXT_PUBLIC_AWS_S3_BUCKET_URL + "image/" + songId + ".jpg";

  return (
    <div
      className="flex w-full gap-x-4 bg-zinc-600 rounded-xl"
      onClick={handleOnClick}
    >
      <div className="relative w-[60px] h-[60px]">
        <Image
          src={imagePath}
          fill
          alt="artist image"
          className="rounded-l-xl"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-sm text-gray-300">{artistName}</p>
        <p className="text-lg">{songTitle}</p>
      </div>
    </div>
  );
};
