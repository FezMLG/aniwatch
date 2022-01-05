import 'react-loading-skeleton/dist/skeleton.css';
import Poster from './Poster';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Anime from './Anime';

const AnimeContainer = (props: any) => {

  const poster = () => {
    return props.series ? props.series.map((anime: any, index: number) => {
      return <Poster key={index} link={anime.title} title={anime.title} poster={anime.poster}/>;
    }) : ''
  }

  return(
    <>
    <Routes>
      {poster()}
      <Route path="/anime/:link" element={<Anime/>} />
    </Routes>
    </>
  )

}

export default AnimeContainer;