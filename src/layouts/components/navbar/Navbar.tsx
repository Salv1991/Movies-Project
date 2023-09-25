import { NavLink, Link } from "react-router-dom";
//STYLES
import navbarStyles from './navbarStyles.module.css';
//LOGO
import logo from '/images/logo.png';
//ENUMS
import { Pages } from "../../../enums/pages";
//TYPES
type NavbarProps = {
    selectedPage: Pages;
}

const Navbar = ({selectedPage}:NavbarProps) => {
    return(
        <nav className={navbarStyles.navbar}>
            <div className={navbarStyles['navbar-container']}>
                <Link to={'/'}>
                    <div className={navbarStyles['logo-container']}>
                        <img className={navbarStyles.logo} src={logo} alt="" />
                    </div>
                </Link>
                <div className={navbarStyles['links-container']}>    
                    <NavLink to={'/'} className={`${navbarStyles['link']} ${selectedPage===Pages.Homepage? navbarStyles['selectedPage']: ''}`}>
                        <h2>HOME</h2>
                    </NavLink>
                    <NavLink to={'/movies'} className={`${navbarStyles['link']} ${selectedPage===Pages.Movies? navbarStyles['selectedPage']: ''}`}>
                        <h2>MOVIES</h2>
                    </NavLink>
                    <NavLink to={'/series'}  className={`${navbarStyles['link']} ${selectedPage===Pages.TVSeries? navbarStyles['selectedPage']: ''}`}>
                        <h2>TV SERIES</h2>
                    </NavLink>
                </div>
            </div>
        </nav>   
    )
}
export default Navbar;