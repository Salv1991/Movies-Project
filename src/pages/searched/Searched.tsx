import { useParams, Link } from "react-router-dom";
import {useEffect} from 'react';

//ENUMS
import { Pages } from "../../enums/pages";

//STYLES
import searchedStyles from './searchedStyles.module.css';
import categoryStyles from '../../styles/categoryStyles.module.css';

//HOOKS
import { useApi } from "../../hooks/useApi";

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

const Searched = ({categoryPageNumber, setCategoryPageNumber, setSelectedPage }:SearchedProps) => {
    const{query} = useParams();
    const imagePathWidth500 = `https://image.tmdb.org/t/p/w500/`;
    const{data, isLoaded, error} = useApi(`search/multi?query=${query}`, categoryPageNumber, setCategoryPageNumber);
    useEffect(() => {
        setSelectedPage(Pages.None);
        setCategoryPageNumber(1);
    },[]);
   
    console.log("searchedData:", data)
    return(
        <section className={searchedStyles['movie-page-section']}>
            <CategoryContainer header={`Search results for: '${query}'`}>

            <div  className={categoryStyles['category-wrapper']}>
            {data && isLoaded && 
            
                <div className={categoryStyles['movies-container']}>
                    {data.results.map( (search) => (
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

            {data.results.length===0 && isLoaded && 
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