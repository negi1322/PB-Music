import { FaPause, FaPlay } from "react-icons/fa";
import { useRef, useState } from "react";
import { useMusic } from "../../utils/ContextData";

import SongLoader from "./SongLoader";

const SmallMusic = ({ song }) => {
  const { togglePlay, isPlaying } = useMusic();
  return (
    <div className="music-card container-fluid d-flex align-items-center justify-content-between px-3 py-2">
      <div className="d-flex align-items-center  justify-content-center w-75">
        <SongLoader />
      </div>

      <div className="d-flex align-items-center gap-4">
        <button className="btn  text-white fs-1" onClick={togglePlay}>
          {isPlaying ? <FaPause /> : <i className="bi bi-play-fill" />}
        </button>
      </div>

      <div className="progress-bar-custom w-100"></div>
    </div>
  );
};

export default SmallMusic;
