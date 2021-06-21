import React from 'react'

const IconButton = ({ action = null, className }) => {
    if (action)
        return <i className={className} onClick={action}></i>
    else
        return <i className={className}></i>

}

export default IconButton