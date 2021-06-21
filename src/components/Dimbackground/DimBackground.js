import './styles.css'
import { useDispatch } from 'react-redux'

const DimBackground = ({ children, isChildVisible, toggleChild }) => {

    const dispatch = useDispatch()

    const handleVisibility = (e) => {
        if (!e.target.className.includes('dimBackground'))
            return
        if (children.props.hasOwnProperty('className') && children.props.className.includes('updateNoteContainer'))
            toggleChild()
        else
            dispatch(toggleChild())
    }

    return (
        <div className={`dimBackground ${isChildVisible ? 'visible' : ''}`} onClick={handleVisibility}>
            {children}
        </div>
    )
}

export default DimBackground