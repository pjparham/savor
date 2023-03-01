import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { recipeUpdated } from '../features/recipes/recipesSlice'

export default function RecipeCard({recipe, user}) {
    const dispatch = useDispatch()
    const displayIngredients = recipe.ingredients.map((ingredient) => {
        return <li key={ingredient.id}>{ingredient.quantity} {ingredient.unit} {ingredient.name}</li>
    })

    let favorite = (recipe.favorites.filter((f) => f.user_id === user.id))
    let liked = favorite.length > 0

    if(liked){
      console.log(favorite[0].id)
    }


  function handleLike(e){
    e.preventDefault()
    if(liked){
      fetch(`/favorites/${favorite[0].id}`, {
        method: "DELETE",
      })
      .then((r) => r.json())
      .then((updatedRecipe) => dispatch(recipeUpdated(updatedRecipe)))
    } 
    else {
      fetch('/favorites', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({"recipe_id": recipe.id})
      })
      .then((r) => r.json())
      .then((updatedRecipe) => dispatch(recipeUpdated(updatedRecipe)))
    }
  }



  return (
    <div>
        {/* <Link to={`/~recipes/${recipe.id}`}> */}
          <h3>{recipe.name}</h3>
          <ul>{displayIngredients}</ul>
          <div onClick={handleLike} className='card-favorite'>
              {liked ? <i className="fa-solid fa-heart"></i> :  <i className="fa-regular fa-heart"></i>} 
              {" "}{recipe.favorites.length === 1 ? (recipe.favorites.length) + " Favorite" : (recipe.favorites.length) + " Favorites"}
          </div>
        {/* </Link> */}
    </div>
  )
}
