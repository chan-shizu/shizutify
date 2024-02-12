"use client";

import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

export const AudioPlayerModalContext = createContext<
  AudioPlayerModalContextType | undefined
>(undefined);

export type AudioPlayerModalContextType = [
  boolean,
  Dispatch<SetStateAction<boolean>>
];

type Props = {
  children: ReactNode;
};
export const AudioPlayerModalProvider = ({ children }: Props) => {
  const [audioPlayerModal, setAudioPlayerModal] = useState(false);

  return (
    <AudioPlayerModalContext.Provider
      value={[audioPlayerModal, setAudioPlayerModal]}
    >
      {children}
    </AudioPlayerModalContext.Provider>
  );
};
