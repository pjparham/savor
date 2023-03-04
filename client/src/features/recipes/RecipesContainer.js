import React from 'react'
import RecipeCard from '../../components/RecipeCard'
import { useDispatch } from "react-redux"
import { recipeRemoved } from './recipesSlice'

export default function RecipesContainer({recipes, user}) {
  const dispatch = useDispatch()
  

    function handleDelete(recipe){
      fetch(`/recipes/${recipe.id}`, {
        method: "DELETE",
      })
      .then((r) => {
        if(r.ok){
          dispatch(recipeRemoved(recipe.id))
        }
      })
    }

    let displayRecipes = recipes && recipes.map((recipe) => {
      return <RecipeCard handleDelete={handleDelete} user={user} recipe={recipe} key={recipe.id}/>
  })


    
  return (
    <div>{displayRecipes}</div>
  )
}
