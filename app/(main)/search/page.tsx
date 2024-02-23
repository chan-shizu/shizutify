"use client";

import { resources } from "@/mockData";
import { useContext, useState } from "react";
import { IconContext } from "react-icons";
import { IoMdSearch } from "react-icons/io";
import { SongCard } from "../../../components/SongCard";
import { BottomBar } from "@/components/BottomBar";
import { AudioPlayerBottomBar } from "@/components/AudioPlayerBottomBar";
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
    <div
      className={`px-4 bg-zinc-800 min-h-screen ${
        currentSongId !== "" ? "pb-48" : "pb-24"
      }`}
    >
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
          placeholder="　　曲名、歌手名で検索"
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
      {currentSongId !== "" && <AudioPlayerBottomBar />}
      <BottomBar />
    </div>
  );
};

export default Page;
