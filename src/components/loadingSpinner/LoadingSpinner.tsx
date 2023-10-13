//STYLES
import loadingSpinnerStyles from './loadingSpinnerStyles.module.css';

const LoadingSpinner = () => {
    return(
        <div className={loadingSpinnerStyles["spinner-container"]}>
            <h3>Loading</h3>
            <div className={loadingSpinnerStyles["lds-roller"]}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}
export default LoadingSpinner;