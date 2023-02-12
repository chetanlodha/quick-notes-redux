import axios from 'axios'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../components/Input/Input'
import Button from '../components/Button/Button'
import './authenticationStyles.css'
import { addUser } from '../redux/slices/userSlice'
import { useState } from 'react'

const Login = ({ history }) => {

    if (localStorage.getItem('user'))
        history.push('/')

    const dispatch = useDispatch()
    // eslint-disable-next-line
    const userState = useSelector(state => state.user)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = e => {
        e.preventDefault()
        axios.post('https://quick-notes-backend.onrender.com/api/users/login', {
            email: email,
            password: password
        })
            .then(response => {
                if (!response.data.token) {
                    alert("Incorrect email or password")
                    return
                }
                const user = JSON.stringify(response.data)
                localStorage.setItem('user', user)
                dispatch(addUser(response.data))
            })
            .catch(error => console.log(error.response.data))
    }

    const onChange = e => {
        let value = e.target.value
        if (e.target.name === 'email')
            setEmail(value)
        else
            setPassword(value)
    }

    return (
        <div className="authentication d-flex flex-column justify-content-center align-items-center pt-1 pb-3">
            <h1 className="text-center mt-2 mb-3">Quick Notes</h1>
            <div className="form-container rounded-lg shadow col-11 col-md-6 col-offset-md-6 col-lg-4 col-lg-offset-4 p-3 p-md-4">
                <hr className="mt-0 ml-2 w-25 mx-auto" />
                <h2 className="text-center mb-3">Login</h2>
                <hr className="mt-0 ml-2 w-25 mx-auto" />
                <form className="d-flex flex-column justify-content-center align-items-center mt-2 px-2" method="POST" onSubmit={handleLogin}>
                    <Input name="email" type="email" placeholder="Email..." value={email} onChange={onChange} showLabel={true} />
                    <Input name="password" type="password" placeholder="Password..." value={password} onChange={onChange} showLabel={true} />
                    <Button class="mt-2" value="Submit" />
                </form>
                <h6 className="alternate-action d-flex justify-content-center align-items-center mt-3">
                    Don't have an account?
                        <Link className="ml-1" to="/register">Create now.</Link>
                </h6>
            </div>
        </div>
    )
}

export default Login