import { useState } from 'react';
//STYLES
import sidebarStyles from '../../styles/sideBarStyles.module.css';

//ICONS
import { Bars3BottomRightIcon } from '@heroicons/react/20/solid';

//TYPES
type SidebarProps = {
   
    children: React.ReactNode;
    isAboveMediumScreens: boolean;
}


const Sidebar = ({children, isAboveMediumScreens}:SidebarProps) => {
    const [isOpen, setIsOpen] = useState(false);
    return(
        <>
        {isAboveMediumScreens || isOpen?(
        <aside  className={sidebarStyles['sidebar-menu']}>
            {!isAboveMediumScreens && isOpen && 
                <button onClick={()=>setIsOpen(!isOpen) } className={sidebarStyles['sidebar-hamburger-icon-container']}>
                    <Bars3BottomRightIcon/>
                </button>
            }
            {children}
        </aside>
            ):(
            <button onClick={()=>setIsOpen(!isOpen) } className={sidebarStyles['sidebar-hamburger-icon-container']}>
                <Bars3BottomRightIcon/>
            </button>
            )}
        </>
    )
}
export default Sidebar;