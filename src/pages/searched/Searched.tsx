import { Pages } from "../../enums/pages";
import { useParams } from "react-router-dom";
import {useEffect} from 'react';
import searchedStyles from './searchedStyles.module.css';
import { useApi } from "../../hooks/useApi";
import categoryStyles from '../../styles/categoryStyles.module.css';
import { Link } from "react-router-dom";
import { StarIcon } from "@heroicons/react/20/solid";
import { CategoryContainer } from "../../components/categoryContainer/CategoryContainer";

type  SearchedProps = {
    setSelectedPage: (value:Pages)=> void;
    isAboveMediumScreens: boolean;
}
const Searched = ({setSelectedPage, isAboveMediumScreens}:SearchedProps) => {
    const{query} = useParams();
    const imagePathWidth500 = `https://image.tmdb.org/t/p/w500/`;
    const{data, isLoaded, error} = useApi(`search/multi?query=${query}`);
    useEffect(() => {
        setSelectedPage(Pages.None);
    },[]);
   
    console.log("searchedData:", data)
    return(
        <section className={searchedStyles['movie-page-section']}>
            <CategoryContainer header={`Search results for: '${query}'`}>

            <div  className={categoryStyles['category-wrapper']}>
            {data && isLoaded && 
            
                <div className={categoryStyles['movies-container']}>
                    {data.map( (movie) => (
                        <>
                        
                        {/* PERSON */}
                        {movie.media_type ==='person' &&
                       <Link 
                            reloadDocument  
                            to={`/${movie.media_type}/${movie.id}`} 
                            key={movie.id} 
                            className={categoryStyles['movie-container']}
                        >
                            <div className={categoryStyles['movie-image-container']}>
                                {movie.profile_path==null ? (
                                        <img className={`${categoryStyles['placeholder-image']} ${categoryStyles['movie-image']}`} src='/images/placeholder-image.svg' alt="placeholder image" />     
                                    ):(
                                        <img className={categoryStyles['movie-image']} src={`${imagePathWidth500}${movie.profile_path}`} alt="person image" />     
                                    )
                                }
                            </div>
                            <div className={categoryStyles['movie-details']}>
                                <h3 className={categoryStyles['movie-title']}>{movie.name}</h3>
                            </div>
                        </Link>          
                        }

                        {/* TV SERIES  */}
                        {movie.media_type ==='tv' &&
                        <Link 
                            reloadDocument  
                            to={`/${movie.media_type==='tv'?'series':movie.media_type}/${movie.id}`} 
                            key={movie.id} className={categoryStyles['movie-container']}
                        >
                            <div className={categoryStyles['movie-image-container']}>
                                {movie.poster_path==null ? (
                                    <img className={`${categoryStyles['placeholder-image']} ${categoryStyles['movie-image']}`} src='/images/placeholder-image.svg' alt="placeholder image" />     
                                ):(
                                    <img className={categoryStyles['movie-image']} src={`${imagePathWidth500}${movie.poster_path}`} alt="tv series image" />     
                                )
                                }
                            </div>
                            <div className={categoryStyles['movie-details']}>
                                <div className={categoryStyles['movie-ratings']}>
                                    <h3>{movie.vote_average.toFixed(1)}</h3>
                                    <div><StarIcon/></div>
                                    <span>{`(${movie.vote_count})`}</span>
                                </div>
                                <h3 className={categoryStyles['movie-title']}>{ movie.name? movie.name : 'No Available Title' }</h3>
                            </div>
                        </Link>
                        } 

                        {/* MOVIE  */}
                        { movie.media_type ==='movie' &&
                        <Link 
                            reloadDocument  
                            to={`/movie/${movie.id}`} 
                            key={movie.id} 
                            className={categoryStyles['movie-container']}
                        >
                            <div className={categoryStyles['movie-image-container']}>
                                {movie.poster_path==null ? (
                                    <img className={`${categoryStyles['placeholder-image']} ${categoryStyles['movie-image']}`} src='/images/placeholder-image.svg' alt="placeholder image" />     
                                ):(
                                    <img className={categoryStyles['movie-image']} src={`${imagePathWidth500}${movie.poster_path}`} alt="movie image" />     
                                )
                                }
                            </div>
                            <div className={categoryStyles['movie-details']}>
                                <div className={categoryStyles['movie-ratings']}>
                                    <h3>{movie.vote_average.toFixed(1)}</h3>
                                    <div><StarIcon/></div>
                                    <span>{`(${movie.vote_count})`}</span>
                                </div>
                                <h3 className={categoryStyles['movie-title']}>{ movie.title || movie.original_title}</h3>
                            </div>
                        </Link>
                        }
                         
                        </>
                    ))}
                </div>
            }

            {data.length===0 && isLoaded && 
                <div className={categoryStyles['no-results-container']}>
                    <h3>No results</h3>
                </div>    
            }
            {error && 
                <div>{error}</div>
            }
        </div>
            </CategoryContainer>

        </section>
    )
}
export default Searched;