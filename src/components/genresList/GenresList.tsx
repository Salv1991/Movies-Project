//STYLES
import sidebarStyles from '../../styles/sideBarStyles.module.css';
//ICONS
import { ArrowDownIcon, ArrowRightIcon} from '@heroicons/react/20/solid';
//ENUMS
import { SidebarCategories } from '../../enums/sidebarCategories';

type GenresListProps = {
    genresList: any;
    isLoaded:boolean;
    error: any;
    selectedGenreId: number;
    isClosed: boolean;
    sidebarCategorySelected: SidebarCategories;
    setIsClosed: (value:boolean) => void;
    setSelectedGenreName: (value: string) => void;
    setSelectedGenreId: (value: number) => void;
    setSidebarCategorySelected: (value: SidebarCategories)=> void;
}
const GenresList = ({ genresList, isLoaded, error, isClosed, setIsClosed, selectedGenreId, setSelectedGenreId, setSelectedGenreName, sidebarCategorySelected,setSidebarCategorySelected }:GenresListProps) => {
  
    return(
        <div className={sidebarStyles['genres-list-section']}>
            {isLoaded && !error && 
            <>
            <button onClick={() => setIsClosed(!isClosed)}>Genres{!isClosed?<ArrowDownIcon/>:<ArrowRightIcon/>}</button>
            <div className={` ${isClosed? sidebarStyles['hidden']: sidebarStyles['genres-list-container']}`}>
                <ul className={` ${ isClosed? sidebarStyles['hidden'] :sidebarStyles['genres-list']} `}>
                    {genresList.map((genre:{id:number, name:string}) => (
                        <li 
                            key={genre.id} 
                            onClick={() => {
                                setSelectedGenreId(genre.id);
                                setSelectedGenreName(genre.name);
                                setSidebarCategorySelected(SidebarCategories.None);
                            }}  
                            className={`${sidebarStyles['genre-li']} ${genre.id===selectedGenreId &&sidebarCategorySelected===SidebarCategories.None? sidebarStyles['isActive']:''}`}
                        >
                            <h3>{genre.name}</h3>
                        </li>    
                    ))}    
                </ul>
            </div>    
            </>
            }        
        </div>
    )
}
export default GenresList;