import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import './App.css';
import { fetchRecipes } from './features/recipes/recipesSlice';
import { Routes, Route } from 'react-router-dom';
import Test from './Test';
import RecipesContainer from './features/recipes/RecipesContainer';
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

  console.log(recipes)
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
        <Route exact path='/' element={<RecipesContainer user={user} recipes={recipes}/>}/>
        <Route exact path='/test' element={<Test/>}/>
        <Route exact path='/profile' element={<Profile user={user}/>}/>
        <Route exact path='/~recipes/new' element={<RecipeForm/>}/>
        <Route path='/~recipes/:id' element={<RecipePage user={user} recipes={recipes}/>}/>
      </Routes>
    </div>
  );
}

export default App;
