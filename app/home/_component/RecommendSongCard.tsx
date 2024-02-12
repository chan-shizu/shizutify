import { useChangeCurrentSong } from "@/lib/hooks/useChangeCurrentSong";
import Image from "next/image";
import { FC } from "react";

type Props = { songTitle: string; songId: string };

export const RecommendSongCard: FC<Props> = ({ songTitle, songId }) => {
  const changeCurrentSong = useChangeCurrentSong();

  const handleOnClick = () => {
    changeCurrentSong(songId);
  };

  const imagePath =
    process.env.NEXT_PUBLIC_AWS_S3_BUCKET_URL + "image/" + songId + ".jpg";

  return (
    <div
      className="flex w-full gap-x-2 bg-zinc-600 rounded-xl"
      onClick={handleOnClick}
    >
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
