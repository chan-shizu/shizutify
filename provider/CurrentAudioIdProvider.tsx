"use client";

import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

export const CurrentAudioIdContext = createContext<
  CurrentAudioIdContextType | undefined
>(undefined);

export type CurrentAudioIdContextType = [
  number,
  Dispatch<SetStateAction<number>>
];

type Props = {
  children: ReactNode;
};
export const CurrentAudioIdProvider = ({ children }: Props) => {
  const [currentAudioId, setCurrentAudioId] = useState(0);

  return (
    <CurrentAudioIdContext.Provider value={[currentAudioId, setCurrentAudioId]}>
      {children}
    </CurrentAudioIdContext.Provider>
  );
};
