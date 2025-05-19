import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/context';
import SearchToggle from './SeachToggle';
import { TracksSkeleton } from './Skeletons';


interface Song {
    duration: number;
    image: string;
    name: string;
    previewUrl: string[];
    timestamp: string;
}

interface Props {
    bottom: string;
}

const PlaylistSongs: React.FC<Props> = ({ bottom }) => {
    const { loading, setloading, SetCurrentSong, CurrentSong } = useAppContext();
    const { id } = useParams();
    const [tracks, setTracks] = useState<Song[]>([]);
    const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);


    useEffect(() => {
        (async () => {
            try {
                setloading(true);
                const songs = await window.electronAPI.getsongs(id!);
                console.log('songs result:', songs, 'type:', typeof songs, 'isArray:', Array.isArray(songs));
                setTracks(songs.songs);
            } catch (error) {
                console.log('error fetching songs', error);
            } finally {
                setloading(false);
            }
        })();
    }, [id]);

    return (
        <div
            className="h-full flex flex-col gap-10 p-10 text-white "
            style={{
                backgroundImage: `linear-gradient(to bottom, ${bottom} 0%, ${bottom} 1%, #121212 100%)`,
            }}
        >
            <div className="flex items-center justify-between mb-6">
                <i className="bi bi-play-circle-fill text-[5rem] text-[#3BE477]"></i>
                <SearchToggle />
            </div>

            <div className="flex gap-6 text-[22px] font-bold text-[#978E96] border-b border-[#452541] pb-5 px-4">
                <div className="w-[5%]"><span>#</span></div>
                <div className="w-[50%] "><span>Title</span></div>
                <div className="w-[32%] "><span>Date added</span></div>
                <div className="w-[13%] flex justify-end"><span><i className="bi bi-alarm"></i></span></div>
            </div>

            <div className="mt-2">
                {!loading ? (
                    tracks?.map((song, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedIndex(index)} 
                            className={`flex items-center gap-6 py-3 text-2xl px-4 group hover:bg-white/5 transition rounded cursor-pointer ${selectedIndex === index ? 'bg-white/5' : ''
                                }`}
                        >
                            <div className="w-[5%] relative text-[#978E96]">
                                <span className='group-hover:hidden'>{index + 1}</span>
                                <div className="absolute left-0 top-[50%] translate-y-[-50%] flex items-center justify-center transition-all duration-75 group-hover:bottom-0 bottom-[-30px] opacity-0 group-hover:opacity-100">
                                    {CurrentSong ? (
                                        <i className="bi bi-pause-fill hover:scale-[1.01] transition text-5xl" onClick={() => SetCurrentSong('')}></i>

                                    ) : <i className="bi bi-play-fill hover:scale-[1.01] transition text-5xl" onClick={() => SetCurrentSong(song?.previewUrl[0])}></i>}

                                </div>
                            </div>

                            <div className="w-[50%] flex gap-4">
                                <img
                                    className="h-[70px] w-[70px] rounded-md"
                                    src={song?.image}
                                    alt=""
                                />
                                <div className="flex flex-col">
                                    <span className="text-[#F9F9F9] text-[22px] font-semibold tracking-wide">
                                        {song?.name}
                                    </span>
                                </div>
                            </div>
                            <div className="w-[32%] text-[#978E96] text-[22px] flex items-center">
                                {new Date(song.timestamp).toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })}
                            </div>
                            <div className="w-[13%] text-[#978E96] text-[22px] flex justify-end items-center">
                                {Math.floor(song.duration / 60000)}:
                                {String(Math.floor((song.duration % 60000) / 1000)).padStart(2, "0")}
                            </div>
                        </div>
                    ))
                ) : (
                    Array.from({ length: 10 }).map((_, index) => (
                        <TracksSkeleton />
                    ))
                )}

            </div>

        </div>
    );
};

export default PlaylistSongs;
