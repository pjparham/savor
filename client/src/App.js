import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import './App.css';
import { fetchRecipes, recipeRemoved } from './features/recipes/recipesSlice';
import { Routes, Route } from 'react-router-dom';
import RecipesContainer from './components/RecipesContainer';
import { login } from './features/user/sessionsSlice';
import Login from './components/Login';
import RecipeForm from './components/RecipeForm'
import Navbar from './components/Navbar';
import Profile from './components/Profile'
import Signup from './components/Signup';
import RecipePage from './components/RecipePage';


function App() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.sessions.user)
  const recipes = useSelector((state) => state.recipes.recipes)


    //fetches activities and puts them in redux store
    useEffect(() => {
      fetch('/auth')
      .then(res => {
        if(res.ok){
          res.json().then(user => dispatch(login(user)))
        }
      })
      dispatch(fetchRecipes())
    }, [dispatch])

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

    if (!user){
      return (
        <div className="App">
          <Navbar user={user}/>
          <Routes>
            <Route exact path='/' element={<Login/>}/>
            <Route exact path='/signup' element={<Signup/>}/>
          </Routes>
        </div>
      )
    }
  return (
    <div className="App">
      <Navbar user={user}/>
      <Routes>
        <Route exact path='/' element={<RecipesContainer isHome={true} user={user} recipes={recipes}/>}/>
        <Route exact path='/profile' element={<Profile recipes={recipes} user={user}/>}/>
        <Route exact path='/~recipes/new' element={<RecipeForm setEdit={null} editRecipe={null}/>}/>
        <Route path='/~recipes/:id' element={<RecipePage handleDelete={handleDelete} user={user} recipes={recipes}/>}/>
      </Routes>
    </div>
  );
}

export default App;
