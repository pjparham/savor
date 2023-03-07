import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { recipeAdded } from '../features/recipes/recipesSlice';
import { useDispatch } from "react-redux"

function RecipeForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [ingredients, setIngredients] = useState([{ quantity: '', unit: '', name: '' }]);
  const [steps, setSteps] = useState(['']);
  const [errors, setErrors] = useState([])
  const [image, setImage] = useState([])

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
    }); // or dispatch an action to send the recipe data to your server or store
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <br />
      <label>
        Category:
        <select value={category} onChange={handleCategoryChange}>
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
      <br />
      <label>
        Ingredients:
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>
                <label>
                    Quantity
                    <input
                    type="text"
                    value={ingredient.quantity}
                    onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                    />
                </label>
                <label>
                    Unit
                    <input
                    type="text"
                    value={ingredient.unit}
                    onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                    />
                </label>
                <label>
                    Name
                    <input
                    type="text"
                    value={ingredient.name}
                    onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                    />
                </label>
                <button type="button" onClick={() => handleRemoveIngredient(index)}>Remove Ingredient</button>
            </li>
          ))}
        </ul>
        <button type="button" onClick={handleAddIngredient}>
          Add Ingredient
        </button>
      </label>
      <br />
      <label>
        Add image
        <input type='file' onChange={handleImageChange}/>
      </label>

      <label>
        Steps:
        <ol>
          {steps.map((step, index) => (
            <li key={index}>
              <textarea value={step} onChange={(e) => handleStepChange(index, e.target.value)} />
              <button type="button" onClick={() => handleRemoveStep(index)}>Remove Step</button>
            </li>
          ))}
        </ol>
        <button type="button" onClick={handleAddStep}>
          Add Step
        </button>
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}

export default RecipeForm