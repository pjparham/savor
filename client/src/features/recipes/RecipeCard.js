import React from 'react'

export default function RecipeCard({recipe}) {
    const displayIngredients = recipe.ingredients.map((ingredient) => {
        return <li key={ingredient.id}>{ingredient.value} {ingredient.measurement} {ingredient.name}</li>
    })
  return (
    <div>
        <h3>{recipe.name}</h3>
        <ul>{displayIngredients}</ul>
    </div>
  )
}
