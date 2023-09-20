import {useState, useEffect} from 'react';
//STYLES
import sidebarStyles from '../../styles/sideBarStyles.module.css';
//ICONS
import { ArrowDownIcon, ArrowUpIcon} from '@heroicons/react/20/solid';
//ENUMS
import { SidebarCategories } from '../../enums/sidebarCategories';
import { useApi } from '../../hooks/useApi';
import { useGenreListApi } from '../../hooks/useGenreListApi';
type Genre = {
    id: number, 
    name: string
}
type GenresListProps = {
    type: 'movie' | 'tv' | string;
    selectedGenreId: number;
    isClosed: boolean;
    sidebarCategorySelected: SidebarCategories;
    setIsClosed: (value:boolean) => void;
    setSelectedGenreName: (value: string) => void;
    setSelectedGenreId: (value: number) => void;
    setSidebarCategorySelected: (value: SidebarCategories)=> void;
}
const GenresList = ({ type,  isClosed, setIsClosed, selectedGenreId, setSelectedGenreId, setSelectedGenreName, sidebarCategorySelected,setSidebarCategorySelected }:GenresListProps) => {
     
      const{ data:genresList, isLoaded, error} = useGenreListApi(type);
      useEffect(() => {
        if( type === 'tv') {
            setSelectedGenreId(10759);
            setSelectedGenreName('ACTION & ADVENTURE');
        }
        if( type ==='movie')  {
            setSelectedGenreId(28);
            setSelectedGenreName('ACTION');
        }
      },[type]);
    return(
        <div className={sidebarStyles['genres-list-section']}>
            {isLoaded && !error && 
            <>
            <button onClick={() => setIsClosed(!isClosed)}>Genres{!isClosed?<ArrowDownIcon/>:<ArrowUpIcon/>}</button>
            <div className={` ${isClosed? sidebarStyles['hidden']: sidebarStyles['genres-list-container']}`}>
                <ul className={` ${ isClosed? sidebarStyles['hidden'] :sidebarStyles['genres-list']} `}>
                    {genresList.map((genre) => (
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