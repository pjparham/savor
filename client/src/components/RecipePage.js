import React from 'react'
import { useParams } from 'react-router-dom'
import RecipeFavorites from './RecipeFavorites'
import Comments from './Comments'

export default function RecipePage({ recipes, user, handleDelete }) {
    const params = useParams()

    let recipe = recipes.find(recipe => recipe.id === parseInt(params.id))
    const isCurrentUser = recipe.user.id === user.id


    const displayIngredients = recipe && recipe.ingredients.map((i) => {
      let unit = i.unit
      if (eval(i.quantity) > 1 && unit.length > 0 && unit.at(-1) !== 's'){
        unit += 's'
      }
      return <p key={i.id}><i className="fa-regular fa-square"></i> {i.quantity} {unit} {i.name}</p>
    })

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
    const displaySteps = recipe && recipe.recipe_steps.map((s) => {
      return <li key={s.id}>{capitalizeFirstLetter(s.instruction)}</li>
    })

    function handleDeleteClick(){
      handleDelete(recipe)
    }

    if (!recipe){
      return (
        <div>
          Loading...
        </div>
      )
    }
  return (
    <div className='recipe-page'>
      <div className='recipe-page-top'>
        <div className='recipe-page-top-left'>
          <div className='recipe-page-title'>{recipe.name}  </div>
          <div className='recipe-page-author'>By: {recipe.user.username}{isCurrentUser ? <span  className='recipe-page-delete' onClick={handleDeleteClick}> || <u>Delete Recipe</u></span> : null}</div>
          {recipe.image ? <img src={recipe?.image} alt='recipe'/> : null}
        </div>
        <div className='recipe-page-top-right'>
        <div className='recipe-ingredients-container'>
              <h3 className='recipe-ingredients-title'>Ingredients</h3>
              <div>
                {displayIngredients}
              </div>
            </div>
        </div>
      </div>
      <div className='recipe-page-middle'>
        <div className='recipe-steps-container'>
          <h3>Preperation</h3>
          <ol>
            {displaySteps}
          </ol>
        </div>
      </div>
    <RecipeFavorites isPage={true} user={user} recipe={recipe}/>
    <Comments user={user} recipe={recipe}/>
    </div>
  )
}
