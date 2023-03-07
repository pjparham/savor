import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { logout } from '../features/user/sessionsSlice'
import RecipesContainer from './RecipesContainer'

export default function Profile({ user, recipes }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function handleLogout(){
        fetch('/logout', {
            method: "DELETE",
        }).then(() => dispatch(logout()))
        navigate('/')
    }

    const userRecipes = recipes.filter((recipe) => recipe.user.id === user.id)

    const savedRecipes = recipes.filter(recipe => {
      return recipe.favorited_users.some(favoriteUser => favoriteUser.id === user.id);
    });



  return (
    <div>
        <h1>{user.first_name} {user.last_name}</h1>
        <div className='profile-my-recipes-container'>
          <div className='profile-my-recipes-title'>My Recipes</div>
          <RecipesContainer isHome={false} user={user} recipes={userRecipes}/>
        </div>
        <div className='profile-my-saves-container'>
          <div className='profile-my-saves-title'>Saved Recipes</div>
          <RecipesContainer isHome={false} user={user} recipes={savedRecipes}/>
        </div>
        <div onClick={handleLogout} className='logout'>Logout</div>
    </div>
  )
}
