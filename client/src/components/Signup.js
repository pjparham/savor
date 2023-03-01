import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
    const [newUser, setNewUser] = useState({
        "username": "",
        "password": "",
        "first_name": "",
        "last_name": "",
        "email": ""
    })
    const [errors, setErrors] = useState([])

    function handleChange(e){
        setNewUser({
            ...newUser,
            [e.target.name]: e.target.value,
        })
    }

    const navigate = useNavigate()

    function handleSubmit(e){
        e.preventDefault()
        fetch('/users', {
            method: "POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(newUser)            
        })
        .then(r => {
            if(r.ok){
                navigate('/')
                alert("Sign-up successful! Please login now.")
            }
            else {r.json().then(e => setErrors(e.errors))}
        })
    }


  return (
    <div className='login-container'>
        <h1>Signup</h1>
        <form>
            <label>
                <input className="login-input" placeholder="Username" type="text" id="username" name="username" value={newUser.username} onChange={handleChange}/>
            </label><br/>
            <label>
                <input className="login-input" placeholder="Password" type="password" id="password" name="password" value={newUser.password} onChange={handleChange}/>
            </label> <br/>
            <label>
                <input className="login-input" placeholder="First Name" type="text" id="first_name" name="first_name" value={newUser.first_name} onChange={handleChange}/>
            </label> <br/>
            <label>
                <input className="login-input" placeholder="Last Name" type="text" id="last_name" name="last_name" value={newUser.last_name} onChange={handleChange}/>
            </label> <br/>
            <label>
                <input className="login-input" placeholder="E-mail" type="text" id="email" name="email" value={newUser.email} onChange={handleChange}/>
            </label> <br/>
            <div className='signup-buton-container'>
                <div onClick={handleSubmit} className='login-signup-button signup-button'>Sign-Up</div>
            </div>
            <input type="submit" style={{display: "none"}}/>
        </form>
        <div className='error-container'>
        {errors.map((error) => {
            return <li className='error' key={error}>{error}</li>
        })}
        </div>
    </div>
  )
}
