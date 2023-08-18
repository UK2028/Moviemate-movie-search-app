import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import useTitle from "../hooks/useTitle";
import { Card, Pagination } from "../components";

export const Search = ({apiPath}) => {
  
  const [page,setPage] = useState(1);
  const [searchParam] = useSearchParams();
  const queryTerm = searchParam.get("q");
  const [ prevSearch, setPrevSearch ] = useState(queryTerm);
  const {data:movies,totalPages} = useFetch(apiPath,queryTerm,page);
  useTitle(`Result for ${queryTerm}`);

  if(prevSearch!==queryTerm)
  {
    setPage(1);
    setPrevSearch(queryTerm);
  }
  
  return (
    <section className="max-w-7xl mx-auto py-7 min-h-[72vh]">
      <div className="text-3xl dark:text-gray-200 text-center">{movies.length ?`Result for "${queryTerm}"` : `No Result for "${queryTerm}"`}</div>
      <div className="flex flex-wrap justify-center">
        {movies.map(item => <Card key={item.id} item={item} />)}
      </div>
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </section>
  )
}
