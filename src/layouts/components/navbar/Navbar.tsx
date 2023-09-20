import { NavLink, Link } from "react-router-dom";
import navbarStyles from './navbarStyles.module.css';
import logo from '/images/logo.png';

const Navbar = () => {
    return(
        <nav className={navbarStyles.navbar}>
            <div className={navbarStyles['navbar-container']}>
                <Link to={'/'}>
                    <div className={navbarStyles['logo-container']}>
                        <img className={navbarStyles.logo} src={logo} alt="" />
                    </div>
                </Link>
                <ul className={navbarStyles['navbar-ul']}>    
                <NavLink to={'/browse'} className={navbarStyles['navbar-li']}>
                    <h2>BROWSE</h2>
                </NavLink>
                <NavLink to={'/movies'} className={navbarStyles['navbar-li']}>
                    <h2>MOVIES</h2>
                </NavLink>
                <NavLink to={'/series'}  className={navbarStyles['navbar-li']}>
                    <h2>TV SERIES</h2>
                </NavLink>
                </ul>
            </div>
        </nav>   
    )
}
export default Navbar;