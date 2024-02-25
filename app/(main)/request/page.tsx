"use client";

import { AudioPlayerBottomBar } from "@/components/AudioPlayerBottomBar";
import { BottomBar } from "@/components/BottomBar";
import {
  AudioCurrentTimeContext,
  AudioCurrentTimeContextType,
} from "@/provider/AudioCurrentTimeProvider";
import {
  CurrentSongIdContext,
  CurrentSongIdContextType,
} from "@/provider/CurrentSongIdProvider";
import { AudioContext } from "@/provider/AudioProvider";
import { useContext, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

type Inputs = {
  customerName: string;
  artistName: string;
  songName: string;
  other: string;
};

export const Page = () => {
  const [currentSongId, setCurrentSongId] = useContext(
    CurrentSongIdContext
  ) as CurrentSongIdContextType;
  const audio = useContext(AudioContext);
  const [audioCurrentTime, setAudioCurrentTime] = useContext(
    AudioCurrentTimeContext
  ) as AudioCurrentTimeContextType;

  // タブが変わったときに曲が最初から再生されないようにする
  useEffect(() => {
    if (audio) {
      audio.load();
      audio.currentTime = audioCurrentTime ?? 0;
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await fetch("api/request", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (res.ok) {
      reset();
      toast.success(
        "リクエストを送信しました！曲が追加されるまで少々お待ちください！",
        { duration: 10000 }
      );
    } else {
      toast.error(
        "エラーが発生しました、、直接連絡していただければ対応します、、",
        { duration: 10000 }
      );
    }
  };

  return (
    <div
      className={`bg-zinc-800 min-h-screen px-4 ${
        currentSongId !== "" ? "pb-48" : "pb-24"
      }`}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-center text-2xl pt-5 font-semibold">リクエスト</h1>
      <p className="mt-4 text-center">
        希望の曲などがあればこちらからお願いします！
      </p>
      <form className="mt-8 text-sm px-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-y-2">
          <div>
            <label className="block">
              あなたの名前(※必須、非公開なので出来たら誰だか分かる名前で！)
            </label>
            <input
              className="rounded-lg mt-2 w-full h-10 text-black px-2 text-lg"
              {...register("customerName", { required: "名前は必須です！" })}
            />
            <p className="h-6 text-red-400 mt-2">
              {errors.customerName?.message}
            </p>
          </div>
          <div>
            <label className="block">アーティスト名(※必須)</label>
            <input
              className="rounded-lg mt-2 w-full h-10 text-black px-2 text-lg"
              {...register("artistName", {
                required: "アーティスト名は必須です！",
              })}
            />
            <p className="h-6 text-red-400 mt-2">
              {errors.artistName?.message}
            </p>
          </div>
          <div>
            <label className="block">曲名(※必須)</label>
            <input
              className="rounded-lg mt-2 w-full h-10 text-black px-2 text-lg"
              {...register("songName", { required: "曲名は必須です！" })}
            />
            <p className="h-6 text-red-400 mt-2">{errors.songName?.message}</p>
          </div>
          <div>
            <label className="block">その他要望など</label>
            <textarea
              rows={3}
              className="rounded-lg mt-2 w-full h-24 text-black px-2"
              {...register("other")}
            />
          </div>
        </div>
        <input
          type="submit"
          className="mx-auto mt-8 py-3 w-full bg-rose-500 rounded-full px-2 text-lg font-semibold"
          value="送信"
        />
      </form>
      {currentSongId !== "" && <AudioPlayerBottomBar />}
      <BottomBar />
    </div>
  );
};

export default Page;
