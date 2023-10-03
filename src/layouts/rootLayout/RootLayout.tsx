//COMPONENTS
import Navbar from '../components/navbar/Navbar';

//OUTLET
import { Outlet } from "react-router-dom";

//ENUMS
import { Pages } from '../../enums/pages';

//TYPES
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