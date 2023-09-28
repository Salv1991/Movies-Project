import {  useState, useEffect} from 'react';
//STYLES
import sidebarStyles from '../../styles/sideBarStyles.module.css';
//ENUMS
import { CategoryType } from '../../enums/categoryType';
import { Pages } from '../../enums/pages';
import { MediaType } from '../../enums/mediaType';
//HOOKS
import { useGenreListApi } from '../../hooks/useGenreListApi';
//COMPONENTS
import FiltersBar from '../../components/filtersBar/FiltersBar';
import Category from '../../components/category/Category';
import { CategoryContainer } from '../../components/categoryContainer/CategoryContainer';
import GenresList from '../../components/genresList/GenresList';
import Sidebar from '../../components/sidebar/Sidebar';

//TYPES
type Genre = {
    id: number;
    name: string;
}
type SeriesProps = {
    setSelectedPage: (value:Pages) => void;
    isAboveMediumScreens:boolean;
    categoryPageNumber: number;
    setCategoryPageNumber: (value:number) => void;
}


const Series = ({categoryPageNumber, setCategoryPageNumber, setSelectedPage, isAboveMediumScreens }:SeriesProps) => {
    let ids = '&with_genres=';
    const[includeAdult, setIncludeAdult] = useState<boolean>(false);
    const [isClosed, setIsClosed]  = useState<boolean>(false);
    const{ data:genresList, isLoaded, error} = useGenreListApi(MediaType.TV);
    const [sortByDescendedOrder, setSortByDescendedOrder] = useState<boolean>(true);
    const [sortByQuery, setSortByQuery] = useState<string>('popularity');   
    const [genresSelected, setGenresSelected] = useState<Genre[]>([]);
    const [ filteredUrl, setFilteredUrl] = useState(`discover/tv?include_video=false&language=en-US&page=${categoryPageNumber}&include_adult=${includeAdult}&sort_by=${sortByQuery}.${sortByDescendedOrder?'desc':'asc'}${genresSelected.length===0?'':ids.slice(0,-1)}`);
  
    useEffect(() => {
        setSelectedPage(Pages.TVSeries);
        setCategoryPageNumber(1);
        window.scrollTo(0, 0)
    },[]);
    useEffect(() => {
        genresSelected.forEach(genre => {
            ids+=genre.id+',';
        })
        setFilteredUrl(`discover/tv?include_video=false&language=en-US&page=${categoryPageNumber}&include_adult=${includeAdult}&sort_by=${sortByQuery}.${sortByDescendedOrder?'desc':'asc'}${genresSelected.length===0?'':ids.slice(0,-1)}`);
    },[sortByDescendedOrder, sortByQuery, genresSelected, includeAdult]);
    
    return (
        <section className={` ${isAboveMediumScreens? sidebarStyles['page-content-with-sidebar'] : sidebarStyles['repsonsive-content']}`}>
        <div className={sidebarStyles.content}>

            {/* SIDEBAR */}
                <Sidebar isAboveMediumScreens={isAboveMediumScreens} >              
                    <GenresList 
                        setCategoryPageNumber={setCategoryPageNumber}
                        genresSelected= {genresSelected}
                        setGenresSelected= {setGenresSelected}
                        isLoaded={isLoaded}
                        error={error}
                        genresList={genresList}
                        isClosed={isClosed} 
                        setIsClosed={setIsClosed} 
                   />
                </Sidebar>

            {/* MAIN CONTENT */}
                <h1 className={sidebarStyles['content-page-header']}>TV SERIES</h1>
                    <CategoryContainer header={''}>

                       {/* FILTER BAR */}
                        <FiltersBar 
                            sortByDescendedOrder={sortByDescendedOrder} 
                            setSortByQuery={setSortByQuery} 
                            setSortByDescendedOrder={setSortByDescendedOrder} 
                            genresSelected={genresSelected} 
                            setGenresSelected= {setGenresSelected}
                            includeAdult={includeAdult} 
                            setIncludeAdult={setIncludeAdult}
                        />

                        {/* FILTERED MOVIES */}
                        <Category
                            categoryPageNumber={categoryPageNumber}
                            setCategoryPageNumber={setCategoryPageNumber}
                            url={filteredUrl} 
                            categoryType={CategoryType.Series} 
                        />   

                    </CategoryContainer>
            </div>
        </section> 
    )
};

export default Series;