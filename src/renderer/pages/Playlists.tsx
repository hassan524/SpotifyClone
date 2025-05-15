import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PlaylistHeader from '../components/PlaylistHeader';
import themes from '../utils/theme';
import PlaylistSongs from '../components/PlaylistSongs';

const Playlists = () => {

  const { id } = useParams();

  const [top1, setTop1] = useState('');
  const [top2, setTop2] = useState('');
  const [bottom, setBottom] = useState('');

  useEffect(() => {
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    setTop1(randomTheme.top1);
    setTop2(randomTheme.top2);
    setBottom(randomTheme.bottom);
  }, [id]);

  return (
    <div className="h-full flex flex-col relative">
      <PlaylistHeader top1={top1} top2={top2} bottom={bottom} />
      <PlaylistSongs bottom={bottom} />
      <div className="bg-[#181818] w-full h-[16vh] absolute bottom-0 border-t border-[#282828]" />
    </div>
  );
};

export default Playlists;
