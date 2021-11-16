import axios from "axios"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toggleUpdateProfileModal } from "../../redux/slices/modalSlice"
import DimBackground from "../Dimbackground/DimBackground"
import Input from "../Input/Input"
import Response from "../Response/Response"
import './styles.css'

const UpdateProfile = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const isVisible = useSelector(state => state.modals.updateProfileModal)
    // const [name, setName] = useState('')
    // const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [response, setResponse] = useState({ isVisible: false, text: '', success: false })

    const onChange = e => {
        let value = e.target.value
        switch (e.target.name) {
            case 'password': setPassword(value)
                break
            case 'old-password': setOldPassword(value)
                break
            default: console.log("Something went wrong")
        }
    }

    const onSubmit = () => {
        let data = {
            oldPassword: oldPassword,
            password: password
        }
        axios.post(`https://quicknotes-backend.herokuapp.com/api/users/updateProfile/${user.id}`, data)
            .then(res => {
                handleResponse(res)
            })
            .catch(error => handleResponse(error.response.data))
    }

    const handleResponse = (res) => {
        let notification = {
            isVisible: true,
            text: res,
            success: true
        }
        if (res.status !== 200)
            notification.success = false
        setResponse(notification)
        setTimeout(() => setResponse({ ...notification, isVisible: false }), 3000)
    }

    // useEffect(() => {
    //     if (name === '') {
    //         setName(user.name)
    //         setEmail(user.email)
    //     } else {
    //         setName(name)
    //         setEmail(email)
    //     }
    // }, [user, name, email])

    return (
        <DimBackground isChildVisible={isVisible} toggleChild={toggleUpdateProfileModal} >
            <div className={`updateProfileContainer ${isVisible ? 'visible' : ''} container position-absolute rounded-lg shadow p-2 pb-5`}>
                <div className="d-flex">
                    <h2 className="mt-4 ml-4">Update profile</h2>
                    <div className="actionBar flex-fill text-right">
                        <i className="fa fa-check-circle p-2 m-1 rounded-circle" onClick={onSubmit}></i>
                        <i className="fa fa-times rounded-circle" onClick={() => dispatch(toggleUpdateProfileModal())}></i>
                    </div>
                </div>
                <form className="updateProfileForm my-3 mx-4 d-flex flex-column">
                    {/* <Input name="name" placeholder="Enter new name..." value={name} onChange={onChange} type="text"></Input>
                    <Input name="email" placeholder="Enter new email..." value={email} onChange={onChange} type="email"></Input> */}
                    <Input name="old-password" placeholder="Enter old password..." value={oldPassword} onChange={onChange} type="password"></Input>
                    <Input name="password" placeholder="Enter new password..." value={password} onChange={onChange} type="password"></Input>
                </form>
                <Response response={response} />
            </div>
        </DimBackground>
    )
}

export default UpdateProfile