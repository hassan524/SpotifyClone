import { useAppContext } from '@/context/context';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const PlaySong = () => {
  const { CurrentSong } = useAppContext()
  return (
    <div className="bg-[#000000] h-[10vh] text-white flex items-center justify-between px-6">

      {/* Left: Track Info (optional placeholder) */}
      <div className="w-1/4">
        {/* You can add image + name later */}
        <p className="text-sm text-gray-400">No song playing</p>
      </div>

      {/* Center: Play Controls */}
      <div className="w-2/4 flex flex-col items-center">
        {/* Play Button */}
        <button className="text-white text-4xl hover:text-green-500">
          <i className="bi bi-play-circle-fill"></i>
        </button>

        {/* Duration Below */}
        <div className="text-xs text-gray-400 mt-1">
          {/* <audio
  autoPlay
  controls
  controlsList="nodownload noplaybackrate nosound"
  className="hidden" // hides the default audio UI
  src={currentSong.preview_url}
/> */}
        </div>
      </div>

      {/* Right: Volume Control */}
      <div className="w-1/4 flex justify-end items-center space-x-1">
        <i className="bi bi-volume-down text-xl"></i>
        <input
          type="range"
          className="w-[12rem] h-[23px] accent-white outline-none"
          min="0"
          max="100"
        />
      </div>
    </div>
  );
};

export default PlaySong;
