import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AudioPlayingProvider } from "../provider/AudioPlayingProvider";
import { CurrentSongIdProvider } from "../provider/CurrentSongIdProvider";
import { AudioCurrentTimeProvider } from "../provider/AudioCurrentTimeProvider";
import { AudioPlayerModal } from "@/components/AudioPlayerModal";
import { AudioPlayerModalProvider } from "@/provider/AudioPlayerModalProvider";
import { AudioProvider } from "@/provider/AudioProvider";
import { fetchSongs } from "@/lib/fetchSongs";
import { SongsProvider } from "@/provider/SongsProvider";
import { DynamoSong } from "@/type/dynamo";
import { SongHistoriesProvider } from "@/provider/SongHistoriesProvider";
import { FavoriteSongIdsProvider } from "@/provider/FavoriteSongIdsProvider";
import {
  RecentSongIdsContext,
  RecentSongIdsProvider,
} from "@/provider/RecentSongIdsProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const songs = (await fetchSongs()) as DynamoSong[];

  return (
    <html lang="ja">
      <body className={inter.className}>
        <AudioPlayingProvider>
          <CurrentSongIdProvider>
            <AudioCurrentTimeProvider>
              <AudioPlayerModalProvider>
                <SongsProvider songs={songs}>
                  <AudioProvider>
                    <SongHistoriesProvider>
                      <FavoriteSongIdsProvider>
                        <RecentSongIdsProvider>
                          <div className="font-sans text-white">{children}</div>
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
      </body>
    </html>
  );
}
