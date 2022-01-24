import "react-loading-skeleton/dist/skeleton.css";
import Poster from "./Poster";
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

  const n = 16;

  return (
    <>
      <div className="App-list">
        {poster()
          ? poster()
          : [...Array(n)].map((e, i) => (
              <SkeletonTheme
                baseColor="#1F2937"
                highlightColor="#374151"
                key={i}
              >
                <div className="w-full">
                  <Skeleton height={180} />
                  <Skeleton />
                </div>
              </SkeletonTheme>
            ))}
      </div>
    </>
  );
};

export default AnimeContainer;
