import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { logout } from '../features/user/sessionsSlice'

export default function Profile({ user }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function handleLogout(){
        fetch('/logout', {
            method: "DELETE",
        }).then(() => dispatch(logout()))
        navigate('/')
    }

  return (
    <div>
        <h1>{user.first_name} {user.last_name}</h1>
        <div className='profile-my-recipes-container'>
          <div className='profile-my-recipes-title'/>
        </div>
        <div onClick={handleLogout} className='logout'>Logout</div>
    </div>
  )
}
