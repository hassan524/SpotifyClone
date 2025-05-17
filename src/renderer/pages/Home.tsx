import TopArtist from '@/components/TopArtist'
import TopSongs from '@/components/TopSongs'
import TopRecentSongs from '@/components/RecentPlays'
import NewReleases from '@/components/NewReleases'

const Home = () => {


  return (
    <div
      className='relative home p-10 flex flex-col gap-[6rem] h-full min-h-fit'
      style={{
        backgroundImage: `
      linear-gradient(to bottom, #232221, #121212), 
      linear-gradient(to left, #232221, #121212)
    `,
      }}
    >
      <TopArtist />
      <TopSongs />
      <TopRecentSongs />
      <NewReleases />
    </div>
  )
}

export default Home