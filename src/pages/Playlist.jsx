import { useEffect, useState } from "react";
import { get_playlist } from "../api/UserAction";
import Nav from "../components/nav";
import Music from "../components/Common/Music";
import ImageLoader from "../components/Common/ImageLoader";
import { AnimatePresence, motion } from "framer-motion";
import SmallMusic from "../components/Common/SmallMusic";

const Playlist = () => {
  const [playlist, setPlaylist] = useState();
  const [playlistparty, setPlaylistparty] = useState();
  const [playlistsad, setPlaylistsad] = useState();
  const [playMusic, setPlayMusic] = useState(false);
  const [playingPlaylist, setPlayingPlaylist] = useState();
  const [showLoader, setShowLoader] = useState(false);
  const coverImagesromance = playlist?.slice(0, 4);
  const coverImagesad = playlistsad?.slice(0, 4);
  const coverImagesparty = playlistparty?.slice(0, 4);
  const [showProfile, setshowProfile] = useState(false);
  const [showSmallMusic, setShowSmallMusic] = useState(false);
  const categories = {
    romance: ["romantic songs playlist", "love songs playlist"],
    party: ["party songs playlist", "dj remix playlist"],
    sad: ["sad songs playlist", "breakup songs playlist"],
  };
  useEffect(() => {
    playlistData();
  }, []);

  const playlistData = async () => {
    setShowLoader(true);
    const res = await get_playlist(categories?.romance?.[0]);
    const res1 = await get_playlist(categories?.party?.[0]);
    const res2 = await get_playlist(categories?.sad?.[0]);
    setPlaylist(res?.data?.filter((i) => i?.videoId));
    setPlaylistparty(res1?.data?.filter((i) => i?.videoId));
    setPlaylistsad(res2?.data?.filter((i) => i?.videoId));
    setShowLoader(false);
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
              rotate: {
                duration: 2.2,
                ease: "easeOut",
              },
              opacity: {
                duration: 1.2,
                ease: "easeOut",
              },
            }}
          >
            <div className="glass-card">
              <Profile closeProfile={() => setshowProfile(false)} />
            </div>
          </motion.div>
        ) : (
          ""
        )}
      </AnimatePresence>

      <div className="full-container position-relative">
        <div className="container">
          <Nav profiletoogle={() => setshowProfile((prev) => !prev)} />
          <div className={showSmallMusic ? "d-none" : "d-block"}>
            {playingPlaylist ? (
              <Music
                closeSong={() => setShowSmallMusic(true)}
                singerName={playingPlaylist?.[0]?.artist?.name}
                songs={playingPlaylist}
                songAudio={`http://localhost:3000/audio?id=${playingPlaylist?.[0]?.videoId}`}
                songName={playingPlaylist?.[0]?.name}
                songAlbum={playingPlaylist?.[0]?.thumbnails?.[0]?.url}
              />
            ) : (
              ""
            )}
          </div>
          <div className="d-flex gap-4 playlist">
            {showLoader ? (
              <div className="d-flex justify-content-center align-items-center loader-playlist">
                <ImageLoader />
              </div>
            ) : (
              <div
                onClick={() => {
                  setPlayingPlaylist(playlist);
                  setShowSmallMusic(false);
                }}
              >
                <div className="playlist-container position-relative">
                  {coverImagesromance?.map((i, key) => (
                    <div key={key}>
                      <img
                        src={i?.thumbnails?.[0]?.url}
                        onError={(e) => {
                          e.target.src =
                            "/public/pngtree-electronic-music-album-image_528773.jpg";
                          e.target.onerror = null;
                        }}
                        alt="cover-image"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-playlist-name">kajsfdk</p>
              </div>
            )}

            {showLoader ? (
              <div className="d-flex justify-content-center align-items-center loader-playlist">
                <ImageLoader />
              </div>
            ) : (
              <div
                onClick={() => {
                  setPlayingPlaylist(playlistsad);
                  setShowSmallMusic(false);
                }}
              >
                <div className="playlist-container position-relative">
                  {coverImagesad?.map((i, key) => (
                    <div key={key}>
                      <img
                        src={i?.thumbnails?.[0]?.url}
                        onError={(e) => {
                          e.target.src =
                            "/public/pngtree-electronic-music-album-image_528773.jpg";
                          e.target.onerror = null;
                        }}
                        alt="cover-image"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-playlist-name">kajsfdk</p>
              </div>
            )}

            {showLoader ? (
              <div className="d-flex justify-content-center align-items-center loader-playlist">
                <ImageLoader />
              </div>
            ) : (
              <div
                onClick={() => {
                  setPlayingPlaylist(playlistparty);
                  setShowSmallMusic(false);
                }}
              >
                <div className="playlist-container position-relative">
                  {coverImagesparty?.map((i, key) => (
                    <div key={key}>
                      <img
                        src={i?.thumbnails?.[0]?.url}
                        onError={(e) => {
                          e.target.src =
                            "/public/pngtree-electronic-music-album-image_528773.jpg";
                          e.target.onerror = null;
                        }}
                        alt="cover-image"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-playlist-name">kajsfdk</p>
              </div>
            )}
          </div>
        </div>
        {showSmallMusic ? <SmallMusic /> : ""}
      </div>
    </>
  );
};
export default Playlist;
