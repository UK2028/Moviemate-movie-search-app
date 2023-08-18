import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import useTitle from "../hooks/useTitle";
import { Card, Pagination } from "../components";

export const Genre = ({apiPath,genreName}) => {

    const [page, setPage] = useState(1);
    const [searchParam] = useSearchParams();
    const with_genres = searchParam.get("q");
    const { data: movies, totalPages } = useFetch(apiPath, "", page, with_genres,"");
    useTitle(`${genreName}`);

    return (
        <section className="max-w-7xl mx-auto py-7 min-h-[72vh]">
            <div className="flex flex-wrap justify-center">
                {movies.map(item => <Card key={item.id} item={item} />)}
            </div>
            <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </section>
    )
}

