"use client";

import { ReactNode, createContext, useState } from "react";

export const RecentSongIdsContext =
  createContext<RecentSongIdsContextType | null>(null);

export type RecentSongIdsContextType = [string[], (songId: string) => void];

type Props = {
  children: ReactNode;
};

export const RecentSongIdsProvider = ({ children }: Props) => {
  const serializedRecentSongIds =
    typeof localStorage !== "undefined"
      ? localStorage.getItem("recentSongIds")
      : null;
  const localRecentSongIds = serializedRecentSongIds
    ? JSON.parse(serializedRecentSongIds)
    : [];
  const [recentSongIds, setRecentSongIds] =
    useState<string[]>(localRecentSongIds);

  const addRecentSongIds = (songId: string) => {
    if (typeof localStorage === "undefined") return;
    const updatedRecentSongIds = [songId, ...[...recentSongIds].splice(0, 7)];
    setRecentSongIds(updatedRecentSongIds);
    localStorage.setItem("recentSongIds", JSON.stringify(updatedRecentSongIds));
  };

  return (
    <RecentSongIdsContext.Provider value={[recentSongIds, addRecentSongIds]}>
      {children}
    </RecentSongIdsContext.Provider>
  );
};
