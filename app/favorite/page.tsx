"use client";

import { resources } from "@/mockData";
import { useContext, useState } from "react";
import { IconContext } from "react-icons";
import { IoMdSearch } from "react-icons/io";
import { SongCard } from "@/component/SongCard";
import { AudioPlayerBottomBar } from "@/component/AudioPlayerBottomBar";
import { BottomBar } from "@/component/BottomBar";
import {
  CurrentSongIdContext,
  CurrentSongIdContextType,
} from "@/provider/CurrentSongIdProvider";

export const Page = () => {
  const [currentSongId, setCurrentSongId] = useContext(
    CurrentSongIdContext
  ) as CurrentSongIdContextType;

  return (
    <div className="px-4 bg-zinc-800 min-h-screen">
      <h1 className="text-center text-2xl pt-5 font-semibold">お気に入り</h1>
      <div className="flex flex-col gap-y-3 mt-8">
        {resources.map((song) => (
          <SongCard
            key={song.musicPath}
            imagePath={song.imagePath}
            songTitle={song.songTitle}
            artistName={song.artistName}
            songId={"1"}
          />
        ))}
      </div>
      {currentSongId !== "" && (
        <div className="fixed bottom-20 left-0 w-full">
          <AudioPlayerBottomBar />
        </div>
      )}
      <div className="fixed bottom-0 left-0 w-full opacity-90 bg-black py-3">
        <BottomBar />
      </div>
    </div>
  );
};

export default Page;
