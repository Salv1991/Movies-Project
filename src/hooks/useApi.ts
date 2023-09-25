import {useState, useEffect} from 'react';

export const baseUrl = `https://api.themoviedb.org/3/`;

type fetchedDataProps = {
    adult: boolean;
    gender?: number;
    known_for?: fetchedDataProps[];
    known_for_department?:string;
    backdrop_path: string;
    genre_ids:number[];
    first_air_date?: string;
    media_type?: string;
    id: 385687
    original_language: string
    original_title?: string
    original_name?: string
    name?:string
    overview: string
    popularity: number
    poster_path:string | null;
    release_date:string;
    title:string;
    video: boolean;
    vote_average: number;
    vote_count:number;
    profile_path:string | null;
}

export const useApi = (url:string) => {
    const [data, setData] = useState<fetchedDataProps[]>([]);
    const [isLoaded, setIsLoaded] =  useState(false);
    const [error, setError] = useState(null);
    const  fetchData = async () => {
        fetch(`https://api.themoviedb.org/3/${url}&api_key=${import.meta.env.VITE_API_KEY_MOVIESTMDB}`)        
        .then(response => response.json())
        .then(fetchedData => {
            setData(fetchedData.results);
            setIsLoaded(true);
            console.log("fetched by useApi",fetchedData)
            console.log(`URL`,`https://api.themoviedb.org/3/${url}&api_key=${import.meta.env.VITE_API_KEY_MOVIESTMDB}`)
        })
        .catch(err => {
            console.error(err);
            setError(error);
        });
    };

    useEffect(() => {
        fetchData();        
        console.log("data by useApi", data);
      },[url]); 
      
      return {data, isLoaded, error }
}

type Genre = {
    id: number;
    name: string;
}
type ProductionCompanies = {
    id: number;
    name: string;
    logo_path: string|null;
    origin_country: string;
}
type ProductionCountries = {
    iso_3166_1: string;
    name:string;
}
type SpokenLanguages = {
    english_name: string;
    iso_639_1: string;
    name: string;
}
type MediaProps = {
        adult: boolean;
        backdrop_path: string;
        belongs_to_collection: [] | null;
        biography?: string;
        birthday?: string;
        budget: number;
        genres: Genre[] | null;
        homepage: string;
        id: number;
        imdb_id: string;
        original_language:string;
        name?: string;
        original_title?: string; 
        overview: string;
        popularity: number;
        poster_path: string;
        profile_path?: string;
        production_companies: ProductionCompanies[] | null;
        production_countries: ProductionCountries[] | null;
        release_date?: string;
        first_air_date?: string;
        revenue: number;
        runtime?: number;
        episode_run_time?: number[];
        spoken_languages: SpokenLanguages[] | null;
        status: string;
        tagline: string;
        title: string;
        video: boolean;
        vote_average: number;
        vote_count: number;
}
export const useApiSearchById = (url:string) => {
    const [data, setData] = useState<MediaProps>({
        adult: false,
        backdrop_path: '',
        belongs_to_collection: null,
        budget: 0,
        genres: null,
        homepage: '',
        id: 0,
        imdb_id: '',
        original_language:'',
        original_title: '',
        name: '', 
        overview: '',
        popularity: 0,
        poster_path: '',
        production_companies: [],
        production_countries: [],
        release_date: '',
        first_air_date: '',
        revenue: 0,
        runtime: 0,
        episode_run_time: [],
        spoken_languages: [],
        status: '',
        tagline: '',
        title: '',
        video: false,
        vote_average: 0,
        vote_count: 0,
    }); 
    const [isLoaded, setIsLoaded] =  useState(false);
    const [error, setError] = useState(null);
    const  fetchData = async () => {
        fetch(`https://api.themoviedb.org/3/${url}?language=en-US&api_key=${import.meta.env.VITE_API_KEY_MOVIESTMDB}`)  
        .then(response => response.json())
        .then(fetchedData => {
            setData(fetchedData);
            setIsLoaded(true); 
            console.log("fetched searchbyID",fetchedData)
            console.log(`this: https://api.themoviedb.org/3/${url}?language=en-US&api_key=${import.meta.env.VITE_API_KEY_MOVIESTMDB}`)
        })
        .catch(err => {
            console.log("ERRORRRR:", error)
            console.error("ERRORRRR:",err);
            setError(error);
        });
    };

    useEffect(() => {
        fetchData();        
        console.log("data", data);
      },[]); 
      
      return {data, isLoaded, error }
}