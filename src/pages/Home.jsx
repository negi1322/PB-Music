import axios from "axios";
import { useEffect, useState } from "react";
import Nav from "../components/nav";
import Music from "../components/Common/Music";
import { formatTime } from "../components/Common/Input";
import { get_trending } from "../api/UserAction";
import Profile from "../components/Common/ProfileCard";
import Loader from "../components/Common/Loader";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SmallLoader from "../components/Common/SmallLoader";
import SmallMusic from "../components/Common/SmallMusic";
import imageData from "../Database/BackgroundImage.json";

const API = import.meta.env.VITE_APP_URL;

function Home() {
  const [songs, setSongs] = useState([]);
  const [audio, setAudio] = useState(null);
  const [activeType, setActiveType] = useState("All");
  const [showProfile, setshowProfile] = useState(false);
  const [showLoader, setshowLoader] = useState(true);
  const [showMusic, setShowMusic] = useState(false);
  const [showSmallMusic, setShowSmallMusic] = useState(false);

  const navigate = useNavigate();
  console.log("imageDatabase", imageData);
  const categories = [
    "all",
    "podcasts",
    "romance",
    "relax",
    "party",
    "workout",
    "focus",
    "sleep",
  ];

  const bgImage = imageData?.filter(
    (i) => activeType?.toLocaleLowerCase() === i?.type,
  );

  useEffect(() => {
    getTranding();
  }, [activeType]);

  const getTranding = async () => {
    try {
      setshowLoader(true);
      const res = await get_trending(activeType);
      setSongs(res || []);
    } catch (err) {
      console.error("Trending error:", err);
    } finally {
      setshowLoader(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = showMusic || showProfile ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMusic, showProfile]);

  const searchSongs = async (query) => {
    if (!query) return;

    try {
      setshowLoader(true);

      const res = await axios.post(`${API}/search`, {
        songname: query,
      });

      setSongs(res.data || []);
      setShowMusic(true);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setshowLoader(false);
    }
  };

  const playSong = (song) => {
    if (!song?.videoId) return;

    setAudio({
      videoId: song.videoId,
      title: song.name,
      thumbnail: song?.thumbnails?.[1]?.url,
      artist: song?.artist?.name,
    });

    setShowMusic(true);
  };

  return (
    <>
      <AnimatePresence>
        {showProfile && (
          <motion.div
            className="glass-container"
            initial={{ scale: 0, opacity: 0, rotate: -15 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0, rotate: 15 }}
            transition={{ duration: 0.8 }}
          >
            <div className="glass-card">
              <Profile closeProfile={() => setshowProfile(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        key={bgImage?.[0]?.image}
        className="bg-black full-container position-relative home-bg"
        style={{
          backgroundImage: `url(${bgImage?.[0]?.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        animate={{ clipPath: "inset(0 0 0% 0)" }}
        transition={{
          duration: 1.4,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        <div className="container-xxl">
          <Nav
            profiletoogle={() => setshowProfile((prev) => !prev)}
            onSearchKeyDown={(e) => {
              if (e.key === "Enter") {
                searchSongs(e.target.value);
              }
            }}
          />

          <div className="d-flex gap-2 ps-md-5 ps-1 py-md-4 py-1 overflow-scroll">
            {categories.map((i, key) => (
              <button
                key={key}
                onClick={() => setActiveType(i)}
                className={
                  activeType?.toLocaleLowerCase() === i
                    ? "type-btn-active rounded-pill text-capitalize"
                    : "type-btn rounded-pill text-capitalize"
                }
              >
                {i}
              </button>
            ))}
          </div>

          <div className={showMusic ? "d-block" : "d-none"}>
            <AnimatePresence mode="wait">
              {audio && (
                <Music
                  backgroundImage={bgImage?.[0]?.image}
                  songvideoId={audio.videoId}
                  closeSong={() => {
                    setShowMusic(false);
                    setShowSmallMusic(true);
                  }}
                  songs={songs}
                  singerName={audio.artist}
                  songAlbum={audio.thumbnail}
                  songName={audio.title}
                  songAudio={`${API}/audio?id=${audio.videoId}`}
                />
              )}
            </AnimatePresence>
          </div>

          <div className="song-container-listed container-xxl">
            {showLoader ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "70vh" }}
              >
                <Loader />
              </div>
            ) : (
              <div className="row gap-3 flex-column">
                {songs.map((song, key) => (
                  <div
                    key={key}
                    onClick={() => playSong(song)}
                    className="col-12 d-flex justify-content-between  pointer play-song"
                  >
                    <div className="d-flex gap-md-4 gap-3">
                      <div className="home-song-list-album">
                        <img
                          src={song?.thumbnails?.[0]?.url}
                          alt="thumbnail"
                          onError={(e) => {
                            e.target.src =
                              "/pngtree-electronic-music-album-image_528773.jpg";
                          }}
                        />
                      </div>

                      <div>
                        <p className="text-white mb-0">{song.name}</p>
                        <p className="text-secondary mb-0 fs-6">
                          {song?.artist?.name}
                        </p>
                      </div>
                    </div>

                    <div className="text-secondary fs-6 fw-medium">
                      {formatTime(song?.duration)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {showSmallMusic ? <SmallMusic /> : ""}
      </motion.div>
    </>
  );
}

export default Home;
