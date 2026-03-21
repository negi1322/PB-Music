import axios from "axios";
import { useEffect, useState } from "react";
import Nav from "../components/nav";
import Music from "../components/Common/Music";
import { formatTime } from "../components/Common/Input";
import Profile from "../components/Common/ProfileCard";
import Loader from "../components/Common/Loader";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import SmallMusic from "../components/Common/SmallMusic";

const API = import.meta.env.VITE_APP_URL;

function Search() {
  const [songs, setSongs] = useState([]);
  const [audio, setAudio] = useState(null);
  const [activeType, setActiveType] = useState("All");
  const [showProfile, setshowProfile] = useState(false);
  const [showLoader, setshowLoader] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSmallMusic, setShowSmallMusic] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.state?.query) {
      setSearchQuery(location.state?.query);
      searchSongs(location.state?.query);
    }
  }, [location.state?.query]);

  useEffect(() => {
    if (audio || showProfile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [audio, showProfile]);

  const searchSongs = async (query) => {
    if (!query) return;
    setshowLoader(true);
    try {
      const res = await axios.post(`${API}/search`, {
        songname: query,
      });
      setSongs(res.data);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setshowLoader(false);
    }
  };

  const playSong = (song) => {
    setAudio({
      videoId: song.videoId,
      title: song.name,
      thumbnail: song?.thumbnails?.[1]?.url,
      artist: song?.artist?.name,
      videoID: song?.videoId,
    });
  };

  return (
    <>
      <AnimatePresence>
        {showProfile ? (
          <motion.div
            className="glass-container"
            initial={{ scale: 0, opacity: 0, rotate: -15 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0, opacity: 0, rotate: 15 }}
            transition={{
              duration: 1.8,
              ease: [0.16, 1, 0.3, 1],
              rotate: { duration: 2.2, ease: "easeOut" },
              opacity: { duration: 1.2, ease: "easeOut" },
            }}
          >
            <div className="glass-card">
              <Profile closeProfile={() => setshowProfile(false)} />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className=" full-container position-relative search-bg-image">
        <div className="container-xxl">
          <Nav
            profiletoogle={() => setshowProfile((prev) => !prev)}
            searchValue={searchQuery}
            onSearchChange={(e) => setSearchQuery(e.target.value)}
            onSearchKeyDown={(e) => {
              if (e.key === "Enter") {
                searchSongs(searchQuery);
              }
            }}
          />
          <div className={showSmallMusic ? "d-none" : "d-block"}>
            {audio ? (
              <AnimatePresence mode="wait">
                <Music
                  songvideoId={audio?.videoID}
                  closeSong={() => setShowSmallMusic(true)}
                  songs={songs}
                  singerName={audio?.artist}
                  songAlbum={audio?.thumbnail}
                  songName={audio?.title}
                  songAudio={`${API}/audio?id=${audio.videoId}`}
                />
              </AnimatePresence>
            ) : null}
          </div>

          <div
            className="song-container-listed"
            style={{ height: "calc(100vh - 125px)" }}
          >
            {showLoader ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "70vh" }}
              >
                <Loader />
              </div>
            ) : (
              <div className="row gap-3 flex-column">
                {songs?.map((song, key) => (
                  <div
                    onClick={() => {
                      playSong(song);
                      setShowSmallMusic(false);
                    }}
                    key={key}
                    className="col-12 d-flex flex-row justify-content-between align-items-center pointer play-song"
                  >
                    <div className="d-flex flex-row gap-4">
                      <div>
                        <img
                          src={song?.thumbnails?.[0]?.url}
                          onError={(e) => {
                            e.target.src =
                              "/public/pngtree-electronic-music-album-image_528773.jpg";
                            e.target.onerror = null;
                          }}
                          alt="thumbnail"
                        />
                      </div>
                      <div>
                        <p className="text-white mb-0">{song.name}</p>
                        <p className="text-secondary mb-0 fs-6">
                          {song?.artist?.name}
                        </p>
                      </div>
                    </div>
                    <div className="text-secondary fs-6 fw-medium mb-0">
                      {formatTime(song?.duration)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {showSmallMusic ? <SmallMusic /> : ""}
      </div>
    </>
  );
}

export default Search;
