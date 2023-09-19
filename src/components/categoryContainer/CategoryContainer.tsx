import { useState } from "react";
import Category from "../category/Category";
import categoryStyles from '../../styles/categoryStyles.module.css';
import { Urls } from "../../enums/Urls";
type CategoryContainerProps = {
    header: string;
    children: React.ReactNode;
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

type ButtonsAndCategoriesProps ={
    url1: Urls;
    url2: Urls;
    type1: string;
    type2: string;
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
                    <Category  url={url1} linkType={type1} />      
                }
                {indexId===2 && 
                    <Category url={url2} linkType={type2}  /> 
                }
               
            </div>
        </>
    )
}