import { useState } from 'react'
import LoadingIcon from '../LoadingIcon/LoadingIcon'
import './styles.css'

const NoteImage = ({ image }) => {
    const [isLoaded, setLoaded] = useState(false)
    let url = `https://quick-notes-backend.onrender.com`
    return (
        <div className={`${!isLoaded ? '' : 'm-1'}`}>
            <img className={`image rounded-lg ${!isLoaded ? 'd-none' : ''}`}
                src={`${url}/public/uploads/${image}`}
                data-src={`${url}/public/uploads/${image}`}
                alt="Images attached to note"
                onLoad={() => setLoaded(!isLoaded)} />
            {
                !isLoaded ?
                    <div className="loadingIconContainer d-flex justify-content-center align-items-center rounded-lg py-5 px-4 m-1">
                        <LoadingIcon />
                    </div>
                    : ''
            }
        </div>
    )
}

export default NoteImage