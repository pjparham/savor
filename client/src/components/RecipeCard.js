import React from 'react'
import { Link } from 'react-router-dom'
import RecipeFavorites from './RecipeFavorites'

export default function RecipeCard({recipe, user}) {

    const displayIngredients = recipe.ingredients.map((ingredient) => {
        return <li key={ingredient.id}>{ingredient.quantity} {ingredient.unit} {ingredient.name}</li>
    })

  return (
    <div>
        <Link to={`/~recipes/${recipe.id}`}>
          <h3>{recipe.name}</h3>
          <ul>{displayIngredients}</ul>
          <RecipeFavorites recipe={recipe} user={user} />
        </Link>
    </div>
  )
}
