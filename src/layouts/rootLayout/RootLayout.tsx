import Navbar from '../components/navbar/Navbar';
import { Outlet } from "react-router-dom";
import sidebarStyles from '../../styles/sideBarStyles.module.css';
import { Pages } from '../../enums/pages';
type RootLayout = {
    selectedPage:Pages;
}
const RootLayout = ({selectedPage}:RootLayout) => {
    return(
        <>
            <Navbar selectedPage={selectedPage} />
            <main >      
                <Outlet />
            </main>
        </>

    )
}
export default RootLayout;