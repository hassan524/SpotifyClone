import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/context';
import { Skeleton } from './ui/skeleton';

interface Props {
  top1: string;
  top2: string;
  bottom: string;
}

interface Playlist {
  id: string;
  name: string;
  public: boolean;
  images: { url: string }[];
  owner: { display_name: string };
  tracks?: {
    items: any[];
    total: number;
  };
}

const PlaylistHeader: React.FC<Props> = ({ top1, top2 }) => {
  const { setloading } = useAppContext();
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) return;

    const getUniquePlaylist = async () => {
      try {
        setloading(true);
        const playlistData = await window.electronAPI.getSingleplaylist(id);
        setPlaylist(playlistData.playlist);
      } catch (error) {
        console.error('Failed to fetch playlist:', error);
      } finally {
        setloading(false);
      }
    };

    getUniquePlaylist();
  }, [id]);

  return (
    <div
      className="h-[57vh] bg-gradient-to-b p-10 flex items-center"
      style={{
        backgroundImage: `linear-gradient(to bottom, ${top1}, ${top2})`,
      }}
    >
      <div className="flex items-end gap-8">
        {/* Image or Skeleton */}
        <div className="w-72 h-72 rounded-lg overflow-hidden shadow-2xl bg-[#282828] flex items-center justify-center">
          {playlist?.images?.[0]?.url ? (
            <img
              src={playlist.images[0].url}
              alt="Playlist Cover"
              className="w-full h-full object-cover"
            />
          ) : (
            <Skeleton
              className="w-full h-full rounded-lg shadow-none"
              style={{ backgroundColor: top1 }}
            />
          )}
        </div>

        {/* Playlist Info */}
        <div className="flex flex-col gap-5">
          {playlist?.public === undefined ? (
            <Skeleton className="h-6 w-32 rounded-md bg-gray-700" style={{ backgroundColor: top1 }}/>
          ) : (
            <span className="text-2xl tracking-wide text-white opacity-99">
              {playlist.public ? 'Public Playlist' : 'Private Playlist'}
            </span>
          )}
          <h1 className="text-[6rem] leading-[5.8rem] font-bold capitalize text-white blur-[0.2px]">
            {playlist?.name || <Skeleton className="w-60 h-10"
              style={{ backgroundColor: top1 }} />}
          </h1>

          {/* Owner and Song Count */}
          {playlist ? (
            <div className="flex gap-1 items-center text-lg font-medium">
              <span className='text-xl tracking-wide font-semibold'>{playlist.owner.display_name}</span>
              <span className="mx-1">•</span>
              <span>{playlist.tracks?.items.length || 0} Songs</span>
            </div>
          ) : (
            <div className="flex gap-2">
              <Skeleton className="w-32 h-5" style={{ backgroundColor: top1 }} />
              <Skeleton className="w-16 h-5" style={{ backgroundColor: top1 }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlaylistHeader;
