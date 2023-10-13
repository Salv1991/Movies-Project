//STYLES
import sidebarStyles from '../../styles/sideBarStyles.module.css';

//ICONS
import { ArrowDownIcon, ArrowRightIcon} from '@heroicons/react/20/solid';

//TYPES
type Genre = {
    id: number;
    name: string;
}
type GenresListProps = {
    setCategoryPageNumber: (value:number) => void;
    genresSelected: Genre[];
    setGenresSelected: (value:Genre[])=> void;
    genreData: {genres:Genre[]};
    status: "idle" | "error" | "loading" | "success";
    isClosed: boolean;
    setIsClosed: (value:boolean) => void;
}

const GenresList = ({setCategoryPageNumber, genresSelected, setGenresSelected, genreData, status, isClosed, setIsClosed   }:GenresListProps) => {
    const handleGenreSelection = (genre:Genre) => {
        if(genresSelected.includes(genre)){
            setGenresSelected(genresSelected.filter((genreInList)=> genreInList!==genre ))
            setCategoryPageNumber(1);
        }else{
            setGenresSelected([...genresSelected, genre]);
            setCategoryPageNumber(1);
        }
    }; 
    return(
        <div className={sidebarStyles['genres-list-section']}>
            {status==='success'  && 
            <>
            <button onClick={() => setIsClosed(!isClosed)}>Genres{!isClosed?<ArrowDownIcon/>:<ArrowRightIcon/>}</button>
            <div className={` ${isClosed? sidebarStyles['hidden']: sidebarStyles['genres-list-container']}`}>
                <ul className={` ${ isClosed? sidebarStyles['hidden'] :sidebarStyles['genres-list']} `}>
                    {genreData.genres.map((genre:Genre) => (
                        <li 
                            key={genre.id} 
                            onClick={() => {
                                handleGenreSelection(genre);
                            }}  
                            className={`${sidebarStyles['genre-li']} ${genresSelected.includes(genre)? sidebarStyles['isActive']:''}`}
                        >
                            <h3>{genre.name}</h3>
                        </li>    
                    ))}    
                </ul>
            </div>    
            </>
            }
            {status==='error' && 
                <div> Error</div>
            }       
        </div>
    )
}
export default GenresList;