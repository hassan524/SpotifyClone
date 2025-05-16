import { useEffect, useState } from 'react';
import CustomScrollbar from './CustomScrollbar';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/context';
import { PlaylistSkeleton } from './Skeletons';

const LeftSidebar = () => {
  const [playlists, setPlaylists] = useState<any[]>([]);
  const { loading } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await window.electronAPI.getplaylist();
        if (response?.items) {
          setPlaylists(response.items);
        }
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchPlaylist();
  }, []);

  const handlePlaylist = (id: string) => {
    navigate(`playlist/${id}`);
  };

  return (
    <div className="w-[55rem] flex flex-col h-full bg-[#121212] text-white rounded-lg">
      <div className="flex flex-col gap-6 p-5">
        <div className="w-full flex items-center justify-between">
          <h2 className="font-semibold text-2xl blur-[0.5px]">Your Library</h2>
          <button className="bg-[#1F1F1F] py-3 px-6 cursor-pointer rounded-4xl font-bold text-xl flex items-center gap-2">
            <i className="bi bi-plus-lg"></i>
            <span>Create</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="bg-[#1F1F1F] py-2 px-5 font-semibold rounded-4xl text-xl">Playlist</span>
          <span className="bg-[#1F1F1F] py-2 px-5 font-semibold rounded-4xl text-xl">Album</span>
          <span className="bg-[#1F1F1F] py-2 px-5 font-semibold rounded-4xl text-xl">Artist</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <CustomScrollbar>
          <div className="flex flex-col">
            {loading ? (
              Array(8)
                .fill(null)
                .map((_, index) => <PlaylistSkeleton key={index} />)
            ) : playlists.length === 0 ? (
              <p className="text-gray-400 text-center mt-4">No playlists found.</p>
            ) : (
              playlists.map((playlist: any) => (
                <div
                  key={playlist.id}
                  className="flex items-center gap-4 rounded-lg px-5 py-3 group hover:bg-[#2a2a2a] transition-all cursor-pointer relative"
                  onClick={() => handlePlaylist(playlist.id)}
                >
                  <div className="relative w-[70px] h-[70px] rounded-md overflow-hidden">
                    {playlist.images?.[0] ? (
                      <img
                        src={playlist.images[0].url}
                        alt={playlist.name}
                        className="w-full h-full object-cover rounded-md group-hover:brightness-75 transition-all duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#282828] rounded-md flex items-center justify-center">
                        <i className="bi bi-music-note-beamed text-white text-2xl"></i>
                      </div>
                    )}

                    <div className="absolute inset-0 flex items-center justify-center transition-all duration-75 group-hover:bottom-0 bottom-[-30px] opacity-0 group-hover:opacity-100">
                      <i className="bi bi-play-fill text-white text-5xl"></i>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-white font-medium text-[22px] capitalize tracking-wide blur-[.2px]">
                      {playlist.name}
                    </span>
                    <span className="text-[#979797] text-lg tracking-wide font-bold blur-[0.3px]">
                      {playlist.type}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CustomScrollbar>
      </div>
    </div>
  );
};

export default LeftSidebar;
