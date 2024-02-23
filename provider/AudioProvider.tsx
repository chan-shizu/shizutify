"use client";

import { ReactNode, createContext, useEffect, useState } from "react";

export const AudioContext = createContext<HTMLAudioElement | null>(null);

type Props = {
  children: ReactNode;
};

export const AudioProvider = ({ children }: Props) => {
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null
  );

  useEffect(() => {
    const audio = typeof Audio !== "undefined" ? new Audio() : null; // only call client
    if (!audio) return;

    setCurrentAudio(audio);
  }, []);

  return (
    <AudioContext.Provider value={currentAudio}>
      {children}
    </AudioContext.Provider>
  );
};
