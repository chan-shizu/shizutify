"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

export const SongHistoriesContext = createContext<
  SongHistoriesContextType | undefined
>(undefined);

export type SongHistoriesContextType = [
  string[],
  Dispatch<SetStateAction<string[]>>
];

type Props = {
  children: ReactNode;
};
export const SongHistoriesProvider = ({ children }: Props) => {
  const [songHistories, setSongHistories] = useState<string[]>([]);

  return (
    <SongHistoriesContext.Provider value={[songHistories, setSongHistories]}>
      {children}
    </SongHistoriesContext.Provider>
  );
};
