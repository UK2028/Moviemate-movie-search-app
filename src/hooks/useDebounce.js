import { useEffect, useRef, useState } from "react"


export const useDebounce = (value, delay) => {

    const [debounceValue, setDebounceValue] = useState(value);

    const id = useRef();

    useEffect(()=>{
        id.current = setTimeout(()=>setDebounceValue(value),delay);

        return () => {
            clearTimeout(id.current);
        }
    },[value, delay]);

  return debounceValue;
}
