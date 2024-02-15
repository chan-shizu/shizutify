"use client";

import { resources } from "@/mockData";
import { RecommendSongCard } from "./_component/RecommendSongCard";
import { HistorySongCard } from "./_component/HistorySongCard";
import { AudioPlayerBottomBar } from "@/components/AudioPlayerBottomBar";
import { BottomBar } from "@/components/BottomBar";
import { useContext } from "react";
import { SongsContext } from "@/provider/SongsProvider";
import { DynamoSong } from "@/type/dynamo";
import {
  CurrentSongIdContext,
  CurrentSongIdContextType,
} from "@/provider/CurrentSongIdProvider";

export const Page = () => {
  const [currentSongId, setCurrentSongId] = useContext(
    CurrentSongIdContext
  ) as CurrentSongIdContextType;
  const songs = useContext(SongsContext) as DynamoSong[];

  return (
    <div
      className={`px-4 bg-zinc-800 min-h-screen ${
        currentSongId !== "" ? "pb-48" : "pb-24"
      }`}
    >
      <h1 className="text-center text-2xl font-semibold pt-5">ホーム</h1>
      <section className="pt-3">
        <h2 className="text-xl">今日のおすすめ</h2>
        <div className="grid grid-cols-2 gap-2 mt-3">
          {songs.map((song) => (
            <RecommendSongCard
              key={song.song_id}
              songTitle={song.song_name}
              songId={song.song_id}
            />
          ))}
        </div>
      </section>
      <section className="mt-6">
        <h2 className="text-xl">最近追加された曲</h2>
        <div className="flex gap-x-4 overflow-x-scroll mt-3">
          {songs.map((song) => (
            <HistorySongCard
              key={song.song_id}
              songTitle={song.song_name}
              songId={song.song_id}
            />
          ))}
        </div>
      </section>
      <section className="mt-6">
        <h2 className="text-xl">最近聞いた曲</h2>
        <div className="flex gap-x-4 overflow-x-scroll mt-3">
          {songs.map((song) => (
            <HistorySongCard
              key={song.song_id}
              songTitle={song.song_name}
              songId={song.song_id}
            />
          ))}
        </div>
      </section>
      {currentSongId !== "" && <AudioPlayerBottomBar />}
      <BottomBar />
    </div>
  );
};

export default Page;
