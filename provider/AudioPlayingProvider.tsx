"use client";

import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

export const AudioPlayingContext =
  createContext<AudioPlayingContextType | null>(null);

export type AudioPlayingContextType = [
  boolean,
  Dispatch<SetStateAction<boolean>>
];

type Props = {
  children: ReactNode;
};
export const AudioPlayingProvider = ({ children }: Props) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(true);

  return (
    <AudioPlayingContext.Provider value={[isAudioPlaying, setIsAudioPlaying]}>
      {children}
    </AudioPlayingContext.Provider>
  );
};
