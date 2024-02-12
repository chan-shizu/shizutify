"use client";

import { FC, useContext, useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { IoIosArrowDown, IoIosPlayCircle } from "react-icons/io";
import {
  IoPauseCircleSharp,
  IoPlaySkipBack,
  IoPlaySkipForward,
} from "react-icons/io5";
import { resources } from "@/mockData";
import {
  AudioPlayingContext,
  AudioPlayingContextType,
} from "../provider/AudioPlayingProvider";
import {
  CurrentSongIdContext,
  CurrentSongIdContextType,
} from "../provider/CurrentSongIdProvider";
import {
  AudioCurrentTimeContext,
  AudioCurrentTimeContextType,
} from "../provider/AudioCurrentTimeProvider";

import styles from "./AudioPlayerModal.module.css";
import { AudioRangeSlider } from "./AudioRangeSlider";
import {
  AudioPlayerModalContext,
  AudioPlayerModalContextType,
} from "@/provider/AudioPlayerModalProvider";
import { AudioContext } from "@/provider/AudioProvider";
import { useFilterCurrentMusic } from "@/lib/hooks/useFilterCurrentMusic";

type Props = {};

export const AudioPlayerModal: FC<Props> = () => {
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

  useEffect(() => {
    if (isAudioPlaying) {
      audio?.play().catch(() => {
        // throw new Error("音声ファイルが見つかりません");
      });
    } else {
      audio?.pause();
    }
  }, [isAudioPlaying, audio]);

  useEffect(() => {
    audio.src =
      process.env.NEXT_PUBLIC_AWS_S3_BUCKET_URL +
      "audio/" +
      song?.song_id +
      ".mp3";
    if (isAudioPlaying) {
      audio.play();
    }
  }, [currentSongId, audio]);

  useEffect(() => {
    if (!isAudioPlaying) return;
    const interval = setInterval(() => {
      setAudioCurrentTime(audio.currentTime);
      if (audio.currentTime == audio.duration) {
        incrementSongId();
      }
    }, 500);
    return () => clearInterval(interval);
  }, [isAudioPlaying]);

  const handleOnClickStopAndPauseButton = () => {
    setIsAudioPlaying((prev) => !prev);
  };

  const incrementSongId = () => {
    // setCurrentSongId((prev) => (prev + 1) % resources.length);
    setAudioCurrentTime(0);
  };

  const decrementSongId = () => {
    setCurrentSongId(
      (prev) =>
        // prev - 1 == -1 ? resources.length - 1 : prev - 1
        prev
    );
    setAudioCurrentTime(0);
  };

  const updateCurrentTime = (val: number) => {
    audio.currentTime = val;
    setAudioCurrentTime(val);
  };

  const closeModal = () => {
    setAudioPlayerModal(false);
  };

  if (!audioPlayerModal) {
    return <></>;
  }

  const imagePath =
    process.env.NEXT_PUBLIC_AWS_S3_BUCKET_URL +
    "image/" +
    song?.song_id +
    ".jpg";

  return (
    <div
      className={`${styles.modal} px-5 bg-gradient-to-b w-full from-teal-800 to-teal-950 text-white min-h-screen z-10 flex flex-col justify-between`}
    >
      <div>
        <div className="relative">
          <button onClick={closeModal} className={`${styles.close_modal_icon}`}>
            <IconContext.Provider value={{ size: "40px", color: "white" }}>
              <IoIosArrowDown />
            </IconContext.Provider>
          </button>
          <h2 className="py-5 text-center font-sans">再生中</h2>
        </div>
        <img
          className="rounded-2xl mt-4 w-full"
          src={imagePath}
          alt="artist image"
        />
      </div>
      <div>
        <div className="mt-6 flex justify-between">
          <div>
            <h2 className="font-bold text-2xl">
              {/* {resources[currentSongId].songTitle} */}
              {song?.song_name}
            </h2>
            <p className="text-lg text-gray-300">
              {/* {resources[currentSongId].artistName} */}
              {song?.artist_name}
            </p>
          </div>
          <div>
            <button>-</button>
            <button>+</button>
          </div>
        </div>
        <div className="mt-5 w-full">
          <AudioRangeSlider
            durationSecond={audio.duration}
            currentTime={audioCurrentTime}
            onChange={updateCurrentTime}
          />
        </div>
        <div className="text-center flex justify-center gap-x-5 align-middle">
          <button className="block" onClick={decrementSongId}>
            <IconContext.Provider value={{ size: "40px" }}>
              <IoPlaySkipBack />
            </IconContext.Provider>
          </button>
          <button className="block" onClick={handleOnClickStopAndPauseButton}>
            <IconContext.Provider value={{ size: "80px" }}>
              {isAudioPlaying ? <IoPauseCircleSharp /> : <IoIosPlayCircle />}
            </IconContext.Provider>
          </button>
          <button className="block" onClick={incrementSongId}>
            <IconContext.Provider value={{ size: "40px" }}>
              <IoPlaySkipForward />
            </IconContext.Provider>
          </button>
        </div>
      </div>
    </div>
  );
};
