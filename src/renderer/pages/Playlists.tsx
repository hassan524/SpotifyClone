import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PlaylistHeader from '../components/PlaylistHeader';
import themes from '../utils/theme';
import PlaylistSongs from '../components/PlaylistSongs';
import ScrollNavbar from '@/components/AnimatedNavbar';

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
    <div className="h-full flex flex-col">
      <PlaylistHeader top1={top1} top2={top2} bottom={bottom} />
      <PlaylistSongs bottom={bottom} />
    </div>
  );
};

export default Playlists;
