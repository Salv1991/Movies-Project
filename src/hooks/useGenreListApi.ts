import {useEffect, useState} from 'react';
import { MediaType } from '../enums/mediaType';
type Genre = {
    id: number, 
    name: string
}

export const useGenreListApi = ( genreType:MediaType ) => {
    const [data, setData] = useState<Genre[]>([]);
    const [isLoaded, setIsLoaded] =  useState(false);
    const [error, setError] = useState(null);
    const  fetchData = async () => {
        fetch(`https://api.themoviedb.org/3/genre/${genreType}/list?language=en-US&api_key=${import.meta.env.VITE_API_KEY_MOVIESTMDB}`)        
        .then(response => response.json())
        .then(fetchedData => {
            setData(fetchedData.genres);
            setIsLoaded(true);
            console.error( fetchedData);
            console.error(`https://api.themoviedb.org/3/genre/${genreType}/list?language=en-US&api_key=${import.meta.env.VITE_API_KEY_MOVIESTMDB}`);

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
