"use client";

import { ReactNode, createContext } from "react";

const audio = new Audio();

export const AudioContext = createContext<HTMLAudioElement>(audio);

type Props = {
  children: ReactNode;
};

export const AudioProvider = ({ children }: Props) => {
  return (
    <AudioContext.Provider value={audio}>{children}</AudioContext.Provider>
  );
};
