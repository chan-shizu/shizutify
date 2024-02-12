"use client";

import {
  CurrentAudioIdContext,
  CurrentAudioIdContextType,
} from "@/provider/CurrentAudioIdProvider";
import Image from "next/image";
import { useContext } from "react";
import { resources } from "@/mockData";
import { IconContext } from "react-icons";
import {
  AudioPlayingContext,
  AudioPlayingContextType,
} from "@/provider/AudioPlayingProvider";
import { IoPauseSharp } from "react-icons/io5";
import { IoIosPlay } from "react-icons/io";
import styles from "./AudioPlayerBottomBar.module.css";
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

export const AudioPlayerBottomBar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useContext(
    AudioPlayingContext
  ) as AudioPlayingContextType;
  const [currentAudioId, _] = useContext(
    CurrentAudioIdContext
  ) as CurrentAudioIdContextType;
  const [audioCurrentTime, setAudioCurrentTime] = useContext(
    AudioCurrentTimeContext
  ) as AudioCurrentTimeContextType;
  const [audioPlayerModal, setAudioPlayerModal] = useContext(
    AudioPlayerModalContext
  ) as AudioPlayerModalContextType;
  const audio = useContext(AudioContext);

  const songInfo = resources[currentAudioId];

  const handleOnClickStopAndPauseButton = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    setIsAudioPlaying((prev) => !prev);
  };

  const handleOnClickBottomBar = () => {
    setAudioPlayerModal(true);
  };

  return (
    <div onClick={handleOnClickBottomBar} className={`${styles.bottom_bar} `}>
      <div className="flex justify-between">
        <div className="flex justify-center gap-x-2">
          <Image
            src={songInfo.imagePath}
            width={80}
            height={80}
            alt="artist image"
            className="rounded-md"
          />
          <div className="flex flex-col justify-center">
            <p className="font-semibold">{songInfo.songTitle}</p>
            <p className="text-xl text-opacity-80 pt-2">
              {songInfo.artistName}
            </p>
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
