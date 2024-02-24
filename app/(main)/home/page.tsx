"use client";

import { resources } from "@/mockData";
import { RecommendSongCard } from "./_component/RecommendSongCard";
import { SongCard } from "./_component/SongCard";
import { AudioPlayerBottomBar } from "@/components/AudioPlayerBottomBar";
import { BottomBar } from "@/components/BottomBar";
import { useContext, useEffect, useState } from "react";
import { SongsContext } from "@/provider/SongsProvider";
import { DynamoSong } from "@/type/dynamo";
import {
  CurrentSongIdContext,
  CurrentSongIdContextType,
} from "@/provider/CurrentSongIdProvider";
import {
  RecentSongIdsContext,
  RecentSongIdsContextType,
} from "@/provider/RecentSongIdsProvider";
import { AudioContext } from "@/provider/AudioProvider";
import { formatCreatedAt } from "@/lib/formatCreatedAt";
import {
  AudioCurrentTimeContext,
  AudioCurrentTimeContextType,
} from "@/provider/AudioCurrentTimeProvider";

export const Page = () => {
  const [currentSongId, setCurrentSongId] = useContext(
    CurrentSongIdContext
  ) as CurrentSongIdContextType;
  const [recentSongIds, addRecentSongIds] = useContext(
    RecentSongIdsContext
  ) as RecentSongIdsContextType;
  const songs = useContext(SongsContext) as DynamoSong[];
  const [audioCurrentTime, setAudioCurrentTime] = useContext(
    AudioCurrentTimeContext
  ) as AudioCurrentTimeContextType;
  const audio = useContext(AudioContext);
  const [randomSongs, setRandomSongs] = useState<DynamoSong[]>([]);

  useEffect(() => {
    const initialRandomSongs = [...songs]
      .map((song) => song.song_id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 8)
      .map((songId) => songs.find((song) => song.song_id === songId))
      .filter(
        (item): item is Exclude<typeof item, undefined> => item !== undefined
      );
    setRandomSongs(initialRandomSongs);

    // タブが変わったときに曲が最初から再生されないようにする
    if (audio) {
      audio.load();
      audio.currentTime = audioCurrentTime ?? 0;
    }
  }, []);

  const newSongs = [...songs]
    .sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
    .slice(0, 8)
    .filter(
      (item): item is Exclude<typeof item, undefined> => item !== undefined
    );
  const recentSongs = recentSongIds
    .map((songId) => songs.find((song) => song.song_id === songId))
    .filter(
      (item): item is Exclude<typeof item, undefined> => item !== undefined
    );

  return (
    <div
      className={`px-4 bg-zinc-800 min-h-screen ${
        currentSongId !== "" ? "pb-48" : "pb-24"
      }`}
    >
      <h1 className="text-center text-2xl font-semibold pt-5">ホーム</h1>
      <section className="pt-3">
        <h2 className="text-xl">おすすめの曲</h2>
        <div className="grid grid-cols-2 gap-2 mt-3">
          {newSongs.map((song) => (
            <RecommendSongCard
              key={"recommend_song_" + song.song_id}
              songTitle={song?.song_name}
              songId={song?.song_id}
            />
          ))}
        </div>
      </section>
      <section className="mt-6">
        <h2 className="text-xl">最近追加された曲</h2>
        <div className="flex gap-x-4 overflow-x-scroll mt-3">
          {newSongs.map((song) => (
            <SongCard
              key={"new_song_" + song.song_id}
              songTitle={song.song_name}
              songId={song.song_id}
              createdAt={formatCreatedAt(song.created_at)}
            />
          ))}
        </div>
      </section>
      <section className="mt-6">
        <h2 className="text-xl">最近聞いた曲</h2>
        <div className="flex gap-x-4 overflow-x-scroll mt-3">
          {recentSongs.map((song, i) => (
            <SongCard
              key={"recent_song_" + i}
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
