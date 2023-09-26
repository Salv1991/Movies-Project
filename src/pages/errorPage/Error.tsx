import { useNavigate } from 'react-router-dom';
import errorStyles from './errorStyles.module.css';
const Error = () => {
    const navigate = useNavigate();
    return(
        <div className={errorStyles['error-container']}>
            <h2>ERROR</h2>
            <h3 onClick={() => navigate('/')}>Return to homepage</h3>
        </div>
    )
}

export default Error;