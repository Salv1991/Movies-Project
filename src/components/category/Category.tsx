import { Link } from 'react-router-dom';
//STYLES
import categoryStyles from '../../styles/categoryStyles.module.css';
//ICONS
import { StarIcon } from '@heroicons/react/20/solid';
import {ChevronRightIcon, ChevronDoubleRightIcon, ChevronLeftIcon, ChevronDoubleLeftIcon} from '@heroicons/react/20/solid';
//ENUMS
import { CategoryType } from '../../enums/categoryType';

//COMPONENTS
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import { useQuery } from 'react-query';
import AnchorLink from 'react-anchor-link-smooth-scroll';

//TYPES
type CategoryProps = {
    url: string;
    categoryType: CategoryType | 'movie' | 'series';
    categoryPageNumber: number;
    setCategoryPageNumber:(value:number) => void;
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

const Category = ({ url, categoryType, categoryPageNumber, setCategoryPageNumber }:CategoryProps) => {
    let totalPages= 0;
    const imagePathWidth154 = `https://image.tmdb.org/t/p/w154/`; 
    const {data, status } = useQuery(['category', url, categoryPageNumber], async () => {
        const response = await fetch(`https://api.themoviedb.org/3/${url}&page=${categoryPageNumber}&api_key=${import.meta.env.VITE_API_KEY_MOVIESTMDB}`);      
        return response.json();
    });
    
    function totalPagesCounter () {
        totalPages= data.total_pages;
        if(data.total_pages>=500) {
            totalPages = 500;
        }
        return totalPages;
    }
     
    return(
        <>
        <div id='category-wrapper' className={categoryStyles['category-wrapper']}>
            {/*LOADING */}
            {status ==='loading' && 
            <div className={categoryStyles['category-wrapper']}>
                <div >
                    <LoadingSpinner />
                </div>
            </div>
            }

            {/*MOVIES CONTAINER */}
            {status==='success'  && data.results.length>0 &&
                <>
                <div className={categoryStyles['total-pages-details']}>
                    <h3>  {data.total_results} results</h3>
                </div>
                <div className={categoryStyles['movies-container']}>
                    
                    {data.results.map( (movie:Results) => (
                        <Link
                            reloadDocument  
                            to={`/${categoryType}/${movie.id}`} 
                            key={movie.id} 
                            className={categoryStyles['movie-container']}
                        >
                            <div className={categoryStyles['movie-image-container']}>
                                {movie.poster_path==null ? (
                                    <img loading='lazy' className={`${categoryStyles['placeholder-image']} ${categoryStyles['movie-image']}`} src='/images/placeholder-image.svg' alt="placeholder image" />     
                                ):(
                                    <img loading='lazy' className={categoryStyles['movie-image']} src={`${imagePathWidth154}${movie.poster_path}`} alt='movie image' />     
                                )
                                }
                            </div>
                            <div className={categoryStyles['movie-details']}>
                            <h3 className={categoryStyles['movie-title']}>{movie.title || movie.name || movie.original_title || movie.original_name || 'Name not found'}</h3>
                                <p className={categoryStyles['movie-overview']}>{movie.overview===''? 'no summary available': movie.overview}</p>
                                <div className={categoryStyles['movie-ratings']}>
                                    <h3>{movie.vote_average.toFixed(1)}</h3>
                                    <div><StarIcon/></div>
                                    <span>{`(${movie.vote_count})`}</span>
                                </div>
                            </div>
                        </Link>    
                    ))}
                </div>
                       
                {/* CATEGORY PAGES NAVIGATION */}
                <div className={categoryStyles['pages-container']}>
                    <div className={categoryStyles['pages-nav-buttons']}>

                        
                        <AnchorLink 
                                href='#category-wrapper' 
                                offset={300}
                                title='First page'
                                onClick={()=> setCategoryPageNumber(1)}
                            >
                                <ChevronDoubleLeftIcon/>
                        </AnchorLink>

                        <AnchorLink  
                            href='#category-wrapper' 
                            offset={300}
                            title='Previous page'                
                            onClick={()=> {
                                if(data.page<=1)return;
                                setCategoryPageNumber(data.page-1);
                                }
                            }  
                            >
                                <ChevronLeftIcon/>
                        </AnchorLink>

                        <span>{`${data.page}/${totalPagesCounter()}`}</span>

                        <AnchorLink  
                            href='#category-wrapper' 
                            offset={300}
                            title='Next page'   
                            onClick={()=> {
                                if(data.page>=totalPagesCounter())return;
                                setCategoryPageNumber(data.page+1)
                            }}
                            >
                                <ChevronRightIcon/>
                        </AnchorLink>

                        <AnchorLink  
                            href='#category-wrapper' 
                            offset={300}                             
                            title='Last page'   
                            onClick={()=> {  
                                if(data.page>=totalPagesCounter())return;
                                setCategoryPageNumber(totalPagesCounter());
                                }
                            }
                            >
                                <ChevronDoubleRightIcon/>
                        </AnchorLink>

                    </div>
                </div>
                </>
            }

            {/*ERROR */}
            { status ==='error' &&
                <div className={categoryStyles['no-results-container']}>
                    <h3> Error fetching data </h3>
                </div>    
            }
            
            {/*NO RESULTS */}
            {status==='success' && data.results.length===0 &&
                <div className={categoryStyles['no-results-container']}>
                    <h3>NO RESULTS</h3>
                </div>    
            }
        </div>
        </>

    )
}
export default Category;