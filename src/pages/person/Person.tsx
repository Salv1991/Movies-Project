import { useParams } from "react-router-dom";
//STYLES
import mediaStyles from '../media/movieStyles.module.css';

//HOOKS
import { useApiSearchById } from "../../hooks/useApi";

//COMPONENTS
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";

//TYPES
type PersonProps = {
   
}
const Person = ({}:PersonProps) => {
    const {id} = useParams();
    const imagePathWidth500 = `https://image.tmdb.org/t/p/w500/`;
    
    const{ data, isLoaded, error} = useApiSearchById(`person/${id}`);

    return (
        <section className={mediaStyles['movie-page-section']}>
            {!isLoaded  && !error && 
                <div className={mediaStyles['movie-container']}>
                    <div >
                        <LoadingSpinner />
                    </div>
                </div>
            }
            {data && isLoaded &&
                <div className={mediaStyles['movie-container']}>

                    {/* LEFT SIDE */}
                    <div className={mediaStyles['left']}>
                        <div className={mediaStyles['image-container']}>
                            <img src={`${imagePathWidth500}${data.profile_path}`} alt="" /> 
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div className={mediaStyles['right']}>
                        <div className={mediaStyles['title-and-details-container']}>
                            <div>

                                {/* TITLE CONTAINER */}
                                <div className={mediaStyles['title-container']}>
                                    <h1 className={mediaStyles['movie-title']}>{data.original_title ||data.name}</h1>
                                </div>

                                {/* DETAILS CONTAINER */}
                                <div className={mediaStyles['movie-details-container']}>
                                    <h2 className={mediaStyles['detail']}> 
                                    <div  className={mediaStyles['genres-container']}>
                                        {data.genres?.map((genre) => (
                                            <p key={data.id} className={mediaStyles['genre']} >{genre.name}</p>
                                        ))}
                                    </div>
                                    </h2>
                                    <h2 className={mediaStyles['detail']}><span>Birthday:{data.birthday}</span></h2>
                               </div>
                            </div>    
                        </div>
                       
                        <div className={`${mediaStyles['movie-overview-container']}`}>
                            <p>{data.biography}</p>
                        </div>   
                        <div className={`${mediaStyles['rating-container']} ${data.vote_average<=6?mediaStyles['red-rating']:''}${data.vote_average>6?mediaStyles['orange-rating']:''} ${data.vote_average>=8?mediaStyles['green-rating']:''}`}>
                            <h3 className={mediaStyles['rating']}>{data.vote_average?.toFixed(1)}</h3>
                        </div>  
                    </div> 
                </div>  
            }
            
           
        </section>
    )
}
export default Person;