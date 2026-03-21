import { createContext, useContext, useRef, useState } from "react";

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const playSong = (song, API) => {
    setAudio({
      videoId: song.videoId,
      title: song.name,
      thumbnail: song?.thumbnails?.[1]?.url,
      artist: song?.artist?.name,
      videoID: song?.videoId,
      songAudio: `${API}/audio?id=${song.videoId}`,
    });
  };

  const closeSong = () => setAudio(null);

  return (
    <MusicContext.Provider
      value={{
        audioRef,
        togglePlay,
        isPlaying,
        setIsPlaying,
        audio,
        playSong,
        closeSong,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);
