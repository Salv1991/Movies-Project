import {useEffect, useState} from 'react';
type Genre = {
    id: number, 
    name: string
}
type useGenreListApiProps = {
    type: 'movie' | 'tv' | string;
}
export const useGenreListApi = ( type ) => {
    const [data, setData] = useState<Genre[]>([]);
    const [isLoaded, setIsLoaded] =  useState(false);
    const [error, setError] = useState(null);
    const  fetchData = async () => {
        fetch(`https://api.themoviedb.org/3/genre/${type}/list?language=en-US&api_key=${import.meta.env.VITE_API_KEY_MOVIESTMDB}`)        
        .then(response => response.json())
        .then(fetchedData => {
            setData(fetchedData.genres);
            setIsLoaded(true);
            console.error("GENRES LIST",data);
            console.error(`https://api.themoviedb.org/3/genre/${type}/list?language=en-US&api_key=${import.meta.env.VITE_API_KEY_MOVIESTMDB}`);

        })
        .catch(err => {
            console.error(err);
            setError(error);
        });
    };

    useEffect(() => {
        fetchData();        
        console.log("data by useApi", data);
      },[]); 
      
      return {data, isLoaded, error }
}
