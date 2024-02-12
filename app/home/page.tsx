"use client";

import { resources } from "@/mockData";
import { RecommendSongCard } from "./_component/RecommendSongCard";
import { HistorySongCard } from "./_component/HistorySongCard";
import { AudioPlayerBottomBar } from "@/component/AudioPlayerBottomBar";
import { BottomBar } from "@/component/BottomBar";

export const Page = () => {
  return (
    <div className="px-4 bg-zinc-800 min-h-screen">
      <h1 className="text-center text-2xl font-semibold pt-5">ホーム</h1>
      <section className="pt-3">
        <h2 className="text-xl">今日のおすすめ</h2>
        <div className="grid grid-cols-2 gap-2 mt-3">
          {resources.map((song) => (
            <RecommendSongCard
              key={song.musicPath}
              imagePath={song.imagePath}
              songTitle={song.songTitle}
              songId={"1"}
            />
          ))}
        </div>
      </section>
      <section className="mt-6">
        <h2 className="text-xl">最近聞いた曲</h2>
        <div className="flex gap-x-4 overflow-x-scroll mt-3">
          {resources.map((song) => (
            <HistorySongCard
              key={song.musicPath}
              imagePath={song.imagePath}
              songTitle={song.songTitle}
              songId={"1"}
            />
          ))}
        </div>
      </section>
      <div className="fixed bottom-20 left-0 w-full">
        <AudioPlayerBottomBar />
      </div>
      <div className="fixed bottom-0 left-0 w-full opacity-90 bg-black py-3 ">
        <BottomBar />
      </div>
    </div>
  );
};

export default Page;
