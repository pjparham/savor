import React from 'react'
import RecipeCard from '../../components/RecipeCard'

export default function RecipesContainer({recipes, user}) {
    const displayRecipes = recipes.map((recipe) => {
        return <RecipeCard user={user} recipe={recipe} key={recipe.id}/>
    })
  return (
    <div>{displayRecipes}</div>
  )
}
