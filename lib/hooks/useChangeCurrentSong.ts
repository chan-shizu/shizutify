"use client";

import { useContext } from "react";
import {
  AudioCurrentTimeContext,
  AudioCurrentTimeContextType,
} from "@/provider/AudioCurrentTimeProvider";
import {
  AudioPlayerModalContext,
  AudioPlayerModalContextType,
} from "@/provider/AudioPlayerModalProvider";
import {
  CurrentSongIdContext,
  CurrentSongIdContextType,
} from "@/provider/CurrentSongIdProvider";
import { AudioContext } from "@/provider/AudioProvider";
import { SongsContext } from "@/provider/SongsProvider";
import {
  AudioPlayingContext,
  AudioPlayingContextType,
} from "@/provider/AudioPlayingProvider";
import {
  SongHistoriesContext,
  SongHistoriesContextType,
} from "@/provider/SongHistoriesProvider";
import {
  RecentSongIdsContext,
  RecentSongIdsContextType,
} from "@/provider/RecentSongIdsProvider";

export const useChangeCurrentSong = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useContext(
    AudioPlayingContext
  ) as AudioPlayingContextType;
  const [currentSongId, setCurrentSongId] = useContext(
    CurrentSongIdContext
  ) as CurrentSongIdContextType;
  const [audioCurrentTime, setAudioCurrentTime] = useContext(
    AudioCurrentTimeContext
  ) as AudioCurrentTimeContextType;
  const [audioPlayerModal, setAudioPlayerModal] = useContext(
    AudioPlayerModalContext
  ) as AudioPlayerModalContextType;
  const [songHistories, setSongHistories] = useContext(
    SongHistoriesContext
  ) as SongHistoriesContextType;
  const [recentSongIds, addRecentSongIds] = useContext(
    RecentSongIdsContext
  ) as RecentSongIdsContextType;
  const audio = useContext(AudioContext);

  const changeCurrentSong = (songId: string) => {
    if (!audio) return;
    setCurrentSongId(songId);
    setAudioCurrentTime(0);
    setAudioPlayerModal(true);
    addRecentSongIds(songId);
    if (currentSongId !== "") {
      setSongHistories((prev) => [...prev, currentSongId]);
    }
    audio.src =
      process.env.NEXT_PUBLIC_AWS_S3_BUCKET_URL + "audio/" + songId + ".mp3";
    if (isAudioPlaying) {
      audio.play();
    }
  };

  return changeCurrentSong;
};
