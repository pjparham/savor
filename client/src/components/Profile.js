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
       <div className='profile-user-container'><h1>{user.first_name} {user.last_name}</h1><div onClick={handleLogout} className='logout'>Logout</div></div> 
 
        <div className='profile-my-recipes-container'>
          <h1 className='profile-my-recipes-title'>My Recipes</h1>
          <RecipesContainer isHome={false} user={user} recipes={userRecipes}/>
        </div>
        <div className='profile-my-saves-container'>
          <h1 className='profile-my-saves-title'>Saved Recipes</h1>
          <RecipesContainer isHome={false} user={user} recipes={savedRecipes}/>
        </div>
      
    </div>
  )
}
