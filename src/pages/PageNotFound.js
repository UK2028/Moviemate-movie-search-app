import { useNavigate } from "react-router-dom"
import useTitle from "../hooks/useTitle";
import backup from "../assets/backup.png"

export const PageNotFound = () => {

  const navigate = useNavigate();
  useTitle(`404 error Page not found`)

  return (
    <section className=" min-h-[72vh] py-7">
      <div className="flex flex-col items-center">
        <div className="text-5xl dark:text-gray-200 mb-7 " >404! Page Not Found</div>
        <img src={backup} alt="Page Not Found" className="mb-10 rounded-lg " />
        <button onClick={() => navigate("/")} className="text-3xl dark:text-gray-200 p-5 border border-black rounded-lg hover:bg-sky-500 dark:hover:bg-cyan-400 dark:border-gray-200">BACK TO HOME</button>
      </div>
    </section>
  )
}
