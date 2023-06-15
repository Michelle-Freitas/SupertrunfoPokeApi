import './styles.css'
import loading from '../../assets/loading.svg'

export function Loading({customClass}){
    return (
        <div className={`loader-container ${customClass}`}>
            <img className="loader" src={loading} alt="loading" />
        </div>
    )
}
