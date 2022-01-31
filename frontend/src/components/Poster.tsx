import { Link } from "react-router-dom";
import "./Poster.scss";

const Poster = (props: any) => {
  return (
    <div className="w-full Poster-card">
      <Link to={`/anime/${props.subName}/${props.subBaseLink}`}>
        {<img src={props.poster} alt="poster" className="Poster-cover" />}
      </Link>
      <Link to={`/anime/${props.subName}/${props.subBaseLink}`}>
        <span>{props.title}</span>
      </Link>
    </div>
  );
};

export default Poster;
