"use client";

import {
  CurrentSongIdContext,
  CurrentSongIdContextType,
} from "@/provider/CurrentSongIdProvider";
import { SongsContext } from "@/provider/SongsProvider";
import { useContext } from "react";

export const useFilterCurrentMusic = () => {
  const songs = useContext(SongsContext);
  const [currentSongId, setCurrentSongId] = useContext(
    CurrentSongIdContext
  ) as CurrentSongIdContextType;

  const song = songs?.find((song) => song.song_id === currentSongId);

  return song;
};
