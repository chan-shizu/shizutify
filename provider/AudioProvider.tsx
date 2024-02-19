"use client";

import { ReactNode, createContext, useEffect, useState } from "react";

export const AudioContext = createContext<HTMLAudioElement | null>(null);

type Props = {
  children: ReactNode;
};

const audio = typeof Audio !== "undefined" ? new Audio() : null; // only call client
export const AudioProvider = ({ children }: Props) => {
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    audio
  );
  return (
    <AudioContext.Provider value={currentAudio}>
      {children}
    </AudioContext.Provider>
  );
};
