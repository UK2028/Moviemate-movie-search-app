import { Link } from "react-router-dom"

export const Footer = () => {
  return (
    <>
      <footer className=" bg-white shadow dark:bg-gray-800">
        <div className=" max-w-screen-2xl p-4 md:p-6 md:flex md:items-center md:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <Link to="/" className="hover:underline">UK-MovieMate™</Link>. All Rights Reserved.
          </span>
          <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
            <li>
              <a href="https://www.linkedin.com/in/udit-khandelwal-uk2028/" target="_blank" rel="noreferrer" className="mr-4 hover:underline md:mr-6 ">LinkedIn</a>
            </li>
            <li>
              <a href="https://github.com/UK2028" target="_blank" rel="noreferrer" className="mr-4 hover:underline md:mr-6">GitHub</a>
            </li>
            <li>
              <a href="https://www.instagram.com/u.khandelwal02/" target="_blank" rel="noreferrer" className="mr-4 hover:underline md:mr-6">Instagram</a>
            </li>
            <li>
              <a href="https://twitter.com/u_khandelwal02" target="_blank" rel="noreferrer" className="hover:underline">Twitter</a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  )
}
