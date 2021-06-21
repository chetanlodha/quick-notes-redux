import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../../redux/slices/userSlice'
import { toggleGridView, toggleUpdateProfileModal } from '../../redux/slices/modalSlice'
import './styles.css'

const Navbar = ({ name, history }) => {
    const dispatch = useDispatch();
    let isGridViewEnabled = useSelector(state => state.modals.gridView)
    const [profileDropdownVisibility, setProfileDropdownVisibility] = useState(false)

    const onLogout = () => {
        localStorage.removeItem('user');
        dispatch(removeUser())
    }

    const handleGrid = () => {
        if (isGridViewEnabled)
            localStorage.setItem('view', 'list')
        else
            localStorage.setItem('view', 'grid')
        dispatch(toggleGridView())
    }

    useEffect(() => {
        let view = localStorage['view']
        if (view === 'grid')
            dispatch(toggleGridView())
    }, [dispatch])

    return (
        <nav className="navbar navbar-light container">
            <h3 className="mb-0">Quick Notes</h3>

            <ul className="navbar-nav d-flex flex-row align-items-center ml-auto">
                <li className="mr-2">
                    <i className={`fa fa-columns toggleGridView ${isGridViewEnabled ? 'active' : ''} p-2 rounded-circle`} aria-hidden="true"
                        onClick={handleGrid}></i>
                </li>
                <li className="profileCardContainer nav-item" onClick={() => setProfileDropdownVisibility(!profileDropdownVisibility)}>
                    <div className="position-relative d-flex align-items-center p-1 h-100">
                        <span className="userLetter rounded-circle d-flex justify-content-center align-items-center">{name.charAt(0)}</span>
                        <div className={`profile-card ${profileDropdownVisibility ? 'visible' : ''} position-absolute rounded-lg`}>
                            <div className="d-flex align-items-center px-3 pt-3" onClick={() => {
                                setTimeout(() => setProfileDropdownVisibility(!profileDropdownVisibility), 500)
                                dispatch(toggleUpdateProfileModal())
                            }}>
                                <i className="fa fa-user pr-3"></i>
                                Update Profile
                            </div>
                            <div className="d-flex align-items-center px-3 py-3" onClick={onLogout}>
                                <i className="fa fa-sign-out pr-3"></i>
                                Logout
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </nav >
    )
}

export default Navbar