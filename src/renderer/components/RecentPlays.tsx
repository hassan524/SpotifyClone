import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const TopRecentSongs = () => {
    const [RecentSongs, SetRecentSongs] = useState<any[]>([]);

    useEffect(() => {
        async function fetchRecentSongs() {
            const res = await window.electronAPI.FetchRecentPLays();
           SetRecentSongs(res.items) 
        }
        fetchRecentSongs();
    }, []);

    return (
        <div>
            <h2 className="text-4xl hover:underline font-bold text-white mb-4">Recently Played</h2>

            <div
                className="relative"
            >
                <Swiper
                    spaceBetween={10}
                    slidesPerView={4.1}
                >
                    {RecentSongs.map((Songs, index) => (
                        <SwiperSlide key={index} className="flex flex-col hover:bg-[#282828] p-4">
                            <div className="rounded-md w-full h-[250px] overflow-hidden">
                                <img
                                    src={Songs.track.album.images?.[0]?.url}
                                    alt={Songs.track.name}
                                    className="object-cover w-full h-full rounded-md"
                                />
                            </div>
                            <div className="mt-2">
                                <div className="flex flex-col">
                                    <h3 className="text-white font-semibold text-lg">{Songs.track.name}</h3>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default TopRecentSongs;
