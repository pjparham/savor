import React from 'react'
import RecipeCard from './RecipeCard'

export default function RecipesContainer({recipes}) {
    const displayRecipes = recipes.map((recipe) => {
        return <RecipeCard recipe={recipe} key={recipe.id}/>
    })
  return (
    <div>{displayRecipes}</div>
  )
}
