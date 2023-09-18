import Navbar from '../components/navbar/Navbar';
import { Outlet } from "react-router-dom";
import sidebarStyles from '../../styles/sideBarStyles.module.css';
type RootLayout = {
   
}
const RootLayout = ({}:RootLayout) => {
    return(
        <>
            <Navbar />
            <main >      
                <Outlet />
            </main>
        </>

    )
}
export default RootLayout;