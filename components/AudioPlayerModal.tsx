"use client";

import { FC, useContext, useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { IoIosArrowDown, IoIosPlayCircle, IoMdHeart } from "react-icons/io";
import {
  IoPauseCircleSharp,
  IoPlaySkipBack,
  IoPlaySkipForward,
} from "react-icons/io5";
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

import { AudioRangeSlider } from "./AudioRangeSlider";
import {
  AudioPlayerModalContext,
  AudioPlayerModalContextType,
} from "@/provider/AudioPlayerModalProvider";
import { AudioContext } from "@/provider/AudioProvider";
import { useFilterCurrentMusic } from "@/lib/hooks/useFilterCurrentMusic";
import { useNextSong } from "@/lib/hooks/useNextSong";
import { usePrevSong } from "@/lib/hooks/usePrevSong";
import { FaRegHeart } from "react-icons/fa";
import {
  FavoriteSongIdsContext,
  FavoriteSongIdsContextType,
} from "@/provider/FavoriteSongIdsProvider";

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
  const changeSongNext = useNextSong();
  const changeSongPrev = usePrevSong();
  const [favoriteSongIds, updateFavoriteSongIds] = useContext(
    FavoriteSongIdsContext
  ) as FavoriteSongIdsContextType;

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
  }, [currentSongId, audio, isAudioPlaying, song]);

  useEffect(() => {
    if (!isAudioPlaying) return;
    const interval = setInterval(() => {
      setAudioCurrentTime(audio.currentTime);
      if (audio.currentTime == audio.duration) {
        changeSongNext();
      }
    }, 500);
    return () => clearInterval(interval);
  }, [isAudioPlaying, audio, changeSongNext, setAudioCurrentTime]);

  const handleOnClickStopAndPauseButton = () => {
    setIsAudioPlaying((prev) => !prev);
  };

  const updateCurrentTime = (val: number) => {
    audio.currentTime = val;
    setAudioCurrentTime(val);
  };

  const closeModal = () => {
    setAudioPlayerModal(false);
  };

  const handleOnHeartClick = () => {
    updateFavoriteSongIds(song?.song_id!);
    console.log(favoriteSongIds);
  };

  const imagePath =
    process.env.NEXT_PUBLIC_AWS_S3_BUCKET_URL +
    "image/" +
    song?.song_id +
    ".jpg";

  if (!audioPlayerModal) {
    return <></>;
  }

  return (
    <div className="fixed top-0 left-0 px-5 pb-3 bg-gradient-to-b w-full from-teal-800 to-teal-950 text-white min-h-screen z-10 flex flex-col justify-between">
      <div>
        <div className="relative">
          <button onClick={closeModal} className="absolute top-3 left-1">
            <IconContext.Provider value={{ size: "40px", color: "white" }}>
              <IoIosArrowDown />
            </IconContext.Provider>
          </button>
          <h2 className="py-5 text-center font-sans">再生中</h2>
        </div>
        <img
          className="rounded-2xl mt-4 w-full h-[calc(100vw-40px)] object-cover"
          src={imagePath}
          alt="artist image"
        />
      </div>
      <div>
        <div className="mt-6 flex justify-between">
          <div>
            <h2 className="font-bold text-2xl">{song?.song_name}</h2>
            <p className="text-lg text-gray-300">{song?.artist_name}</p>
          </div>
          <div className="flex pr-5 items-center" onClick={handleOnHeartClick}>
            {favoriteSongIds.includes(song?.song_id!) ? (
              <IconContext.Provider value={{ size: "45px", color: "white" }}>
                <IoMdHeart />
              </IconContext.Provider>
            ) : (
              <IconContext.Provider value={{ size: "45px", color: "gray" }}>
                <FaRegHeart />
              </IconContext.Provider>
            )}
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
          <button className="block" onClick={changeSongPrev}>
            <IconContext.Provider value={{ size: "40px" }}>
              <IoPlaySkipBack />
            </IconContext.Provider>
          </button>
          <button className="block" onClick={handleOnClickStopAndPauseButton}>
            <IconContext.Provider value={{ size: "80px" }}>
              {isAudioPlaying ? <IoPauseCircleSharp /> : <IoIosPlayCircle />}
            </IconContext.Provider>
          </button>
          <button className="block" onClick={changeSongNext}>
            <IconContext.Provider value={{ size: "40px" }}>
              <IoPlaySkipForward />
            </IconContext.Provider>
          </button>
        </div>
      </div>
    </div>
  );
};
