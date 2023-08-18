
import Backup from "../assets/backup.png";

export const Cast = ({person}) => {

    const image = person.profile_path ? `https://image.tmdb.org/t/p/w500/${person.profile_path}` : Backup;


  return (
    <div className="max-detail_break_4:max-h-[300px] max-detail_break_4:max-w-[200px] p-2">
      <div className="w-32 flex flex-col items-center select-none">
        <img draggable="false" src={image} alt="cast" className="max-sm:max-h-[150px] w-32 mb-2 rounded-2xl border border-slate-400"/>
        <div className="text-center dark:text-slate-100 max-sm:text-sm sm:text-sm px-1 mb-1">
            {person.original_name}
        </div>
        <div className="text-center dark:text-slate-100 max-sm:text-sm sm:text-xs px-1 mb-1">
            {person.character}
        </div>
      </div>
    </div>
  )
}
