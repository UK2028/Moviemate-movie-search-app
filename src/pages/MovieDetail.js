import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from "react";
import ReactPlayer from 'react-player';

import useTitle from "../hooks/useTitle";
import { Cast } from "../components/Cast";

import Backup from "../assets/backup.png";

export const MovieDetail = ({ setGenreName }) => {

  const params = useParams();

  const navigate = useNavigate();

  const [detail, setDetail] = useState({});
  const [trailer, setTrailer] = useState("");
  const [casts, setCasts] = useState("");
  const [dragStart, setDragStart] = useState(false);
  const [pageX, setPageX] = useState(0);
  const [previousScroll, setPreviousScroll] = useState(0);

  const castCarousel = useRef();

  useTitle(detail ? detail.title : "searching...");

  const image = detail.poster_path ? `https://image.tmdb.org/t/p/w500/${detail.poster_path}` : Backup;

  useEffect(() => {
    const fetchDetail = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.REACT_APP_API_KEY}`);
      const result = await response.json();
      setDetail(result);
      const trailerResponse = await fetch(`https://api.themoviedb.org/3/movie/${params.id}/videos?api_key=${process.env.REACT_APP_API_KEY}`);
      const trailerData = await trailerResponse.json();
      let trailerArray = trailerData.results.filter(item => item.type === "Trailer");
      setTrailer(trailerArray[0]);
      const creditsResponse = await fetch(`https://api.themoviedb.org/3/movie/${params.id}/credits?api_key=${process.env.REACT_APP_API_KEY}`);
      const creditsData = await creditsResponse.json();
      setCasts(creditsData.cast);
    }
    fetchDetail();
  }, [params.id]);

  const handleDragStart = (e) => {
    setDragStart(true);
    setPageX(e.pageX || e.touches[0].pageX);
  }

  const handleDragStop = () => {
    setDragStart(false);
  }

  const handleScroll = (e) => {
    if (!dragStart) {
      return;
    }
    let positionDiff = (e.pageX || e.touches[0].pageX) - pageX;
    castCarousel.current.scrollLeft = previousScroll - positionDiff;
    setPreviousScroll(previousScroll - positionDiff);
    setPageX(e.pageX || e.touches[0].pageX);
  };

  return (
    <>
      <section className="mx-auto min-h-[72vh] dark:text-slate-200 max-w-7xl ">
        <div className="py-4 px-auto flex flex-wrap justify-between max-detail_break_1:justify-center">

          <div className="max-w-sm">
            <img className="rounded-lg" src={image} alt="movie poster" />
          </div>

          <div className="max-w-3xl max-detail_break_3:max-w-md flex flex-col my-5 :mx-2 max-detail_break_4:max-w-xs max-detail_break_2:px-3  detail_break_2:ml-2">
            <h1 className="text-4xl text-left max-detail_break_1:text-center text-left font-bold mb-2">{detail.title}</h1>
            <p className="text-left max-detail_break_1:text-center">{detail.overview}</p>

            {detail.genres ? <div className="my-5 flex flex-wrap gap-2 detail_break_1:justify-start max-detail_break_2:justify-center detail_break_2:max-detail_break_1:justify-center">{detail.genres.map((genre) => <span key={genre.id} className="border border-gray-400 text-lg font-medium p-3 dark:hover:bg-gray-400 dark:hover:text-black hover:bg-gray-400 rounded-lg" onClick={() => { navigate(`/discover/movie?q=${genre.id}`); setGenreName(genre.name) }}>{genre.name}</span>)}</div> : ""}

            <div className="flex justify-between items-end max-detail_break_2:justify-center max-detail_break_3:justify-center max-detail_break_2:flex-wrap">

              <div className="flex flex-col max-detail_break_2:w-full max-detail_break_2:justify-between max-detail_break_2:items-center detail_break_3:max-detail_break_2:flex-row detail_break_3:max-detail_break_2:flex-wrap ">
                <div className="flex flex-wrap justify-start items-center my-2 detail_break_3:max-detail_break_2:basis-2/5 max-detail_break_2:flex-col max-detail_break_2:items-start">
                  <div className=" detail_break_2:flex  detail_break_2:justify-center  detail_break_2:items-center max-detail_break_2:flex max-detail_break_2:items-center "><svg aria-hidden="true" className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <title>Rating star</title>
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                    <div className="text-4xl">{detail.vote_average}</div></div>
                  <div className=" detail_break_2:flex  detail_break_2:justify-center  detail_break_2:items-center max-detail_break_2:flex max-detail_break_2:items-center "><div className="w-1 h-1 bg-gray-800 dark:bg-gray-400 rounded-lg border border-gray-200 mx-2"></div>
                    <div className="text-xs font-semibold">{detail.vote_count} REVIEWS</div>
                  </div></div>
                <div className="my-3 detail_break_3:max-detail_break_2:basis-2/5 "><span className="font-bold mr-2">RUNTIME:</span>{detail.runtime} min</div>
                <div className="my-3 detail_break_3:max-detail_break_2:basis-2/5 "><span className="font-bold mr-2">BUDGET:</span>${detail.budget}</div>
                <div className="my-3 detail_break_3:max-detail_break_2:basis-2/5 "><span className="font-bold mr-2">REVENUE:</span>${detail.revenue}</div>
                <div className="my-3 detail_break_3:max-detail_break_2:basis-2/5 "><span className="font-bold mr-2">RELEASE DATE:</span>{detail.release_date}</div>
                <div className="my-3 detail_break_3:max-detail_break_2:basis-2/5 "><span className="font-bold mr-2">IMDB CODE:</span><a href={`https://www.imdb.com/title/${detail.imdb_id}`} target="_blank" rel="noreferrer">{detail.imdb_id}</a></div>
              </div>

              <div className="max-w-lg max-detail_break_3:max-w-sm max-detail_break_2:max-w-xl max-detail_break_4:max-w-[300px]" onTouchStart={handleDragStart} onTouchEnd={handleDragStop} onTouchMove={handleScroll} onMouseDown={handleDragStart} onMouseUp={handleDragStop} onMouseLeave={handleDragStop} onMouseMove={(e) => { e.preventDefault(); handleScroll(e); }} >

                <div ref={castCarousel} className="flex overflow-x-hidden ">
                  {casts.length && casts.map(cast => <Cast key={cast.id} person={cast} />)}
                </div>

              </div>

            </div>

          </div>

          {trailer && <div className="max-sm:min-w-[200px] w-full flex flex-col items-center mt-9">

            <div className="max-sm:w-full max-sm:h-72 sm:min-w-[630px] sm:min-h-[340px]">
              <ReactPlayer width="100%" height="100%" url={`http://www.youtube.com/watch?v=${trailer?.key}`} controls={true} />
            </div>

          </div>}

        </div>
      </section>
    </>
  )
}
