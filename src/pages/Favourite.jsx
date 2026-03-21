import { useEffect, useState } from "react";
import { get_song_album, get_user_favourite } from "../api/UserAction";
import Nav from "../components/nav";

const Favourite = () => {
  const [favourite, setFavourite] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  const getSongAlbum = async (videoIds) => {
    try {
      const res = await get_song_album(videoIds);
      if (res) {
        setAlbums(res?.albums);
      }
    } catch (err) {
      console.error("Error fetching albums:", err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Nav />
      {albums?.length > 0 ? (
        albums.map((item, index) => (
          <div key={index}>
            <p>{item?.album?.title}</p>
          </div>
        ))
      ) : (
        <p>No favourites yet</p>
      )}
    </>
  );
};

export default Favourite;
