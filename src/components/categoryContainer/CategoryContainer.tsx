import { useState } from "react";
//COMPONENTS
import Category from "../category/Category";
//STYLES
import categoryStyles from '../../styles/categoryStyles.module.css';
//ENUMS 
import { CategoryType } from "../../enums/categoryType";
import { UrlsPresets } from "../../enums/urlPresets.ts";
//TYPES
type CategoryContainerProps = {
    header: string;
    children: React.ReactNode;
}
type ButtonsAndCategoriesProps ={
    url1: UrlsPresets;
    url2: UrlsPresets;
    type1: CategoryType | "movie" | "series";
    type2: CategoryType | "movie" | "series";
    setCategoryPageNumber: (value:number) => void;
    categoryPageNumber: number;
}


export const CategoryContainer = ({children, header,}:CategoryContainerProps) => {
    return(
        <div className={categoryStyles['category-container']}>
            <div  className={categoryStyles['header-container']}>
                <h2>{header}</h2>
            </div>
            {children}
        </div>
    )
}


export const ButtonsAndCategories = ({url1, url2, type1, type2 , categoryPageNumber, setCategoryPageNumber }:ButtonsAndCategoriesProps) => {
    const [indexId, setIndexId] = useState<number>(1);
    return(
        <>
            <div className={categoryStyles['buttons-container']}>
                <button 
                    className={`${categoryStyles['button']} ${indexId===1? categoryStyles['isSelected'] : ''}`}  
                    onClick={() => {
                        setIndexId(1)
                        setCategoryPageNumber(1);
                    }}
                >
                    Movies
                </button>
                <button 
                    className={`${categoryStyles['button']} ${indexId===2? categoryStyles['isSelected'] : ''}`} 
                    onClick={() => {
                        setIndexId(2)
                        setCategoryPageNumber(1);
                    }}
                >
                    Series
                </button>
            </div>
            <div>  
                {indexId===1 && 
                    <Category categoryPageNumber={categoryPageNumber} setCategoryPageNumber={setCategoryPageNumber}  url={url1} categoryType={type1} />      
                }
                {indexId===2 && 
                    <Category categoryPageNumber={categoryPageNumber} setCategoryPageNumber={setCategoryPageNumber} url={url2} categoryType={type2}  /> 
                }
               
            </div>
        </>
    )
}