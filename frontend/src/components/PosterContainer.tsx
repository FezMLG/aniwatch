import "react-loading-skeleton/dist/skeleton.css";
import Poster from "./Poster";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const PosterContainer = (props: any) => {
  const sections = () => {
    const ret: JSX.Element[] = [];
    for (let sub in props.subsList) {
      ret.push(
        <>
          <h2>{sub}</h2>
          {poster(props.subsList[sub], sub)}
        </>
      );
    }
    return ret;
  };

  const poster = (animeList: any[] | undefined, subName: string) => {
    return animeList
      ? animeList.map((anime: any, index: number) => {
          return (
            <Poster
              key={index}
              subBaseLink={anime.link}
              title={anime.title}
              poster={anime.poster}
              subName={subName}
            />
          );
        })
      : "";
  };

  const n = 16;

  return (
    <>
      <div className="App-list">
        {sections()
          ? sections()
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

export default PosterContainer;
