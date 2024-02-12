"use client";

import { DynamoSong } from "@/type/dynamo";
import { Dispatch, ReactNode, SetStateAction, createContext } from "react";

export const SongsContext = createContext<DynamoSong[] | undefined>(undefined);

type Props = {
  songs: DynamoSong[];
  children: ReactNode;
};
export const SongsProvider = ({ songs, children }: Props) => {
  return (
    <SongsContext.Provider value={songs}>{children}</SongsContext.Provider>
  );
};
