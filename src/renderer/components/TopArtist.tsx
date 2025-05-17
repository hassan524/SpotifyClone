import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const TopArtist = () => {
    const [artists, setArtists] = useState<any[]>([]);

    useEffect(() => {
        async function fetchArtist() {
            const res = await window.electronAPI.FetchTopArtist();
            if (res?.items) setArtists(res.items);
        }
        fetchArtist();
    }, []);

    return (
        <div>
            <h2 className="text-4xl hover:underline font-bold text-white mb-4">Your Top Artists</h2>

            <div
                className="relative"
            >
                <Swiper
                    spaceBetween={10}
                    slidesPerView={4.1}
                >
                    {artists.map((artist, index) => (
                        <SwiperSlide key={index} className="flex cursor-pointer flex-col hover:bg-[#282828] p-4">
                            <div className="rounded-full w-full h-[250px] overflow-hidden">
                                <img
                                    src={artist.images?.[0]?.url}
                                    alt={artist.name}
                                    className="object-cover w-full h-full rounded-md"
                                />
                            </div>
                            <div className="mt-2 text-center">
                                <h3 className="text-white font-semibold text-2xl">{artist.name}</h3>
                                {/* <span className='text-gray-300 text-lg font-semibold truncate'>{artist.type}</span>  */}
                                <p className="text-gray-400 text-lg opacity-70">
                                    {artist.followers?.total?.toLocaleString()} followers
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default TopArtist;
