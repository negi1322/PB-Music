import { use, useEffect, useState } from "react";
import {
  add_user_favourite,
  get_song_album,
  get_user_favourite,
  remove_user_favourite,
} from "../api/UserAction";
import Nav from "../components/nav";
import { NOFAV } from "../../public/Images";
import Loader from "../components/Common/Loader";
import { formatTime } from "../components/Common/Input";
import Music from "../components/Common/Music";
const API = import.meta.env.VITE_APP_URL;

const userData = JSON.parse(localStorage.getItem("user"));
const Favourite = () => {
  const [favourite, setFavourite] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [showLoader, setshowLoader] = useState(true);
  const [playMusic, setPlayMusic] = useState(false);
  const [audio, setAudio] = useState();
  useEffect(() => {
    getFavourite();
  }, []);

  const getFavourite = async () => {
    try {
      const data = await get_user_favourite();
      const videoIds = data?.data?.videoIds;

      if (videoIds && videoIds.length > 0) {
        setFavourite(videoIds);
        await getSongAlbum(videoIds);
      }
    } catch (err) {
      console.error("Error fetching favourites:", err);
    }
  };

  const getSongAlbum = async (videoIds) => {
    setshowLoader(true);
    try {
      const res = await get_song_album(videoIds);
      if (res) {
        setAlbums(res?.data);
      }
    } catch (err) {
      console.error("Error fetching albums:", err);
      setshowLoader(false);
    } finally {
      setshowLoader(false);
    }
  };
  const handleFavorites = async (song) => {
    if (favourite?.includes(song?.videoId)) {
      await remove_user_favourite({
        email: userData?.email,
        videoId: song?.videoId,
      });
    } else {
      await add_user_favourite({
        email: userData?.email,
        videoId: song?.videoId,
      });
    }
    const updatedFav = await get_user_favourite();
    setFavourite(updatedFav?.data?.videoIds);
  };

  const playSong = (song) => {
    console.log("++++", song);
    setAudio({
      videoId: song?.data?.videoId,
      title: song?.data?.name,
      thumbnail: song?.data?.thumbnails?.[1]?.url,
      artist: song?.data?.artist?.name,
    });
    setPlayMusic(true);
  };

  return (
    <>
      <section
        className="full-container "
        style={{ backgroundColor: "#0E0E0E" }}
      >
        <div className={playMusic ? "d-block" : "d-none"}>
          {playMusic ? (
            <Music
              songvideoId={audio?.videoId}
              closeSong={() => {
                setPlayMusic(false);
              }}
              singerName={audio?.artist}
              songAlbum={audio?.thumbnail}
              songName={audio?.title}
              songAudio={`${API}/audio?id=${audio?.videoId}`}
              songs={albums?.map((i) => i?.data)}
            />
          ) : (
            ""
          )}
        </div>

        <div className="container-xxl">
          <Nav />
          <div className="song-container-listed container-xxl">
            {showLoader ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "70vh" }}
              >
                <Loader barcolor={"bg-white"} />
              </div>
            ) : (
              <div className="row gap-3 flex-column">
                {albums?.map((song, key) => (
                  <div
                    key={key}
                    className="col-12 d-flex justify-content-between play-song"
                  >
                    <div
                      onClick={() => playSong(song)}
                      className="d-flex gap-md-4 gap-3 pointer"
                    >
                      <div className="home-song-list-album">
                        <img
                          src={song?.data?.thumbnails?.[0]?.url}
                          alt="thumbnail"
                          onError={(e) => {
                            e.target.src =
                              "/pngtree-electronic-music-album-image_528773.jpg";
                          }}
                        />
                      </div>

                      <div>
                        <p className="text-white mb-0">{song?.data?.name}</p>
                        <p className="text-secondary mb-0 fs-6">
                          {song?.data?.artist?.name}
                        </p>
                      </div>
                    </div>
                    <div className="d-flex align-content-center gap-4">
                      <div className="text-secondary fs-6 fw-medium">
                        {formatTime(song?.data?.duration)}
                      </div>
                      <span
                        onClick={() => handleFavorites(song)}
                        className="pointer"
                      >
                        <i
                          className={
                            favourite?.includes(song?.data?.videoId)
                              ? "bi bi-heart-fill text-danger fs-5 fw-medium"
                              : "bi bi-heart text-white fs-5 fw-medium"
                          }
                        ></i>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Favourite;
