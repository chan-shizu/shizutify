import { useChangeCurrentSong } from "@/lib/hooks/useChangeCurrentSong";
import Image from "next/image";
import { FC } from "react";

type Props = { songTitle: string; songId: string };

export const HistorySongCard: FC<Props> = ({ songTitle, songId }) => {
  const changeCurrentSong = useChangeCurrentSong();

  const handleOnClick = () => {
    changeCurrentSong(songId);
  };

  const imagePath =
    process.env.NEXT_PUBLIC_AWS_S3_BUCKET_URL + "image/" + songId + ".jpg";
  return (
    <div
      className="text-sm flex-none h-[120px] w-[120px] relative"
      onClick={handleOnClick}
    >
      <Image
        src={imagePath}
        alt="artist image"
        fill
        style={{ objectFit: "cover" }}
      />
      <p className="mt-2">{songTitle}</p>
    </div>
  );
};
