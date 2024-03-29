"use client";

import { useContext, useEffect, useState } from "react";
import { SongCard } from "@/components/SongCard";
import { AudioPlayerBottomBar } from "@/components/AudioPlayerBottomBar";
import { BottomBar } from "@/components/BottomBar";
import {
  CurrentSongIdContext,
  CurrentSongIdContextType,
} from "@/provider/CurrentSongIdProvider";
import { SongsContext } from "@/provider/SongsProvider";
import {
  FavoriteSongIdsContext,
  FavoriteSongIdsContextType,
} from "@/provider/FavoriteSongIdsProvider";
import { AudioContext } from "@/provider/AudioProvider";
import {
  AudioCurrentTimeContext,
  AudioCurrentTimeContextType,
} from "@/provider/AudioCurrentTimeProvider";

export const Page = () => {
  const [currentSongId, setCurrentSongId] = useContext(
    CurrentSongIdContext
  ) as CurrentSongIdContextType;
  const songs = useContext(SongsContext);
  const [favoriteSongIds, updateFavoriteSongIds] = useContext(
    FavoriteSongIdsContext
  ) as FavoriteSongIdsContextType;
  const [audioCurrentTime, setAudioCurrentTime] = useContext(
    AudioCurrentTimeContext
  ) as AudioCurrentTimeContextType;
  const audio = useContext(AudioContext);
  const favoriteSongs = songs?.filter((song) =>
    favoriteSongIds.includes(song.song_id)
  );

  // タブが変わったときに曲が最初から再生されないようにする
  useEffect(() => {
    if (audio) {
      audio.load();
      audio.currentTime = audioCurrentTime ?? 0;
    }
  }, []);

  return (
    <div
      className={`px-4 bg-zinc-800 min-h-screen ${
        currentSongId !== "" ? "pb-48" : "pb-24"
      }`}
    >
      <h1 className="text-center text-2xl pt-5 font-semibold">お気に入り</h1>
      <div className="flex flex-col gap-y-3 mt-8">
        {favoriteSongs &&
          favoriteSongs.map((song) => (
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
