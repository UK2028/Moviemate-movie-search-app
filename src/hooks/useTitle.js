import { useEffect } from "react";

export const useTitle = (title) => {
    useEffect(() => {
        document.title = `${title}/UK-Moviemate`
    })
  return null;
}

export default useTitle;