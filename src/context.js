import React, { useContext, useEffect, useState } from "react";



const AppContext = React.createContext();


const MOVIE_API = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}`



const AppProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [isError, setIsError] = useState({ "show":false, "msg": ""});
    const [query, setQuery] = useState("titanic");



    const getMovies = async (url) => {
        setIsLoading(true);
        try{
        
            const response = await fetch(url);
            const data =await response.json();
            console.log(data);
            if(data.Response === "True"){
                setIsLoading(false);
                setIsError({ "show":false, "msg": ""})
                setMovies(data.Search);
               
            }else{
                setIsError({show:true, "msg": data.Error})
            }

            
        }catch(error){
            console.log(error);
        }
    
    
    }
    
    useEffect(() => {
        let timeOut = setTimeout(()=>{
            getMovies(`${MOVIE_API}&s=${query}`);
        },1000)
        
        return () => clearTimeout(timeOut);
    }, [query]);
    
    return <AppContext.Provider value={{isLoading, movies, isError,query, setQuery}}> { children } </AppContext.Provider>
};

const GlobalContext = () => useContext(AppContext)



export { AppContext, AppProvider, GlobalContext };