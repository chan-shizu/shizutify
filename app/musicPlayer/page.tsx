"use client";

import { useContext, useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { IoIosPlayCircle } from "react-icons/io";
import {
  IoPauseCircleSharp,
  IoPlaySkipBack,
  IoPlaySkipForward,
} from "react-icons/io5";
import { resources } from "@/mockData";
import {
  AudioPlayingContext,
  AudioPlayingContextType,
} from "../../provider/AudioPlayingProvider";
import {
  CurrentAudioIdContext,
  CurrentAudioIdContextType,
} from "../../provider/CurrentAudioIdProvider";
import {
  AudioCurrentTimeContext,
  AudioCurrentTimeContextType,
} from "../../provider/AudioCurrentTimeProvider";

const audio = new Audio();
export const Page = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useContext(
    AudioPlayingContext
  ) as AudioPlayingContextType;
  const [currentAudioId, setCurrentAudioId] = useContext(
    CurrentAudioIdContext
  ) as CurrentAudioIdContextType;
  const [audioCurrentTime, setAudioCurrentTime] = useContext(
    AudioCurrentTimeContext
  ) as AudioCurrentTimeContextType;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAudioPlaying) {
      audio?.play().catch(() => {
        // throw new Error("音声ファイルが見つかりません");
      });
    } else {
      audio?.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    setLoading(true);
    audio.src = resources[currentAudioId].musicPath;
    if (isAudioPlaying) {
      audio.play();
    }
    if (audio.duration) setLoading(false);
  }, [currentAudioId]);

  useEffect(() => {
    if (!isAudioPlaying) return;
    const interval = setInterval(() => {
      setAudioCurrentTime(audio.currentTime);
      if (audio.currentTime == audio.duration) {
        incrementAudioId();
      }
    }, 500);
    return () => clearInterval(interval);
  }, [isAudioPlaying]);

  const handleOnClickStopAndPauseButton = () => {
    setIsAudioPlaying((prev) => !prev);
  };

  const incrementAudioId = () => {
    setCurrentAudioId((prev) => (prev + 1) % resources.length);
    setAudioCurrentTime(0);
  };

  const decrementAudioId = () => {
    setCurrentAudioId((prev) =>
      prev - 1 == -1 ? resources.length - 1 : prev - 1
    );
    setAudioCurrentTime(0);
  };

  const updateCurrentTime = (val: number) => {
    audio.currentTime = val;
    setAudioCurrentTime(val);
  };

  return (
    <div className="px-5 bg-gradient-to-b from-teal-800 to-teal-950 text-white min-h-screen">
      <header className="py-5 text-center font-sans">
        おすすめの曲を再生中
      </header>
      <img
        className="rounded-2xl mt-4"
        src={resources[currentAudioId].imagePath}
        alt="artist image"
      />
      <div className="mt-6 flex justify-between">
        <div>
          <h2 className="font-bold text-2xl">
            {resources[currentAudioId].songTitle}
          </h2>
          <p className="text-lg text-gray-300">
            {resources[currentAudioId].artistName}
          </p>
        </div>
        <div>
          <button>-</button>
          <button>+</button>
        </div>
      </div>
      {/* <div className="mt-5 w-full">
        <AudioRangeSlider
          durationSecond={audio.duration}
          currentTime={audioCurrentTime}
          onChange={updateCurrentTime}
        />
      </div> */}
      <div className="mt-4 text-center flex justify-center gap-x-5 align-middle">
        <button className="block" onClick={decrementAudioId}>
          <IconContext.Provider value={{ size: "40px" }}>
            <IoPlaySkipBack />
          </IconContext.Provider>
        </button>
        <button className="block" onClick={handleOnClickStopAndPauseButton}>
          <IconContext.Provider value={{ size: "80px" }}>
            {isAudioPlaying ? <IoPauseCircleSharp /> : <IoIosPlayCircle />}
          </IconContext.Provider>
        </button>
        <button className="block" onClick={incrementAudioId}>
          <IconContext.Provider value={{ size: "40px" }}>
            <IoPlaySkipForward />
          </IconContext.Provider>
        </button>
      </div>
    </div>
  );
};

export default Page;
