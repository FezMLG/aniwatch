import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.scss";
import axios from "axios";
import AnimeContainer from "./components/AnimeContainer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Anime from "./components/Anime";

export const baseUrl = `http://192.168.8.151:4000`;

function App() {
  const year = new Date().getFullYear().toString();
  const month = new Date().getMonth().toString();
  let season: string;
  switch (month) {
    case "0":
    case "1":
    case "2":
      season = "4";
      break;
    case "3":
    case "4":
    case "5":
      season = "1";
      break;
    case "6":
    case "7":
    case "8":
      season = "2";
      break;
    case "9":
    case "10":
    case "11":
      season = "3";
      break;

    default:
      season = "0";
      break;
  }

  const [animeList, setAnimeList] = useState<any>();
  const [seasonYear, setSeasonYear] = useState<string>(year);
  const [seasonSelect, setSeasonSelect] = useState<string>(season);

  const fetchData = async () => {
    console.log(seasonSelect, seasonYear);
    const result = await axios.post(baseUrl + "/api/anime/season", {
      offset: "0",
      season: seasonSelect,
      year: seasonYear,
    });
    setAnimeList(result.data?.series);
  };

  const AnimeFilters = () => {
    return (
      <div className="App-filter py-5">
        <input
          className="w-48 h-12 rounded shadow-lg px-4 py-6 bg-gray-800 outline-none"
          type="number"
          min="1900"
          max="2099"
          placeholder="Wpisz rok"
          onChange={(e) => setSeasonYear(e.target.value)}
          value={seasonYear}
        />
        <select
          className="w-48 h-12 rounded shadow-lg px-4 bg-gray-800	"
          onChange={(e) => setSeasonSelect(e.target.value)}
          value={seasonSelect}
        >
          <option value="4">Zima</option>
          <option value="1">Wiosna</option>
          <option value="2">Lato</option>
          <option value="3">Jesień</option>
        </select>
      </div>
    );
  };

  useEffect(() => {
    if (seasonYear.length === 4 && seasonSelect != "0") {
      fetchData();
    }
  }, [seasonYear, seasonSelect]);

  return (
    <div className="App-container bg-gray-900 text-white min-h-screen">
      <div className="App-logo">
        <div className="logo"></div>
        <h1 className="font-bold text-4xl">AniWatch</h1>
      </div>
      <Router>
        {/* <AnimeContainer series={animeList} /> */}
        <Switch>
          <Route exact path="/">
            <AnimeFilters />
            <AnimeContainer series={animeList} />
          </Route>
          <Route path="/anime/:link" component={Anime} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
