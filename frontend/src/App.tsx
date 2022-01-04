import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import AnimeContainer from './components/AnimeContainer';

const baseUrl = `http://localhost:4000`
 
function App() {

  const year = new Date().getFullYear().toString();
  const season = '0';

  const [animeList, setAnimeList] = useState<any>();
  const [seasonYear, setSeasonYear] = useState<string>(year);
  const [seasonSelect, setSeasonSelect] = useState<string>(season);

  const fetchData = async () => {
    console.log(seasonSelect, seasonYear);
    const result = await axios.post(baseUrl + '/api/anime/season/',{
      offset: "0",
      season: seasonSelect,
      year: seasonYear,
    });
    setAnimeList(result.data?.series);
  };
  
  useEffect(() => {
    if(seasonYear.length == 4){
      fetchData();
    };
    console.log(seasonYear.length);
    console.log(animeList);
  }, [seasonYear, seasonSelect]);

  return (
    <div className='App-list'>
      <input className="w-48 h-12" type="number" min="1900" max="2099" onChange={e => setSeasonYear(e.target.value)} value={seasonYear} />
      <select onChange={e => setSeasonSelect(e.target.value)} value={seasonSelect}>
        <option value="4">Zima</option>
        <option value="1">Wiosna</option>
        <option value="2">Lato</option>
        <option value="3">Jesień</option>
      </select>
      <button>Submit</button>
      <AnimeContainer series={animeList} />
    </div>
  );
}

export default App;
