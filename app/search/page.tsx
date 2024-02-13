"use client";

import { resources } from "@/mockData";
import { useContext, useState } from "react";
import { IconContext } from "react-icons";
import { IoMdSearch } from "react-icons/io";
import { SongCard } from "../../component/SongCard";
import { BottomBar } from "@/component/BottomBar";
import { AudioPlayerBottomBar } from "@/component/AudioPlayerBottomBar";
import {
  CurrentSongIdContext,
  CurrentSongIdContextType,
} from "@/provider/CurrentSongIdProvider";
import { SongsContext } from "@/provider/SongsProvider";

export const Page = () => {
  const [currentSongId, setCurrentSongId] = useContext(
    CurrentSongIdContext
  ) as CurrentSongIdContextType;
  const songs = useContext(SongsContext);
  const [searchInput, setSearchInput] = useState("");

  const filteredSongs = songs?.filter(
    (song) =>
      song.artist_name.includes(searchInput) ||
      song.song_name.includes(searchInput)
  );

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
        {filteredSongs &&
          filteredSongs.map((song) => (
            <SongCard
              key={song.song_id}
              songTitle={song.song_name}
              artistName={song.artist_name}
              songId={song.song_id}
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
