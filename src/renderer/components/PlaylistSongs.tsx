import React from 'react'
import { useParams } from 'react-router-dom';

interface Props {
    bottom: string;
}

const PlaylistSongs: React.FC<Props> = ({ bottom }) => {

    const { id } = useParams();

    React.useEffect(() => {
        (async () => {
            const songs = await window.electronAPI.getsongs(id!);
            console.log('songs', songs);
        })();
    }, [id]);

    return (
        <div
            className="h-full"
            style={{
                backgroundImage: `linear-gradient(to bottom, ${bottom} 0%, ${bottom} 1%, #121212 100%)`,
            }}
        ></div>
    )
}

export default PlaylistSongs