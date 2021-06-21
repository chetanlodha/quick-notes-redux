import React, { useRef } from 'react'
import './styles.css'

const LabelsContainer = ({ children, className }) => {

    const labelsRef = useRef(null)

    return (
        <div className={className} ref={labelsRef} >
            {children}
        </div>
    )
}

export default LabelsContainer