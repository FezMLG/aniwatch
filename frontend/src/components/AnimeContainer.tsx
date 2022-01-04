import 'react-loading-skeleton/dist/skeleton.css';
import Poster from './Poster';

const AnimeContainer = (props: any) => {

  const poster = () => {
    return props.series ? props.series.map((anime: any, index: number) => {
      return <Poster key={index} link={anime.title} title={anime.title} poster={anime.poster}/>;
    }) : ''
  }

  return(
    poster()
  )

}

export default AnimeContainer;