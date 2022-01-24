import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Link,
  matchPath,
  NavLink,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import "@fortawesome/fontawesome-free/js/all.js";
import "./Anime.scss";

import { baseUrl } from "../App";

const Anime = (props: any) => {
  const [animeDetails, setAnimeDetails] = useState<any>("");

  const { link } = useParams<{ link: string }>();

  // const link = "5toubun-no-hanayome";

  const { title, poster, description, status, ep_count, episodes, season } =
    animeDetails;

  const fetchData = async () => {
    console.log(link);
    const result = await axios.post(baseUrl + "/api/anime/series/", {
      name: link,
    });
    setAnimeDetails(result.data);
  };

  const episodesList = () => {
    return episodes
      ? episodes.map((episode: any, index: number) => {
          console.log(episode);
          let players = mapPlayers(episode);
          console.log(players);
          return (
            <>
              <h3 className="font-bold capitalize">
                {index + 1}. {episode.title}
              </h3>
              <div className="flex flex-row flex-wrap justify-start my-4 gap-5">
                {players}
              </div>
            </>
          );
        })
      : "";
  };

  const mapPlayers = (episode: { players: any[] }) => {
    console.log(episode.players);
    return episode.players
      ? episode.players.map((player: any, index: number) => {
          return (
            <a
              key={index}
              href={player.link}
              target="_blank"
              className="border rounded border-transparent px-4 py-2 box-content bg-blue-700"
            >
              {player.name}
            </a>
          );
        })
      : "";
  };

  useEffect(() => {
    fetchData();
    console.log("deatils " + animeDetails.title);
    console.log("/" + link);
  }, []);

  const Description = () => {
    return (
      <>
        <div className="flex flex-row gap-8 mx-2 my-6 rounded shadow-lg px-4 py-6 bg-gray-800">
          <div className="flex flex-col flex-nowrap">
            <span className="font-bold">Status</span>
            <span>{status}</span>
          </div>
          <div className="flex flex-col flex-nowrap">
            <span className="font-bold">Ilość odcinków</span>
            <span>{ep_count}</span>
          </div>
          <div className="flex flex-col flex-nowrap">
            <span className="font-bold">Sezon</span>
            <span>
              {season?.season} / {season?.year}
            </span>
          </div>
        </div>
        <div className="gap-8 mx-2 my-6 rounded shadow-lg px-4 py-6 bg-gray-800">
          <div className="flex flex-col flex-nowrap">
            <span className="font-bold ">Opis</span>
            <p>{description}</p>
          </div>
        </div>
      </>
    );
  };

  const Episodes = () => {
    return (
      <>
        <div className="gap-8 mx-2 my-6 rounded shadow-lg px-4 py-6 bg-gray-800">
          <div className="flex flex-col flex-nowrap">{episodesList()}</div>
        </div>
      </>
    );
  };

  let match = useRouteMatch("/anime/:link");

  return (
    <div>
      <Link
        to="/"
        className="flex flex-row gap-x-1 items-center h-10 Anime-backBtn bg-gray-800"
      >
        <i className="fas fa-chevron-circle-left"></i>
        Back
      </Link>
      <div className="Anime-header">
        <div
          className="Anime-banner"
          style={{ backgroundImage: poster ? `url(${poster})` : "" }}
        >
          <div className="inner-shadow"></div>
        </div>
        <div className="Anime-title m-5 pb-5">
          <img src={poster} className="w-60 rounded-md poster" />
          <h2 className="text-2xl font-bold">{title}</h2>
        </div>
      </div>
      <NavLink
        exact
        to={`${match?.url}`}
        className={`mx-2`}
        activeClassName="font-bold text-blue-500"
      >
        O serialu
      </NavLink>
      <NavLink
        to={`${match?.url}/episodes`}
        className="mx-2"
        activeClassName="font-bold text-blue-500"
      >
        Odcinki
      </NavLink>
      <Switch>
        <Route exact path={`${match?.path}`} component={Description} />
        <Route exact path={`${match?.path}/episodes`} component={Episodes} />
      </Switch>
      {/* <div>{episodesList()}</div> */}
    </div>
  );
};

export default Anime;
