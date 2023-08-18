import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation } from "react-router-dom";

import LOGO from "../assets/UK LOGO.jpg";
import { useDebounce } from "../hooks/useDebounce";

export const Header = () => {

  const location = useLocation();
  const [menu, setMenu] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [language, setLanguage] = useState("en");
  const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("darkTheme")) || false);

  const debounceSearchTerm = useDebounce(searchTerm,1500);

  const navigate = useRef(useNavigate());

  const activeClass = "text-lg block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500";

  const inActiveClass = "text-lg block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700";

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   const value = e.target.search.value;
  //   e.target.search.value="";
  //   value !== "" ? navigate.current(`search?q=${value}`) : navigate.current("/");
  // }

  const handleSearch = useCallback(() => {
    debounceSearchTerm !== "" ? navigate.current(`search?q=${debounceSearchTerm}`) : navigate.current("/");
  },[debounceSearchTerm])

  const handleSearchOnMobile = (e) => {
    e.preventDefault();
    const value = e.target.search.value;
    value !== "" ? navigate.current(`search?q=${value}`) : navigate.current("/");
  }

  const handleLanguage = (e) => {
    setLanguage(e.target.value);
    return navigate.current(`/?with_original_language=${e.target.value}`);
  }

  useEffect(()=>{

    handleSearch();
  
  },[handleSearch])

  useEffect(() => {
    localStorage.setItem("darkTheme", JSON.stringify(darkMode));

    document.documentElement.removeAttribute("class");

    if (darkMode) {
      document.documentElement.classList.add("dark");
    }
    if(location.pathname!=="/search")
    {
      setMenu(true);
    }
  }, [darkMode,location.pathname]);

  return (
    <header>
      <nav className="border-b-2 border-gray-200 bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-900">
        <div className="max-w-screen-2xl flex flex-wrap max-header_break_2:flex-col max-header_break_2:justify-around justify-between items-center mx-auto p-4">

          <Link to="/" onClick={() => setLanguage("en")} className="max-header_break_2:mb-2 flex items-center">
            <img src={LOGO} className="h-12 rounded-lg border border-gray-500" alt="Moviemate Logo" />
            <span className="md:ml-1 self-center text-xl md:text-2xl font-semibold whitespace-nowrap dark:text-white">MOVIEMATE</span>
          </Link>

          <div className="flex items-center md:order-2 my-2">

            <button onClick={() => setDarkMode(!darkMode)} type="button" className=" border border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-800 rounded-lg text-sm p-2.5 mx-1">
              {!darkMode ? <svg className=" w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg> :
                <svg className=" w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path></svg>}
            </button>

            <select value={language} onChange={handleLanguage} className="border border-gray-700 rounded-lg mr-2 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 hover:bg-gray-400 dark:hover:bg-gray-800">
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="pa">Punjabi</option>
              <option value="te">Telugu</option>
            </select>

            <button onClick={() => setMenu(!menu)} type="button" data-collapse-toggle="navbar-search" aria-controls="navbar-search" aria-expanded="false" className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1" >
              <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
              <span className="sr-only">Search</span>
            </button>

            <div className="relative hidden md:block justify-self-end">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                <span className="sr-only">Search icon</span>
              </div>
              {/* <form onSubmit={handleSearch} >
                <input type="text" name="search" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
              </form> */}
              <input value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} type="text" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
            </div>
            <button onClick={() => setMenu(!menu)} data-collapse-toggle="navbar-search" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
              <span className="sr-only">Open menu</span>
              <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
            </button>
          </div>


          <div className={`${menu ? "hidden" : ""} max-header_break_1:grow items-center justify-around w-full md:flex md:w-auto md:order-1`} id="navbar-search">
            <div className="relative mt-3 md:hidden">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
              </div>
              {/* <form onSubmit={(e)=>{handleSearch(e);setMenu(!menu)}}>
                <input type="text" id="search-navbar" name="search" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
              </form> */}
              <form onSubmit={(e)=>{handleSearchOnMobile(e);setMenu(!menu)}}>
                <input type="text" name="search" id="search-navbar" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
              </form>
            </div>
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-4 lg:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink to="/" onClick={() => setLanguage("en")} className={({ isActive }) => isActive ? activeClass : inActiveClass}>Home</NavLink>
              </li>
              <li>
                <NavLink to="/movie/popular" onClick={() => setLanguage("en")} className={({ isActive }) => isActive ? activeClass : inActiveClass}>Popular</NavLink>
              </li>
              <li>
                <NavLink to="/movie/top-rated" onClick={() => setLanguage("en")} className={({ isActive }) => isActive ? activeClass : inActiveClass}>Top Rated</NavLink>
              </li>
              <li>
                <NavLink to="/movie/upcoming" onClick={() => setLanguage("en")} className={({ isActive }) => isActive ? activeClass : inActiveClass}>Upcoming</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}
