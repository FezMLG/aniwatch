import "react-loading-skeleton/dist/skeleton.css";
import Poster from "./Poster";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Anime from "./Anime";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const AnimeContainer = (props: any) => {
  const poster = () => {
    return props.series
      ? props.series.map((anime: any, index: number) => {
          return (
            <Poster
              key={index}
              link={anime.link}
              title={anime.title}
              poster={anime.poster}
            />
          );
        })
      : "";
  };

  return (
    <>
      <div className="App-list">
        <SkeletonTheme baseColor="#1F2937" highlightColor="#374151">
          <div className="w-full">
            <Skeleton height={180} />
            <Skeleton />
          </div>
        </SkeletonTheme>
        {poster()}
      </div>
    </>
  );
};

export default AnimeContainer;
