import React from 'react'
import { useParams } from 'react-router-dom'
import RecipeFavorites from './RecipeFavorites'
import Comments from './Comments'

export default function RecipePage({ recipes, user }) {
    const params = useParams()

    let recipe = recipes.find(recipe => recipe.id === parseInt(params.id))

    const displayIngredients = recipe && recipe.ingredients.map((i) => {
      let unit = i.unit
      if (i.quantity > 1){
        unit += 's'
      }
      return <li>{i.quantity} {unit} {i.name}</li>
    })

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
    const displaySteps = recipe && recipe.recipe_steps.map((s) => {
      return <li>{capitalizeFirstLetter(s.instruction)}</li>
    })
console.log(recipe)

    if (!recipe){
      return (
        <div>
          Loading...
        </div>
      )
    }
  return (
    <div>
      <div>{recipe.image ? <img src={recipe?.image} alt='recipe'/> : null}</div>
        <h1>{recipe.name}</h1>
        <p>Posted by: {recipe.user.username}</p>
        <div className='recipe-content-container'>
          <div className='recipe-content-left'>
            <div className='recipe-ingredients-container'>
              <h3>Ingredients</h3>
              <ul>
                {displayIngredients}
              </ul>
            </div>
          </div>
          <div className='recipe-content-right'>
            <div className='recipe-steps-container'>
              <h3>Preperation</h3>
              <ol>
                {displaySteps}
              </ol>
            </div>
          </div>
        </div>
        <RecipeFavorites user={user} recipe={recipe}/>
        <Comments user={user} recipe={recipe}/>
    </div>
  )
}
