import React from 'react'
import { Link } from 'react-router-dom'
import RecipeFavorites from './RecipeFavorites'



export default function RecipeCard({recipe, user, handleDelete}) {

    function handleDeleteClick(){
      handleDelete(recipe)
    }

    let ingredientsPreview = recipe.ingredients.map((ingredient) => ingredient.name).join(", ")
    ingredientsPreview = ingredientsPreview.length > 80 ? ingredientsPreview = ingredientsPreview.substring(0, 80) + "..." : ingredientsPreview

  return (
    <div className="recipe-card">
      <div className='card-left'>
      <div>
        {recipe.image ? 
        <img className='card-image' src={recipe?.image} alt='recipe'/> : 
        <i className="fa-solid fa-bowl-food card-image-icon"></i>}
        </div>
      </div>
      <div className='card-right'>
      <div className='card-favorites'><RecipeFavorites recipe={recipe} user={user}/></div>
        <Link className='card-link' to={`/~recipes/${recipe.id}`}>
          <div>
            <span className='card-title'>{recipe.name} </span><br/>
            <span className='card-author'>By {recipe.user.username}</span>
          </div>
          <p>Ingredients: {ingredientsPreview}</p>
          <p>Total Steps: {recipe.recipe_steps.length}</p>
        </Link>
      </div>
  
    </div>
  )
}
