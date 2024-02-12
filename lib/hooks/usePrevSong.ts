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

export const usePrevSong = () => {
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

  const changeSongPrev = () => {
    if (!songs) return;

    if (songHistories.length === 0) {
      const prevSongId = songs?.map((song) => song.song_id)[
        Math.floor(Math.random() * songs.length)
      ];
      setCurrentSongId(prevSongId!);
    } else {
      setCurrentSongId(songHistories[songHistories.length - 1]);
      setSongHistories((prev) => prev.slice(0, -1));
    }
    setAudioCurrentTime(0);
  };

  return changeSongPrev;
};
