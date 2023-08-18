import { Link } from "react-router-dom";
import Backup from "../assets/backup.png";

export const Card = ({ item }) => {

    const image = item.poster_path ? `https://image.tmdb.org/t/p/w500/${item.poster_path}` :
        Backup;

    return (

        <div className="w-[100%] max-header_break_2:max-h-[150px] max-header_break_1:max-h-[192px] max-header_break_1:overflow-hidden header_break_1:max-w-sm m-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
            <Link to={`/movie/${item.id}`} className="max-header_break_1:flex ">
                <img className="max-header_break_2:max-h-[150px] max-header_break_1:max-h-[192px] header_break_1:max-w-[383px] rounded-lg" src={image} alt="movie poster" />
                <div className="p-5 max-header_break_2:max-h-[150px] max-header_break_2:p-2 max-header_break_1:max-h-[120px]">
                    <h3 className="mb-2 header_break_1:text-center text-2xl max-header_break_2:text-sm max-header_break_1:text-lg font-bold tracking-tight text-gray-900 dark:text-white">{item.original_title}</h3>
                    <p className="mb-3 font-normal text-lg max-header_break_2:text-xs max-header_break_1:text-sm text-gray-700 dark:text-gray-400 max-header_break_2:overflow-hidden ">{item.overview}</p>
                </div>
            </Link>
        </div>
    )
}
