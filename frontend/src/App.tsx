import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import AnimeContainer from './components/AnimeContainer';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { BrowserRouter } from 'react-router-dom';

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
  }, [seasonYear, seasonSelect]);

  return (
    <div className="App-container bg-gray-900 text-white min-h-screen">
      <div className='App-filter py-5'>
        <input className="w-48 h-12 rounded shadow-lg px-4 py-6 bg-gray-800 outline-none" type="number" min="1900" max="2099" placeholder="Wpisz rok" onChange={e => setSeasonYear(e.target.value)} value={seasonYear} />
        <select className="w-48 h-12 rounded shadow-lg px-4 bg-gray-800	" onChange={e => setSeasonSelect(e.target.value)} value={seasonSelect}>
          <option value="4">Zima</option>
          <option value="1">Wiosna</option>
          <option value="2">Lato</option>
          <option value="3">Jesień</option>
        </select>
      </div>
      <div className='App-list'>
        <BrowserRouter>
          <AnimeContainer series={animeList} />
          <SkeletonTheme baseColor="#1F2937" highlightColor="#374151">
            <div className="w-full">
                <Skeleton height={180} />
                <Skeleton />
            </div>
          </SkeletonTheme>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
