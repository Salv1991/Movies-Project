//STYLES
import sidebarStyles from '../../styles/sideBarStyles.module.css';
//ICONS
import { ArrowDownIcon, ArrowRightIcon} from '@heroicons/react/20/solid';

type Genre = {
    id: number;
    name: string;
}
type GenresListProps = {
    genresSelected: Genre[];
    setGenresSelected: (value:Genre[])=> void;
    genresList: any;
    isLoaded:boolean;
    error: any;
    isClosed: boolean;
    setIsClosed: (value:boolean) => void;
}
const GenresList = ({genresSelected, setGenresSelected, genresList, isLoaded, error, isClosed, setIsClosed   }:GenresListProps) => {
    const handleGenreSelection = (genre:Genre) => {
        if(genresSelected.includes(genre)){
            setGenresSelected(genresSelected.filter((genreInList)=> genreInList!==genre ))
        }else{
            setGenresSelected([...genresSelected, genre]);
        }
        console.log("GENRE LIST", genresSelected);
    }; 
    return(
        <div className={sidebarStyles['genres-list-section']}>
            {isLoaded && !error && 
            <>
            <button onClick={() => setIsClosed(!isClosed)}>Genres{!isClosed?<ArrowDownIcon/>:<ArrowRightIcon/>}</button>
            <div className={` ${isClosed? sidebarStyles['hidden']: sidebarStyles['genres-list-container']}`}>
                <ul className={` ${ isClosed? sidebarStyles['hidden'] :sidebarStyles['genres-list']} `}>
                    {genresList.map((genre:Genre) => (
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
            {!isLoaded  || error && 
                <div> Error</div>
            }       
        </div>
    )
}
export default GenresList;