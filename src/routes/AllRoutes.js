import { useState } from 'react';
import { Routes, Route } from "react-router-dom"
import { MovieList,MovieDetail,Genre,Search,PageNotFound } from "../pages/index"

export const AllRoutes = () => {

  const [genreName,setGenreName] = useState("");

  return (
    <>
    <Routes>
        <Route path="/" element={<MovieList apiPath="movie/now_playing" title="Home" />}/>
        <Route path="/movie/popular/" element={<MovieList apiPath="movie/popular" title="Popular" />}/>
        <Route path="/movie/top-rated/" element={<MovieList apiPath="movie/top_rated" title="Top Rated" />}/>
        <Route path="/movie/upcoming/" element={<MovieList apiPath="movie/upcoming" title="Upcoming" />}/>
        <Route path="/search" element={<Search apiPath="search/movie" />}/>
        <Route path="/discover/movie" element={<Genre apiPath="discover/movie" genreName={genreName} />}/>
        <Route path="/movie/:id" element={<MovieDetail setGenreName={setGenreName}/>}/>
        <Route path="*" element={<PageNotFound/>}/>
    </Routes>
    </>
  )
}
