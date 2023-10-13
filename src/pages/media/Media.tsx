import { useParams } from "react-router-dom";
import {useEffect} from 'react';
import { useQuery } from "react-query";

//ICONS
import { CalendarIcon, ClockIcon } from "@heroicons/react/20/solid";

//STYLES
import mediaStyles from './movieStyles.module.css';

//COMPONENTS
import Category from "../../components/category/Category";
import { CategoryContainer } from "../../components/categoryContainer/CategoryContainer";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";

//ENUMS
import { CategoryType } from "../../enums/categoryType";
import { Pages } from "../../enums/pages";

//TYPES
type MediaProps = {
    mediaType:string;
    childType: CategoryType;
    setSelectedPage: (value:Pages)=> void;
    categoryPageNumber: number;
    setCategoryPageNumber: (value:number) => void;
}
type Genre = {
    id: number;
    name: string;
}

const Media = ({categoryPageNumber, setCategoryPageNumber, setSelectedPage, childType, mediaType}:MediaProps) => {
    const {id} = useParams();
    const url = `${mediaType}/${id}`;
    const imagePathWidth500 = `https://image.tmdb.org/t/p/w500/`;
    const imagePathWidth1280 = `https://image.tmdb.org/t/p/w1280/`;
    const {data, status } = useQuery(['category', url], async () => {
        const response = await fetch(`https://api.themoviedb.org/3/${url}?language=en-US&api_key=${import.meta.env.VITE_API_KEY_MOVIESTMDB}`);      
        return response.json();
    });
    console.log("DATA FROM QUERY MEDIA", data)
    useEffect( () => {
        if(childType === CategoryType.Movie){
            setSelectedPage(Pages.Movies)
        }
        if(childType === CategoryType.Series){
            setSelectedPage(Pages.TVSeries)

        }
    })
    return (
        <section className={mediaStyles['movie-page-section']}>
            {status==='loading'  &&  
                <div >
                    <LoadingSpinner />
                </div>
            }
           
            { status==='success' && data &&
                <div className={mediaStyles['movie-container']}>
                    <img loading='lazy' src={data.backdrop_path==null ? imagePathWidth1280+'/images/placeholder-backdrop.svg' : imagePathWidth1280+data.backdrop_path} alt="" />

                    {/* LEFT SIDE */}
                    <div className={mediaStyles['left']}>
                        <div className={mediaStyles['image-container']}>
                            {data.poster_path ==null? (
                                <img loading='lazy' src='/images/placeholder-image.svg' alt="placeholder img" /> 
                            ): (
                                <img loading='lazy' src={`${imagePathWidth500}${data.poster_path}`} alt={`${data.name} img`} /> 
                            )}
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className={mediaStyles['right']}>
                        <div className={mediaStyles['title-and-details-container']}>
                            <div>

                                {/* TITLE CONTAINER */}
                                <div className={mediaStyles['title-container']}>
                                    <h1 className={mediaStyles['movie-title']}>{ data.title || data.original_title || data.name}</h1>
                                </div>

                                {/* DETAILS CONTAINER */}
                                <div className={mediaStyles['movie-details-container']}>
                                        <div  className={mediaStyles['genres-container']}>
                                            {data.genres?.map((genre:Genre) => (
                                                <p key={genre.id} className={mediaStyles['genre']} >{genre.name}</p>
                                            ))}
                                        </div>
                                    {data.release_date &&
                                        <>
                                        <h2 className={mediaStyles['detail']}><CalendarIcon/><span>{data.release_date}</span></h2>
                                        <div className={mediaStyles['divider']}></div>
                                        </> 
                                    }
                                    {data.first_air_date &&
                                        <>
                                        <h2 className={mediaStyles['detail']}><CalendarIcon/><span>{data.first_air_date}</span></h2>
                                        <div className={mediaStyles['divider']}></div>
                                        </> 
                                    }
                                    {data.runtime && 
                                        <h2 className={mediaStyles['detail']}>
                                            <ClockIcon/>
                                            <span>{data.runtime}min</span>
                                        </h2>
                                    }
                                    {data.episode_run_time &&
                                        <h2 className={mediaStyles['detail']}>
                                            <ClockIcon/>
                                            <span>{data.episode_run_time[0]}min</span>
                                        </h2>
                                    }
                                    </div>
                            </div>
                            
                        </div>
                       
                        <div className={`${mediaStyles['movie-overview-container']}`}>
                            <p>{data.overview}</p>
                        </div>   
                        <div className={`${mediaStyles['rating-container']} ${data.vote_average<=6?mediaStyles['red-rating']:''}${data.vote_average>6?mediaStyles['orange-rating']:''} ${data.vote_average>=8?mediaStyles['green-rating']:''}`}>
                                <h3 className={mediaStyles['rating']}>{data.vote_average?.toFixed(1)}</h3>
                        </div>  
                    </div> 
                </div>  
            }
            {/* SIMILAR MOVIES SECTION */}
            <div>
                <CategoryContainer header="SIMILAR TO THIS">
                    <Category categoryPageNumber={categoryPageNumber} setCategoryPageNumber={setCategoryPageNumber} url={`${mediaType}/${id}/similar?language=en-US`}  categoryType={childType} />
                </CategoryContainer> 
            </div>
        </section>
    )
}
export default Media;