import React from 'react'
import { useParams } from 'react-router-dom'

export default function RecipePage({ recipes }) {
    const params = useParams()

    let recipe = recipes.find(recipe => recipe.id === parseInt(params.id))

    console.log(recipe)
  return (
    <div>RecipePage</div>
  )
}
