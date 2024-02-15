"use client";

import {
  CurrentSongIdContext,
  CurrentSongIdContextType,
} from "@/provider/CurrentSongIdProvider";
import Image from "next/image";
import { useContext } from "react";
import { IconContext } from "react-icons";
import {
  AudioPlayingContext,
  AudioPlayingContextType,
} from "@/provider/AudioPlayingProvider";
import { IoPauseSharp } from "react-icons/io5";
import { IoIosPlay } from "react-icons/io";
import {
  AudioPlayerModalContext,
  AudioPlayerModalContextType,
} from "@/provider/AudioPlayerModalProvider";
import {
  AudioCurrentTimeContext,
  AudioCurrentTimeContextType,
} from "@/provider/AudioCurrentTimeProvider";
import { AudioRangeSliderBottomBar } from "./AudioRangeSliderBottomBar";
import { AudioContext } from "@/provider/AudioProvider";
import { useFilterCurrentMusic } from "@/lib/hooks/useFilterCurrentMusic";

export const AudioPlayerBottomBar = () => {
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
  const audio = useContext(AudioContext);

  const song = useFilterCurrentMusic();

  const handleOnClickStopAndPauseButton = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    setIsAudioPlaying((prev) => !prev);
  };

  const handleOnClickBottomBar = () => {
    setAudioPlayerModal(true);
  };

  const imagePath =
    process.env.NEXT_PUBLIC_AWS_S3_BUCKET_URL +
    "image/" +
    song?.song_id +
    ".jpg";

  return (
    // <div onClick={handleOnClickBottomBar} className={`${styles.bottom_bar} `}>
    <div
      onClick={handleOnClickBottomBar}
      className="pt-2 pl-3 pr-5 bg-[#33251f]"
    >
      <div className="flex justify-between">
        <div className="flex justify-center gap-x-4">
          <Image
            src={imagePath}
            width={60}
            height={60}
            alt="artist image"
            className="rounded-md"
          />
          <div className="flex flex-col justify-center">
            <p className="font-semibold">{song?.song_name}</p>
            <p className="text-xl text-opacity-80 pt-1">{song?.artist_name}</p>
          </div>
        </div>
        <button
          className="block"
          onClick={(event) => handleOnClickStopAndPauseButton(event)}
        >
          <IconContext.Provider value={{ size: "40px", color: "white" }}>
            {isAudioPlaying ? <IoPauseSharp /> : <IoIosPlay />}
          </IconContext.Provider>
        </button>
      </div>
      <AudioRangeSliderBottomBar
        durationSecond={audio.duration}
        currentTime={audioCurrentTime}
      />
    </div>
  );
};
