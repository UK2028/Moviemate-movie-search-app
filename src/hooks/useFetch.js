import { useState,useEffect } from "react";

export default function useFetch(apiPath,queryTerm="",page=1,with_genres="",with_original_language="en") {

    const [data,setData] = useState([]);
    const [totalPages,setTotalPages] = useState(0);

    useEffect(() => {

      async function fetchMovie()
      {
        const response = await fetch(`https://api.themoviedb.org/3/${apiPath}?api_key=${process.env.REACT_APP_API_KEY}&query=${queryTerm}&page=${page}&with_genres=${with_genres}&with_original_language=${with_original_language}`);
        const result = await response.json();
        setData(result.results);
        setTotalPages(result.total_pages);
        window.scrollTo(0,0);
      }
      
      fetchMovie();

    },[apiPath,queryTerm,page,with_genres,with_original_language]);

  return ({data,totalPages})
}