"use client";

import { ReactNode, createContext } from "react";

export const AudioContext = createContext<HTMLAudioElement | null>(null);

type Props = {
  children: ReactNode;
};

export const AudioProvider = ({ children }: Props) => {
  const audio = typeof Audio !== "undefined" ? new Audio() : null; // only call client
  return (
    <AudioContext.Provider value={audio}>{children}</AudioContext.Provider>
  );
};
