import { useEffect,useRef } from "react"

const useUnload = fn => {
    const cb = useRef(fn); // init with fn, so that type checkers won't assume that current might be undefined
  
    useEffect(() => {
      cb.current = fn;
    }, [fn]);
  
    useEffect(() => {
      const onUnload = (...args) => cb.current?.(...args);
      
      window.addEventListener("onbeforeunload", onUnload);
  
      return () => window.removeEventListener("onbeforeunload", onUnload);
    }, []);
  };
  

  export default useUnload