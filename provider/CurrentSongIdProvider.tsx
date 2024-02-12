"use client";

import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

export const CurrentSongIdContext = createContext<
  CurrentSongIdContextType | undefined
>(undefined);

export type CurrentSongIdContextType = [
  string,
  Dispatch<SetStateAction<string>>
];

type Props = {
  children: ReactNode;
};
export const CurrentSongIdProvider = ({ children }: Props) => {
  const [currentSongId, setCurrentSongId] = useState("");

  return (
    <CurrentSongIdContext.Provider value={[currentSongId, setCurrentSongId]}>
      {children}
    </CurrentSongIdContext.Provider>
  );
};
