import { useSelector } from 'react-redux'
import './styles.css'

const NotesContainer = ({ children }) => {
    const isGridView = useSelector(state => state.modals.gridView)
    return (
        <div className={`notesContainer ${isGridView ? 'gridView' : ''} notesContainerAddOn mb-2 position-relative`}>
            {children}
        </div>
    )
}

export default NotesContainer