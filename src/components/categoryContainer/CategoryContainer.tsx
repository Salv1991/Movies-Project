import { useState } from "react";
//COMPONENTS
import Category from "../category/Category";
//STYLES
import categoryStyles from '../../styles/categoryStyles.module.css';
//ENUMS 
import { CategoryType } from "../../enums/categoryType";
import { Urls } from "../../enums/urls.ts";
//TYPES
type CategoryContainerProps = {
    header: string;
    children: React.ReactNode;
}
type ButtonsAndCategoriesProps ={
    url1: Urls;
    url2: Urls;
    type1: CategoryType | "movie" | "series";
    type2: CategoryType | "movie" | "series";
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


export const ButtonsAndCategories = ({url1, url2, type1, type2}:ButtonsAndCategoriesProps) => {
    const [indexId, setIndexId] = useState<number>(1);
    return(
        <>
            <div className={categoryStyles['buttons-container']}>
                <button className={`${categoryStyles['button']} ${indexId===1? categoryStyles['isSelected'] : ''}`}  onClick={() => setIndexId(1)}>Movies</button>
                <button className={`${categoryStyles['button']} ${indexId===2? categoryStyles['isSelected'] : ''}`} onClick={() => setIndexId(2)}>Series</button>
            </div>
            <div>  
                {indexId===1 && 
                    <Category  url={url1} categoryType={type1} />      
                }
                {indexId===2 && 
                    <Category url={url2} categoryType={type2}  /> 
                }
               
            </div>
        </>
    )
}