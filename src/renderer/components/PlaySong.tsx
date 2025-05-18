import React, { useEffect, useRef } from 'react';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { useAppContext } from '@/context/context';

const PlaySong = () => {
  const { CurrentSong } = useAppContext();

  const audioRef = useRef<AudioPlayer>(null);

  useEffect(() => {
    if (CurrentSong === '') {
      const audioEl = audioRef.current?.audio?.current;
      if (audioEl) {
        audioEl.pause();
        audioEl.currentTime = 0;
      }
    }
  }, [CurrentSong]);

  return (
    <div className="bg-[#000000] h-[10vh] text-white flex items-center justify-center px-6">
      <div className="w-[70rem]">
        <AudioPlayer
          ref={audioRef}
          src={CurrentSong!}
          volume={0.5}
          autoPlay
          showJumpControls={false}
          preload="metadata"
        />
      </div>
    </div>
  );
};

export default PlaySong;
