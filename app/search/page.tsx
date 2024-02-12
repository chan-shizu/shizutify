"use client";

import { resources } from "@/mockData";
import { useState } from "react";
import { IconContext } from "react-icons";
import { IoMdSearch } from "react-icons/io";
import { SongCard } from "../../component/SongCard";
import { BottomBar } from "@/component/BottomBar";
import { AudioPlayerBottomBar } from "@/component/AudioPlayerBottomBar";

export const Page = () => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <div className="px-4 bg-zinc-800 min-h-screen">
      <h1 className="text-center text-2xl pt-5 font-semibold">検索</h1>
      <label
        htmlFor="search"
        className="bg-white w-full h-12 flex relative mt-7 rounded-md"
      >
        {searchInput === "" && (
          <div className="pointer-events-none w-8 h-8 absolute top-7 transform -translate-y-1/2 left-3">
            <IconContext.Provider value={{ size: "30px", color: "gray" }}>
              <IoMdSearch />
            </IconContext.Provider>
          </div>
        )}
        <input
          name="search"
          placeholder="　　何を聴きたいですか?"
          className="text-black rounded-md w-full h-full px-3"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </label>
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
      <div className="fixed bottom-20 left-0 w-full">
        <AudioPlayerBottomBar />
      </div>
      <div className="fixed bottom-0 left-0 w-full opacity-90 bg-black py-3">
        <BottomBar />
      </div>
    </div>
  );
};

export default Page;
