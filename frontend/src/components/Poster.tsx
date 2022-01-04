import React from "react";
import Skeleton from 'react-loading-skeleton';

const Poster = (props: any) => {
  return (
    <div className="w-full">
    <a href={props.link} className="">
      {<img src={props.poster} alt="poster"/> || <Skeleton />}
    </a>
    <a href={props.link} className="">{ props.title || <Skeleton />}</a>
  </div>
  )
}

export default Poster;