import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { recipeAdded, recipeUpdated } from '../features/recipes/recipesSlice';
import { useDispatch } from "react-redux"

function RecipeForm({ editRecipe, setEdit }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [ingredients, setIngredients] = useState([{ quantity: '', unit: '', name: '' }]);
  const [steps, setSteps] = useState(['']);
  const [errors, setErrors] = useState([])
  const [image, setImage] = useState([])
  useEffect(() => {
    if (editRecipe) {
      setName(editRecipe.name);
      setCategory(editRecipe.category);
      setIngredients(editRecipe.ingredients);
      setSteps(editRecipe.recipe_steps.map(step => step.instruction));
    }
  }, [editRecipe]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0])
  }

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { quantity: '', unit: '', name: '' }]);
  };

  const handleRemoveIngredient = (index) => {
    const newIngredients = ingredients.filter((ingredient, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleStepChange = (index, value) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const handleAddStep = () => {
    setSteps([...steps, '']);
  };

  const handleRemoveStep = (index) => {
    const newSteps = steps.filter((step, i) => i !== index);
    setSteps(newSteps);
  };

  const formatSteps = steps.map((step, index) => {
    return {value: index + 1, instruction: step}
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    const recipe = {
      name,
      category,
      ingredients_attributes: ingredients,
      recipe_steps_attributes: formatSteps,
      image
    };
    const formData = new FormData()
    if(image.length === undefined){
      formData.append("image", image)
    }
    formData.append("name", name);
    formData.append("category", category) 
    recipe.ingredients_attributes.forEach((ingredient, index) => {
      formData.append(`ingredients_attributes[${index}][quantity]`, ingredient.quantity);
      formData.append(`ingredients_attributes[${index}][unit]`, ingredient.unit);
      formData.append(`ingredients_attributes[${index}][name]`, ingredient.name);
    })
    recipe.recipe_steps_attributes.forEach((step, index) => {
      formData.append(`recipe_steps_attributes[${index}][value]`, step.value);
      formData.append(`recipe_steps_attributes[${index}][instruction]`, step.instruction);
    })
    if(setEdit === null){
      fetch(`/recipes`, {
        method: "POST",
        body: formData
      })
      .then((r) => {
        if(r.ok){
          r.json()
          .then((newRecipe) => dispatch(recipeAdded(newRecipe)))
          setName('')
          setCategory('')
          setIngredients([{ quantity: '', unit: '', name: '' }])
          setSteps([''])
          navigate('/')
        } else{
          r.json().then(e => setErrors(e.errors))
        }
      });
    }
    else{
      fetch(`/recipes/${editRecipe.id}`, {
        method: "PATCH",
        body: formData
      })
      .then((r) =>{
        if(r.ok){
          r.json()
          .then((updatedRecipe) => dispatch(recipeUpdated(updatedRecipe)))
          setName('')
          setCategory('')
          setIngredients([{ quantity: '', unit: '', name: '' }])
          setSteps([''])
          setEdit(false)
        } else {
          r.json().then(e => setErrors(e.errors))
        }
      })
    }
     // or dispatch an action to send the recipe data to your server or store
  };

  return (
    <div className='form'>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
          {/* <span className='form-label'>Name: {"   "} </span> */}
            <input className='form-input name' placeholder='name'type="text" value={name} onChange={handleNameChange} />
          </label>
          {/* <br /> */}
          <label>
            {/* Category: */}
            <select className='form-input select' value={category} onChange={handleCategoryChange}>
              <option value="">Select a category</option>
              <option value="dessert">Dessert</option>
              <option value="appetizer">Appetizer</option>
              <option value="main course">Main Course</option>
              <option value="soup">Soup</option>
              <option value="salad">Salad</option>
              <option value="side">Side</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>
        <br />
     {editRecipe ? null :  <label>
          <h2>Add image</h2>
          <input className='form-image' type='file' onChange={handleImageChange}/>
        </label>}
        <label>
          <h2>Ingredients:</h2>
          <ul>
            {ingredients.map((ingredient, index) => (
              <li className='form-list' key={index}>
                  <label>
                      <input
                      className='form-input ingredient'
                      placeholder='quantity'
                      type="text"
                      value={ingredient.quantity}
                      onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                      />
                  </label>
                  <label>
                      <input
                      className='form-input ingredient'
                      placeholder='unit'
                      type="text"
                      value={ingredient.unit}
                      onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                      />
                  </label>
                  <label>
                      <input
                      className='form-input ingredient name'
                      placeholder='name'
                      type="text"
                      value={ingredient.name}
                      onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                      />
                  </label>
                  <button type="button" onClick={() => handleRemoveIngredient(index)}><i className="fa-solid fa-x"></i></button>
              </li>
            ))}
          </ul>
          <div className='form-button ingredient' type="button" onClick={handleAddIngredient}>
            New Ingredient
          </div>
        </label>
        <br />
       
              <br/>
        <label>
          <h2>Steps:</h2>
          <ol>
            {steps.map((step, index) => (
              <li key={index}>
                <textarea className='form-textarea' value={step} onChange={(e) => handleStepChange(index, e.target.value)} />
                <button type="button" onClick={() => handleRemoveStep(index)}><i className="fa-solid fa-x ingredient-remove"></i></button>
              </li>
            ))}
          </ol>
          <div className='form-button' type="button" onClick={handleAddStep}>
            Add Step
          </div>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default RecipeForm