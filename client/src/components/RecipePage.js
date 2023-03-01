import React from 'react'
import { useParams } from 'react-router-dom'
import RecipeFavorites from './RecipeFavorites'

export default function RecipePage({ recipes, user }) {
    const params = useParams()

    let recipe = recipes.find(recipe => recipe.id === parseInt(params.id))

  return (
    <div>
        <h1>{recipe.name}</h1>
        <RecipeFavorites user={user} recipe={recipe}/>
    </div>
  )
}
