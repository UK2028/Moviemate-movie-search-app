import { useEffect, useState } from "react"
import { useSearchParams, useLocation } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import useTitle from "../hooks/useTitle"
import { Card,Pagination } from "../components";

export const MovieList = ({ apiPath, title }) => {

  const [prevApiPath,setPrevApiPath] = useState(apiPath);
  const [page, setPage] = useState(1);
  const [searchParam] = useSearchParams();
  const with_original_language = searchParam.get("with_original_language") || "en";
  const loc = useLocation();

  useEffect(()=>{
    if(loc.search!=="")
    {
      setPage(1);
    }
  },[loc]);

  if(apiPath!==prevApiPath)
  {
    setPrevApiPath(apiPath);
    setPage(1);
  }

  const {data:movies,totalPages} = useFetch(apiPath,"",page,"",with_original_language);
  
  useTitle(title);

  return (
    <section className="max-w-7xl mx-auto ">
      <div className="flex max-header_break_1:flex-col flex-wrap justify-around">
        {movies.map(item => <Card key={item.id} item={item} />)}
      </div>
      {with_original_language==="en" ? <Pagination page={page} setPage={setPage} totalPages={totalPages}/> : ""}
    </section>
  )
}

