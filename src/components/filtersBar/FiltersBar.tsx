//ICONS
import { XMarkIcon } from '@heroicons/react/20/solid';
//STYLES
import filterBarStyles from './filtersBarStyles.module.css';
//TYPES
type Genre = {
    id: number;
    name: string;
}
type FiltersBarProps = {
    sortByDescendedOrder:boolean;
    setSortByDescendedOrder: (value:boolean) => void;
    setSortByQuery: (value:string) => void;
    genresSelected: Genre[];
    setGenresSelected: (value:Genre[]) => void;
    includeAdult:boolean;
    setIncludeAdult: (value:boolean) => void;
}

const FiltersBar = ({ includeAdult, setIncludeAdult, sortByDescendedOrder, setSortByDescendedOrder, setSortByQuery, genresSelected, setGenresSelected}:FiltersBarProps) => {
    return(
        <div className={filterBarStyles['filters-container']}>
            <div className={filterBarStyles['upper-section']}>     
                <div className={filterBarStyles['sort-select-container']}>

                    {/* ASCENDED-DESCENDED ORDER */}
                    <div className={filterBarStyles['filter-button-container']}> 
                        <button className={sortByDescendedOrder? filterBarStyles['descended-button'] : filterBarStyles['ascended-button']} onClick={()=> (setSortByDescendedOrder(!sortByDescendedOrder))}>
                            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" className="ipc-icon ipc-icon--swap-vert" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M16 17.01V11c0-.55-.45-1-1-1s-1 .45-1 1v6.01h-1.79c-.45 0-.67.54-.35.85l2.79 2.78c.2.19.51.19.71 0l2.79-2.78c.32-.31.09-.85-.35-.85H16zM8.65 3.35L5.86 6.14c-.32.31-.1.85.35.85H8V13c0 .55.45 1 1 1s1-.45 1-1V6.99h1.79c.45 0 .67-.54.35-.85L9.35 3.35a.501.501 0 0 0-.7 0z"></path></svg>
                        </button>      
                    </div>

                    {/* SORT BY */}
                    <span>Sort by:</span>
                    <select onChange={(e) => setSortByQuery(e.target.value)} name="sorting">
                        <option className={filterBarStyles['option']} value="popularity">Popularity</option>
                        <option value="vote_average">Vote Average</option>
                        <option value="vote_count">Vote Count</option>
                        <option value="revenue">Revenue</option>
                    </select>
                </div>

                {/* ADULT FILTER */}
                <div className={filterBarStyles['genres-list-section']}>
                    <button className={` ${filterBarStyles['adult-filter-button']} `} onClick={() => setIncludeAdult(!includeAdult)}> Include Adult Content: <span className={`${includeAdult? filterBarStyles['adult-filter-on']:''}`}>{includeAdult? 'On' : 'Off'}</span></button>   
                </div>
            </div>

            {/* GENRE FILTER BAR */}
            {genresSelected.length>0 &&
            <div className={filterBarStyles['genre-filter-list-container']}>
                <span>Filters: </span>
                <ul>
                    {genresSelected.map((genreSelected) => (
                        <li onClick={()=> setGenresSelected(genresSelected.filter(genre => genre !==genreSelected))}>{genreSelected.name} <span><XMarkIcon/></span></li>
                    ))}        
                </ul>
            </div>
            
            }
        </div>                  
    )
}
export default FiltersBar;