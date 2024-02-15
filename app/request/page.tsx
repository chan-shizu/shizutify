"use client";

import { AudioPlayerBottomBar } from "@/components/AudioPlayerBottomBar";
import { BottomBar } from "@/components/BottomBar";
import {
  CurrentSongIdContext,
  CurrentSongIdContextType,
} from "@/provider/CurrentSongIdProvider";
import {
  FavoriteSongIdsContext,
  FavoriteSongIdsContextType,
} from "@/provider/FavoriteSongIdsProvider";
import { SongsContext } from "@/provider/SongsProvider";
import { error } from "console";
import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  customerName: string
  artistName: string
  songName: string
  other: string
}

export const Page = () => {
  const [currentSongId, setCurrentSongId] = useContext(
    CurrentSongIdContext
  ) as CurrentSongIdContextType;
  const songs = useContext(SongsContext);
  const [favoriteSongIds, updateFavoriteSongIds] = useContext(
    FavoriteSongIdsContext
  ) as FavoriteSongIdsContextType;
  const favoriteSongs = songs?.filter((song) =>
    favoriteSongIds.includes(song.song_id)
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  return (
    <div className={`bg-zinc-800 min-h-screen px-4 ${
      currentSongId !== "" ? "pb-48" : "pb-24"
    }`}>
      <h1 className="text-center text-2xl pt-5 font-semibold">リクエスト</h1>
      <p className="mt-4">希望の曲などがあればこちらからお願いします！</p>
      <form className="mt-8 text-sm px-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-y-2">
        <div>
          <label className="block">
            あなたの名前(誰だか分かる名前だとうれしいです)
          </label>
          <input className="rounded-lg mt-2 w-full h-8 text-black px-2" {...register("customerName", { required: "名前は必須です！"})} />
          <p className="h-6 text-red-400 mt-2">{errors.customerName?.message}</p>
        </div>
        <div>
          <label className="block">アーティスト名</label>
          <input className="rounded-lg mt-2 w-full h-8 text-black px-2" {...register("artistName", { required: "アーティスト名は必須です！"})} />
          <p className="h-6 text-red-400 mt-2">{errors.artistName?.message}</p>
        </div>
        <div>
          <label className="block">曲名</label>
          <input className="rounded-lg mt-2 w-full h-8 text-black px-2" {...register("songName", { required: "曲名は必須です！"})} />
          <p className="h-6 text-red-400 mt-2">{errors.songName?.message}</p>
        </div>
        <div>
          <label className="block">その他要望など</label>
          <textarea rows={3} className="rounded-lg mt-2 w-full h-24 text-black px-2" {...register("other")} />
        </div>
        </div>
        <input type="submit" className="mx-auto mt-8 py-3 w-full text-black bg-slate-400 rounded-full px-2" value="送信" />
      </form>
      {currentSongId !== "" && <AudioPlayerBottomBar />}
      <BottomBar />
    </div>
  );
};

export default Page;
