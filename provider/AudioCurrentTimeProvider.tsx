"use client";

import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

export const AudioCurrentTimeContext =
  createContext<AudioCurrentTimeContextType | null>(null);

export type AudioCurrentTimeContextType = [
  number,
  Dispatch<SetStateAction<number>>
];

type Props = {
  children: ReactNode;
};
export const AudioCurrentTimeProvider = ({ children }: Props) => {
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);

  return (
    <AudioCurrentTimeContext.Provider
      value={[audioCurrentTime, setAudioCurrentTime]}
    >
      {children}
    </AudioCurrentTimeContext.Provider>
  );
};
