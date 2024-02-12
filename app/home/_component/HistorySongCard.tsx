import Image from "next/image";
import { FC } from "react";

type Props = { songTitle: string; songId: string };

export const HistorySongCard: FC<Props> = ({ songTitle, songId }) => {
  const imagePath =
    process.env.NEXT_PUBLIC_AWS_S3_BUCKET_URL + "image/" + songId + ".jpg";
  return (
    <div className="text-sm flex-none">
      <Image src={imagePath} width={120} height={120} alt="artist image" />
      <p className="mt-2">{songTitle}</p>
    </div>
  );
};
