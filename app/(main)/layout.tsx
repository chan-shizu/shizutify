import React from "react";
import { AudioPlayingProvider } from "@/provider/AudioPlayingProvider";
import { CurrentSongIdProvider } from "@/provider/CurrentSongIdProvider";
import { AudioCurrentTimeProvider } from "@/provider/AudioCurrentTimeProvider";
import { AudioPlayerModalProvider } from "@/provider/AudioPlayerModalProvider";
import { SongsProvider } from "@/provider/SongsProvider";
import { AudioPlayerModal } from "@/components/AudioPlayerModal";
import { fetchSongs } from "@/lib/fetchSongs";
import { AudioProvider } from "@/provider/AudioProvider";
import { FavoriteSongIdsProvider } from "@/provider/FavoriteSongIdsProvider";
import { RecentSongIdsProvider } from "@/provider/RecentSongIdsProvider";
import { SongHistoriesProvider } from "@/provider/SongHistoriesProvider";
import { DynamoSong } from "@/type/dynamo";

export default async function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const songs = (await fetchSongs()) as DynamoSong[];

  return (
    <AudioPlayingProvider>
      <CurrentSongIdProvider>
        <AudioCurrentTimeProvider>
          <AudioPlayerModalProvider>
            <SongsProvider songs={songs}>
              <AudioProvider>
                <SongHistoriesProvider>
                  <FavoriteSongIdsProvider>
                    <RecentSongIdsProvider>
                      {children}
                      <AudioPlayerModal />
                    </RecentSongIdsProvider>
                  </FavoriteSongIdsProvider>
                </SongHistoriesProvider>
              </AudioProvider>
            </SongsProvider>
          </AudioPlayerModalProvider>
        </AudioCurrentTimeProvider>
      </CurrentSongIdProvider>
    </AudioPlayingProvider>
  );
}
