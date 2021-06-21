import Button from '../components/Button/Button'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Input from '../components/Input/Input'
import './authenticationStyles.css'
import axios from 'axios'

const Register = ({ history }) => {

    if (localStorage.getItem('user'))
        history.push('/')

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const onChange = e => {
        let value = e.target.value
        switch (e.target.name) {
            case 'name': setName(value)
                break
            case 'email': setEmail(value)
                break
            case 'password': setPassword(value)
                break
            case 'confirmPassword': setConfirmPassword(value)
                break
            default: alert('Something went wrong. Please refresh the page and try again!')
        }
    }

    const onSubmit = e => {
        e.preventDefault()
        if (!name || !email || !password || !confirmPassword){
            alert('Please fill all the mandatory fields')
            return
        }
        if (password !== confirmPassword){
            alert('Password and confirm passwords must be same')
            return
        }
        if(password.length < 6){
            alert('Password must be atleast 6 characters long')
            return
        }
        let data = {
            name: name,
            email: email,
            password: password,
        }
        axios.post('https://quicknotes-backend.herokuapp.com/api/users/register', data)
            .then(res => {
                if(!res.status === 200)
                    alert(res.data)
                alert('Account created. You can now login!')
                history.push('/login')
            })
            .catch(err => alert(err.response.data))
    }

    return (
        <div className="authentication d-flex flex-column justify-content-center align-items-center pt-1 pb-3">
            <h1 className="text-center mt-2 mb-3">Quick Notes</h1>
            <div className="form-container rounded-lg shadow col-11 col-md-6 col-offset-md-6 col-lg-4 col-lg-offset-4 p-3 p-md-4">
                <hr className="mt-0 ml-2 w-25 mx-auto" />
                <h2 className="text-center mb-3">Register</h2>
                <hr className="mt-0 ml-2 w-25 mx-auto" />
                <form className="d-flex flex-column justify-content-center align-items-center mt-2 px-2" method="POST" onSubmit={onSubmit}>
                    <Input name="name" placeholder="Name..." value={name} onChange={onChange} showLabel={true} type="name" />
                    <Input name="email" placeholder="Email..." value={email} onChange={onChange} showLabel={true} type="email" />
                    <Input name="password" placeholder="Password..." value={password} onChange={onChange} type="password" showLabel={true} />
                    <Input name="confirmPassword" placeholder="Confirm password..." value={confirmPassword} onChange={onChange} type="password" showLabel={true} />
                    <Button class="mt-2" value="Submit" />
                </form>
                <h6 className="alternate-action d-flex justify-content-center align-items-center mt-3">
                    Already have an account?
                    <Link to="/login" className="ml-1">Login now.</Link>
                </h6>
            </div>
        </div>
    )
}

export default Register