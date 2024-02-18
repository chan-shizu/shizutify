"use client";

import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

export const RecentSongIdsContext = createContext<
RecentSongIdsContextType | undefined
>(undefined);

export type RecentSongIdsContextType = [string[], (songId: string) => void];

type Props = {
  children: ReactNode;
};

const serializedRecentSongIds = localStorage.getItem("recentSongIds");
const localRecentSongIds = serializedRecentSongIds
  ? JSON.parse(serializedRecentSongIds)
  : [];

export const RecentSongIdsProvider = ({ children }: Props) => {
  const [recentSongIds, setRecentSongIds] =
    useState<string[]>(localRecentSongIds);

  const addRecentSongIds = (songId: string) => {
    const updatedRecentSongIds = [songId, ...[...recentSongIds].splice(0, 7)] ;
    setRecentSongIds(updatedRecentSongIds);
    localStorage.setItem(
      "recentSongIds",
      JSON.stringify(updatedRecentSongIds)
    );
  };

  return (
    <RecentSongIdsContext.Provider
      value={[recentSongIds, addRecentSongIds]}
    >
      {children}
    </RecentSongIdsContext.Provider>
  );
};
