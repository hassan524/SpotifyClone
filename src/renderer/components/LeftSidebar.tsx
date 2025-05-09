import React, { useEffect, useState } from 'react';
import CustomScrollbar from './CustomScrollbar'; // adjust path if needed

const LeftSidebar = () => {
  const [playlists, setPlaylists] = useState<any>([]);

  useEffect(() => {
    const fetchPlaylist = async () => {
      try {
        const response = await window.electronAPI.getplaylist();
        console.log(response);
        if (response && response.items) {
          setPlaylists(response.items);
        }
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchPlaylist();
  }, []);

  return (
    <div className="w-[35rem] flex flex-col gap-6 h-full bg-[#121212] text-white rounded-lg">
      <div className="flex flex-col gap-6 p-5">
        <div className="w-full flex items-center justify-between">
          <h2 className='font-semibold text-2xl blur-[0.5px]'>Your Library</h2>
          <button className='bg-[#1F1F1F] py-3 px-6 cursor-pointer rounded-4xl font-bold text-xl flex items-center gap-2'>
            <i className="bi bi-plus-lg"></i>
            <span>Create</span>
          </button>
        </div>

        <div className="flex items-center gap-2 bg-red-200">
          <span className='bg-[#1F1F1F] py-2 px-5 font-semibold rounded-4xl text-xl'>Playlist</span>
          <span className='bg-[#1F1F1F] py-2 px-5 font-semibold rounded-4xl text-xl'>Album</span>
          <span className='bg-[#1F1F1F] py-2 px-5 font-semibold rounded-4xl text-xl'>Artist</span>
        </div>
      </div>

      <div className="flex-1 mt-2 flex flex-col gap-1">
        <CustomScrollbar>
          <div className="flex flex-col px-3">
            {playlists.length === 0 ? (
              <p className="text-gray-400 text-center mt-4">No playlists found.</p>
            ) : (
              playlists.map((playlist) => (
                <div
                  key={playlist.id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#2a2a2a] transition-all cursor-pointer"
                >
                  {playlist.images && playlist.images[0] ? (
                    <img
                      src={playlist.images[0].url}
                      alt={playlist.name}
                      className="w-[70px] h-[70px] object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-[70px] h-[70px] bg-[#282828] rounded-md flex items-center justify-center">
                      <i className="bi bi-music-note-beamed text-white text-2xl"></i>
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-white font-medium text-2xl capitalize tracking-wide">{playlist.name}</span>
                    <span className='text-[#979797] text-lg tracking-wide font-bold blur-[0.3px]'>{playlist.type}</span>
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
