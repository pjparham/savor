import React, { useState } from 'react'
import RecipeCard from './RecipeCard'
import { useDispatch } from "react-redux"
import { recipeRemoved } from '../features/recipes/recipesSlice'
import RecipeFilter from './RecipeFilter'

export default function RecipesContainer({recipes, user}) {
  const dispatch = useDispatch()
  const [category, setCategory] = useState('all')
  

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

    let sortedRecipes = recipes && [...recipes].filter((recipe) =>{
      switch(category){
        case 'all':
          return recipe;
        case 'dessert':
          return recipe.category === 'dessert';
        case 'appetizer':
          return recipe.category === 'appetizer';
        case 'main course':
          return recipe.category === 'main course';
        case 'soup':
          return recipe.category === 'soup';
        case 'salad':
          return recipe.category === 'salad';
        case 'side':
          return recipe.category === 'side';
        case 'other':
          return recipe.category === 'other';
        default:
          return recipe;
      }
    })

    let displayRecipes = recipes && sortedRecipes.map((recipe) => {
      return <RecipeCard handleDelete={handleDelete} user={user} recipe={recipe} key={recipe.id}/>
  })


  function handleFilter(e){
    setCategory(e.target.title)
  }

    
  return (
    <>
      <RecipeFilter handleFilter={handleFilter}/>
      <div className='recipes-container'>{displayRecipes}</div>
    </>
    
  )
}
