import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';

const NewReleases = () => {

    const [NewReleases, SetNewReleases] = useState<any[]>([]);

useEffect(() => {
    async function FetchCountryPlaylist() {
        const NewRel = await window.electronAPI.FetchNewReleases();
        console.log('newres', NewRel)

        const updatedAlbums = await Promise.all(
            NewRel.albums.items.map(async (album: any) => {
                const artistHref = album.artists?.[0]?.href;
                if (artistHref) {
                    const artistData = await window.electronAPI.fetchArtistById(artistHref);
                    return { ...album, artistDetails: artistData };
                }
                return album;
            })
        );

        SetNewReleases(updatedAlbums);
    }

    FetchCountryPlaylist();
}, []);

    return (
        <div>
            <h2 className="text-4xl hover:underline font-bold text-white mb-4">Latest Album Releases</h2>

            <div
                className="relative"
            >
                <Swiper
                    spaceBetween={10}
                    slidesPerView={4.1}
                >
                    {NewReleases.map((NewReleases, index) => (
                        <SwiperSlide key={index} className="flex cursor-pointer flex-col hover:bg-[#282828] p-4">
                            <div className="w-full h-[250px] overflow-hidden">
                                <img
                                    src={NewReleases.images?.[0]?.url}
                                    alt={NewReleases.name}
                                    className="object-cover w-full h-full rounded-md"
                                />
                            </div>
                            <div className="mt-2">
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-white font-semibold text-lg">{NewReleases.name}</h3>
                                    <span className='text-gray-300 text-lg font-semibold truncate'>{NewReleases.artistDetails.name}</span>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default NewReleases;
