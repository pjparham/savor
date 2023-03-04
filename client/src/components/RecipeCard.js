import React from 'react'
import { Link } from 'react-router-dom'
import RecipeFavorites from './RecipeFavorites'
import { useDispatch } from "react-redux"
import { recipeRemoved } from '../features/recipes/recipesSlice'

export default function RecipeCard({recipe, user, handleDelete}) {
    const dispatch = useDispatch()

    const displayIngredients = recipe.ingredients.map((ingredient) => {
        return <li key={ingredient.id}>{ingredient.quantity} {ingredient.unit} {ingredient.name}</li>
    })

    function handleDeleteClick(){
      handleDelete(recipe)
    }



  return (
    <div>
        <Link to={`/~recipes/${recipe.id}`}>
          <h3>{recipe.name}</h3>
        </Link>
          <ul>{displayIngredients}</ul>
          <h6 onClick={handleDeleteClick}>DELETE</h6>
          <RecipeFavorites recipe={recipe} user={user} />
    </div>
  )
}
