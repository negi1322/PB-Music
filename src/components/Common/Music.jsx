import { FiShuffle, FiSkipBack, FiSkipForward, FiRepeat } from "react-icons/fi";
import { FaPause } from "react-icons/fa";
import { useEffect, useState, useCallback } from "react";
import { formatTime } from "./Input";
import { motion } from "framer-motion";
import { useMusic } from "../../utils/ContextData";
import { FixedSizeList as List } from "react-window";
const API = import.meta.env.VITE_APP_URL;

const Music = ({
  songName,
  songAlbum,
  songAudio,
  singerName,
  songs,
  closeSong,
  songvideoId,
  backgroundImage,
}) => {
  const { audioRef, togglePlay, isPlaying, setIsPlaying } = useMusic();
  const [playSong, setPlaySong] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  const validSongs = songs?.filter((s) => s.videoId);

  useEffect(() => {
    if (!audioRef.current) return;
    const percent = (currentTime / duration) * 100;
    audioRef.current.style.setProperty("--progress", `${percent}%`);
  }, [currentTime, duration]);

  const handleLoaded = () => {
    setDuration(audioRef.current.duration || 0);
  };

  const playSongNow = useCallback((song) => {
    if (!song?.videoId) return;
    const url = `${API}/audio?id=${song.videoId}`;
    audioRef.current.src = url;
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    setPlaySong(song);
    setIsPlaying(true);
    setCurrentTime(0);
  }, []);

  const handleNext = () => {
    const currentId = playSong?.videoId || songvideoId;
    const index = validSongs.findIndex((s) => s.videoId === currentId);
    if (index === -1 || index === validSongs.length - 1) return;
    playSongNow(validSongs[index + 1]);
  };

  const handlePrev = () => {
    const index = validSongs.findIndex((s) => s.videoId === playSong?.videoId);
    if (index <= 0) return;
    playSongNow(validSongs[index - 1]);
  };

  const handleTimeUpdate = () => {
    if (!isSeeking) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleSeek = (e) => {
    setCurrentTime(Number(e.target.value));
  };

  const handleSeekStart = () => setIsSeeking(true);

  const handleSeekEnd = () => {
    audioRef.current.currentTime = currentTime;
    setIsSeeking(false);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  useEffect(() => {
    if (songAudio && !playSong) {
      audioRef.current.src = songAudio;
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [songAudio]);

  const SongRow = useCallback(({ index, style, data }) => {
    const { songs, playSongNow } = data;
    const song = songs[index];

    return (
      <div style={style}>
        <motion.div
          className="mt-3"
          onClick={() => playSongNow(song)}
          whileHover={{
            scale: 1.03,
            cursor :"pointer",
            padding: "0px 20px",
            outline: "1.5px solid rgba(255,255,255,0.6)",
            borderRadius: "12px",
            backgroundColor: "rgba(65,63,63,0.05)",
          }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="row justify-content-between">
            <div className="col-3 col-md-2">
              <img
                src={song?.thumbnails?.[0]?.url ?? song?.thumbnail}
                onError={(e) => {
                  e.target.src =
                    "/public/pngtree-electronic-music-album-image_528773.jpg";
                  e.target.onerror = null;
                }}
                className="sidebar-image-song-cover"
                alt=""
              />
            </div>
            <div className="col-7 col-md-7">
              <p className="text-white mb-0 text-ellipsis">
                {song.name ?? song?.title}
              </p>
              <p className="text-secondary text-ellipsis">
                {song?.artist?.name ?? song?.artists}
              </p>
            </div>
            <div className="col-2 col-md-3">
              <i className="bi bi-play-fill text-white fs-1"></i>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }, []);

  return (
    <>
      <motion.section
        className="music-bg"
        initial={{ y: "-100vh", opacity: 0 }}
        animate={{ y: ["-100vh", 0, -40, 0, -15, 0, -5, 0], opacity: 1 }}
        exit={{
          y: "100vh",
          opacity: 0,
          transition: { duration: 1, ease: [0.4, 0, 1, 1] },
        }}
        transition={{
          duration: 1.5,
          ease: "easeOut",
          times: [0, 0.4, 0.55, 0.7, 0.8, 0.9, 0.95, 1],
          opacity: { duration: 0.4 },
        }}
        style={{
          backgroundImage: `url(${
            backgroundImage ??
            "https://lh3.googleusercontent.com/ExTj5pWOtiyDHWri3HS6fhD8VaGH9V8NPDz_0gW16eqV19SNlA87oQphl61UTaiuE37y0bDAOvx_KqGm=w1500-h844-l90-rj"
          })`,
        }}
      >
        <div className="music-container">
          <div className="container-xxl">
            <div className="row">
              {/* Left Panel */}
              <div className="col-md-6 col-12 p-3 p-md-5 overflow-hidden">
                <div className="col-12 d-flex justify-content-between align-items-center">
                  <span onClick={closeSong}>
                    <i className="pointer bi bi-chevron-down text-white fs-4"></i>
                  </span>
                  <span className="text-center w-100">
                    <p className="text-secondary mb-0">Now Playing</p>
                    <p className="text-white mb-0 text-ellipsis">
                      {playSong
                        ? (playSong?.name ?? playSong?.title)
                        : songName}
                    </p>
                  </span>
                </div>

                <div className="col-md-8 my-3 mx-auto col-12">
                  <img
                    src={
                      playSong
                        ? (playSong?.thumbnails?.[0]?.url ??
                          playSong?.thumbnail)
                        : songAlbum
                    }
                    onError={(e) => {
                      e.target.src =
                        "/public/pngtree-electronic-music-album-image_528773.jpg";
                      e.target.onerror = null;
                    }}
                    className="music-image-main"
                    alt=""
                  />
                  <audio
                    ref={audioRef}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoaded}
                    onEnded={handleNext}
                    preload="metadata"
                  />
                </div>

                <div className="col-11 mx-auto">
                  <p className="text-white fs-4 mb-0 text-ellipsis">
                    {playSong ? (playSong?.name ?? playSong?.title) : songName}
                  </p>
                  <p className="text-secondary">
                    {playSong
                      ? (playSong?.artist?.name ?? playSong?.artists)
                      : singerName}
                  </p>
                </div>

                <div className="col-12 mx-auto">
                  <div className="player">
                    <div>
                      <div className="d-flex justify-content-between">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        step="0.1"
                        value={currentTime}
                        onMouseDown={handleSeekStart}
                        onChange={handleSeek}
                        onMouseUp={handleSeekEnd}
                        className="custom-range"
                      />
                    </div>

                    <div className="controls d-flex my-1 p-1 p-md-0 my-md-0 justify-content-between align-items-center">
                      <FiShuffle className="icon" />
                      <FiSkipBack onClick={handlePrev} className="icon" />
                      <button onClick={togglePlay} className="btn fs-2">
                        {isPlaying ? (
                          <FaPause />
                        ) : (
                          <i className="bi bi-play-fill fs-1"></i>
                        )}
                      </button>
                      <FiSkipForward onClick={handleNext} className="icon" />
                      <FiRepeat className="icon active" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="sidebar-music-list">
                  <List
                    height={window.innerHeight * 100}
                    itemCount={validSongs?.length || 0}
                    itemSize={90}
                    width="100%"
                    itemData={{ songs: validSongs, playSongNow }}
                  >
                    {SongRow}
                  </List>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default Music;
