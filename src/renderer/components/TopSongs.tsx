import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const TopSongs = () => {
    const [TopSongs, SetTopSongs] = useState<any[]>([]);

    useEffect(() => {
        async function FetchSongs() {
            const res = await window.electronAPI.FetchTopSongs();
          SetTopSongs(res.items)
        }
        FetchSongs();
    }, []);

    return (
        <div>
            <h2 className="text-4xl hover:underline font-bold text-white mb-4">Albums featuring songs you like</h2>

            <div
                className="relative"
            >
                <Swiper
                    spaceBetween={10}
                    slidesPerView={4.1}
                >
                    {TopSongs.map((Songs, index) => (
                        <SwiperSlide key={index} className="flex flex-col hover:bg-[#282828] p-4">
                            <div className="rounded-md w-full h-[250px] overflow-hidden">
                                <img
                                    src={Songs.album.images?.[0]?.url}
                                    alt={Songs.name}
                                    className="object-cover w-full h-full rounded-md"
                                />
                            </div>
                            <div className="mt-2">
                                <div className="flex flex-col">
                                    <h3 className="text-white font-semibold text-lg">{Songs.name}</h3>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default TopSongs;
