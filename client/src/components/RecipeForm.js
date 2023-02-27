import React, { useState } from 'react';

function RecipeForm() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [ingredients, setIngredients] = useState([{ quantity: '', unit: '', name: '' }]);
  const [steps, setSteps] = useState(['']);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

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

  const handleStepChange = (index, value) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const handleAddStep = () => {
    setSteps([...steps, '']);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const recipe = {
      name,
      category,
      ingredients,
      steps,
    };
    console.log(recipe); // or dispatch an action to send the recipe data to your server or store
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
        </select>
      </label>
      <br />
      <label>
        Ingredients:
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>
              <input
                type="number"
                value={ingredient.quantity}
                onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
              />
              <input
                type="text"
                value={ingredient.unit}
                onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
              />
              <input
                type="text"
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
              />
            </li>
          ))}
        </ul>
        <button type="button" onClick={handleAddIngredient}>
          Add Ingredient
        </button>
      </label>
      <br />
      <label>
        Steps:
        <ol>
          {steps.map((step, index) => (
            <li key={index}>
              <textarea value={step} onChange={(e) => handleStepChange(index, e.target.value)} />
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