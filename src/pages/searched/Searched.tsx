import { useParams, Link } from "react-router-dom";
import {useEffect} from 'react';
import { useQuery } from "react-query";

//ENUMS
import { Pages } from "../../enums/pages";

//STYLES
import searchedStyles from './searchedStyles.module.css';
import categoryStyles from '../../styles/categoryStyles.module.css';

//ICONS
import { StarIcon } from "@heroicons/react/20/solid";

//COMPONENTS
import { CategoryContainer } from "../../components/categoryContainer/CategoryContainer";

//TYPES
type  SearchedProps = {
    setSelectedPage: (value:Pages)=> void;
    isAboveMediumScreens: boolean;
    categoryPageNumber: number;
    setCategoryPageNumber: (value:number) => void;
}
type Results = {
    adult: boolean;
    gender?: number;
    known_for?: FetchedDataProps[];
    known_for_department?:string;
    backdrop_path: string;
    genre_ids:number[];
    first_air_date?: string;
    media_type?: string;
    id: number;
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
type FetchedDataProps = {
    page: number;
    results: Results[];
    total_pages: number;
    total_results: number;
}

const Searched = ({categoryPageNumber, setCategoryPageNumber, setSelectedPage }:SearchedProps) => {
    const{query} = useParams();
    const url = `search/multi?query=${query}`;
    const imagePathWidth500 = `https://image.tmdb.org/t/p/w500/`;
    useEffect(() => {
        setSelectedPage(Pages.None);
        setCategoryPageNumber(1);
    },[]); 

    const {data, status } = useQuery(['category', url, categoryPageNumber], async () => {
        const response = await fetch(`https://api.themoviedb.org/3/${url}&page=${categoryPageNumber}&api_key=${import.meta.env.VITE_API_KEY_MOVIESTMDB}`);      
        return response.json();
    });

    console.log("searchedData:", data)
    return(
        <section className={searchedStyles['movie-page-section']}>
            <CategoryContainer header={`Search results for: '${query}'`}>

            <div  className={categoryStyles['category-wrapper']}>
            {status==='success' && data.results.length>0 &&       
                <div className={categoryStyles['movies-container']}>
                    {data.results.map((search:Results) => (
                        <>
                        
                        {/* PERSON */}
                        {search.media_type ==='person' &&
                       <Link 
                            reloadDocument  
                            to={`/${search.media_type}/${search.id}`} 
                            key={search.id} 
                            className={categoryStyles['movie-container']}
                        >
                            <div className={categoryStyles['movie-image-container']}>
                                {search.profile_path==null ? (
                                        <img className={`${categoryStyles['placeholder-image']} ${categoryStyles['movie-image']}`} src='/images/placeholder-image.svg' alt="placeholder image" />     
                                    ):(
                                        <img className={categoryStyles['movie-image']} src={`${imagePathWidth500}${search.profile_path}`} alt="person image" />     
                                    )
                                }
                            </div>
                            <div className={categoryStyles['movie-details']}>
                                <h3 className={categoryStyles['movie-title']}>{search.title || search.name || search.original_title || search.original_name || 'Name not found'}</h3>
                                <p className={categoryStyles['movie-overview']}>{search.overview===''? 'no summary available': search.overview}</p>         
                            </div>
                        </Link>          
                        }

                        {/* TV SERIES  */}
                        {search.media_type ==='tv' &&
                        <Link 
                            reloadDocument  
                            to={`/${search.media_type==='tv'?'series':search.media_type}/${search.id}`} 
                            key={search.id} className={categoryStyles['movie-container']}
                        >
                            <div className={categoryStyles['movie-image-container']}>
                                {search.poster_path==null ? (
                                    <img className={`${categoryStyles['placeholder-image']} ${categoryStyles['movie-image']}`} src='/images/placeholder-image.svg' alt="placeholder image" />     
                                ):(
                                    <img className={categoryStyles['movie-image']} src={`${imagePathWidth500}${search.poster_path}`} alt="tv series image" />     
                                )
                                }
                            </div>
                            <div className={categoryStyles['movie-details']}>
                                <h3 className={categoryStyles['movie-title']}>{search.title || search.name || search.original_title || search.original_name || 'Name not found'}</h3>
                                <p className={categoryStyles['movie-overview']}>{search.overview===''? 'no summary available': search.overview}</p>         
                                <div className={categoryStyles['movie-ratings']}>
                                    <h3>{search.vote_average.toFixed(1)}</h3>
                                    <div><StarIcon/></div>
                                    <span>{`(${search.vote_count})`}</span>
                                </div>
                            </div>
                        </Link>
                        } 

                        {/* MOVIE  */}
                        { search.media_type ==='movie' &&
                        <Link 
                            reloadDocument  
                            to={`/movie/${search.id}`} 
                            key={search.id} 
                            className={categoryStyles['movie-container']}
                        >
                            <div className={categoryStyles['movie-image-container']}>
                                {search.poster_path==null ? (
                                    <img className={`${categoryStyles['placeholder-image']} ${categoryStyles['movie-image']}`} src='/images/placeholder-image.svg' alt="placeholder image" />     
                                ):(
                                    <img className={categoryStyles['movie-image']} src={`${imagePathWidth500}${search.poster_path}`} alt="movie image" />     
                                )
                                }
                            </div>
                            <div className={categoryStyles['movie-details']}>
                                <h3 className={categoryStyles['movie-title']}>{search.title || search.name || search.original_title || search.original_name || 'Name not found'}</h3>
                                <p className={categoryStyles['movie-overview']}>{search.overview===''? 'no summary available': search.overview}</p>         
                                <div className={categoryStyles['movie-ratings']}>
                                    <h3>{search.vote_average.toFixed(1)}</h3>
                                    <div><StarIcon/></div>
                                    <span>{`(${search.vote_count})`}</span>
                                </div>
                            </div>
                        </Link>
                        }
                         
                        </>
                    ))}
                </div>
            }

            {status==='success' && data.results.length===0 &&  
                <div className={categoryStyles['no-results-container']}>
                    <h3>No results</h3>
                </div>    
            }
            {status==='error' && 
                <div>Error fetching data</div>
            }
        </div>
            </CategoryContainer>

        </section>
    )
}
export default Searched;