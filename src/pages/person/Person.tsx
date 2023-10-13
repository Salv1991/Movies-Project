import { useParams } from "react-router-dom";
import { useQuery } from 'react-query';
//STYLES
import mediaStyles from '../media/movieStyles.module.css';

//COMPONENTS
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";

//TYPES
type PersonProps = {
   
}
type Genre = {
    id: number;
    name: string;
}

const Person = ({}:PersonProps) => {
    let categoryPageNumber = 1;
    const {id} = useParams();
    let url = `person/${id}`;
    const imagePathWidth500 = `https://image.tmdb.org/t/p/w500/`;
    
/*     const{ data, isLoaded, error} = useApiSearchById(`person/${id}`);
 */    const {data, status } = useQuery(['person', url, categoryPageNumber], async () => {
        const response = await fetch(`https://api.themoviedb.org/3/${url}?language=en-US&api_key=${import.meta.env.VITE_API_KEY_MOVIESTMDB}`)  
    
        return response.json();
    });     
    console.log("PERSON",data);
    return (
        <section className={mediaStyles['movie-page-section']}>
            {status==='loading' && 
                <div className={mediaStyles['movie-container']}>
                    <div >
                        <LoadingSpinner />
                    </div>
                </div>
            }
            {status==='success' &&
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
                                        {data.genres?.map((genre:Genre) => (
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