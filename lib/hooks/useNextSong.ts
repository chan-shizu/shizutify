import {
  AudioCurrentTimeContext,
  AudioCurrentTimeContextType,
} from "@/provider/AudioCurrentTimeProvider";
import {
  CurrentSongIdContext,
  CurrentSongIdContextType,
} from "@/provider/CurrentSongIdProvider";
import {
  SongHistoriesContext,
  SongHistoriesContextType,
} from "@/provider/SongHistoriesProvider";
import { SongsContext } from "@/provider/SongsProvider";
import { useContext } from "react";

export const useNextSong = () => {
  const [currentSongId, setCurrentSongId] = useContext(
    CurrentSongIdContext
  ) as CurrentSongIdContextType;
  const [audioCurrentTime, setAudioCurrentTime] = useContext(
    AudioCurrentTimeContext
  ) as AudioCurrentTimeContextType;
  const [songHistories, setSongHistories] = useContext(
    SongHistoriesContext
  ) as SongHistoriesContextType;
  const songs = useContext(SongsContext);

  const changeSongNext = () => {
    const nextSongId = songs?.map((song) => song.song_id)[
      Math.floor(Math.random() * songs.length)
    ];
    setCurrentSongId(nextSongId!);
    setAudioCurrentTime(0);
    if (currentSongId !== "") {
      setSongHistories((prev) => [...prev, currentSongId]);
    }
  };

  return changeSongNext;
};
