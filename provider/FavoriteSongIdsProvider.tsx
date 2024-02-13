"use client";

import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

export const FavoriteSongIdsContext = createContext<
  FavoriteSongIdsContextType | undefined
>(undefined);

export type FavoriteSongIdsContextType = [string[], (songId: string) => void];

type Props = {
  children: ReactNode;
};

const serializedFavoriteSongIds = localStorage.getItem("favoriteSongIds");
const localFavoriteSongIds = serializedFavoriteSongIds
  ? JSON.parse(serializedFavoriteSongIds)
  : [];

export const FavoriteSongIdsProvider = ({ children }: Props) => {
  const [favoriteSongIds, setFavoriteSongIds] =
    useState<string[]>(localFavoriteSongIds);

  const updateFavoriteSongIds = (songId: string) => {
    if (favoriteSongIds.includes(songId)) {
      const updatedFavoriteSongIds = favoriteSongIds.filter(
        (tempSongId) => tempSongId !== songId
      );
      setFavoriteSongIds(updatedFavoriteSongIds);
      localStorage.setItem(
        "favoriteSongIds",
        JSON.stringify(updatedFavoriteSongIds)
      );
    } else {
      const updatedFavoriteSongIds = [...favoriteSongIds, songId];
      setFavoriteSongIds((prev) => [...prev, songId]);
      localStorage.setItem(
        "favoriteSongIds",
        JSON.stringify(updatedFavoriteSongIds)
      );
    }
  };

  return (
    <FavoriteSongIdsContext.Provider
      value={[favoriteSongIds, updateFavoriteSongIds]}
    >
      {children}
    </FavoriteSongIdsContext.Provider>
  );
};
