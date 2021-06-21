import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleActiveLabel } from '../../redux/slices/modalSlice'
import './styles.css'

const Label = ({ inHome = false, inCreateNote = false, removeLabel, children, index }) => {

    const dispatch = useDispatch()
    const activeLabel = useSelector(state => state.modals.activeLabel)

    const handleClick = () => {
        if (activeLabel === children)
            return
        else
            dispatch(toggleActiveLabel(children))

    }

    if (inHome)
        return (<span className={`label ${activeLabel === children ? 'active' : ''} px-3 py-2 mx-1`} style={{ "--order": `${index + 1}` }}
            onClick={handleClick}>{children}</span>)

    if (!inCreateNote)
        return (<span className="label px-3 py-2 mx-1" style={{ "--order": `${index + 1}` }}>{children}</span>)

    return (
        <div className="label d-flex position-relative ml-1">
            <span className="label-text px-3 py-2">{children}</span>
            <div>
                <i className="fa fa-times m-1 rounded-circle removeLabel" onClick={removeLabel}></i>
            </div>
        </div>
    )
}

export default Label