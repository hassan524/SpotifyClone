import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Props {
  top1: string;
  top2: string;
  bottom: string;
}

interface Playlist {
  images?: any[];
  // Add more properties if needed
}

const PlaylistHeader: React.FC<Props> = ({ top1, top2 }) => {
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const { id } = useParams<{ id: string }>(); // typed route param

  useEffect(() => {
    if (!id) return;

    async function getUniquePlaylist() {
      try {
        const playlistData = await window.electronAPI.getSingleplaylist(id!);
        setPlaylist(playlistData.playlist);
        console.log(playlistData.playlist.images);
      } catch (error) {
        console.error('Failed to fetch playlist:', error);
      }
    }

    getUniquePlaylist();
  }, [id]);

  return (
    <div
      className="h-[57vh] bg-gradient-to-b p-5"
      style={{
        backgroundImage: `linear-gradient(to bottom, ${top1}, ${top2})`,
      }}
    >
      <div className="flex">
        {playlist?.images?.[0] && (
          <img
            src={playlist.images?.[0]?.url}
            alt="Playlist Cover"
            className="w-40 h-40 object-cover rounded-lg"
          />
        )}
      </div>
    </div>
  );
};

export default PlaylistHeader;
