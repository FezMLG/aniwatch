import React from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Link } from "react-router-dom";
import Anime from './Anime';

const Poster = (props: any) => {
  return (
    <div className="w-full">
      <Link to={`/anime/${props.link}`}>
        <a href={props.link} className="">
          {<img src={props.poster} alt="poster"/>}
        </a>
        <a href={props.link} className="">{ props.title}</a>
      </Link>
    </div>
  )
}

export default Poster;