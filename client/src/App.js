import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import './App.css';
import { fetchRecipes } from './features/recipes/recipesSlice';
import { Routes, Route } from 'react-router-dom';
import Test from './Test';
import RecipesContainer from './features/recipes/RecipesContainer';
import { login } from './features/user/sessionsSlice';
import Login from './components/Login';

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

//fetch inside component
//dispatch login in component
    console.log(user)

    if (!user){
      return (
        <div className="App">
          <Routes>
            <Route exact path='/' element={<Login/>}/>
          </Routes>
        </div>
      )
    }
  return (
    <div className="App">
      <h1>hello world</h1>
      <Routes>
        <Route exact path='/test' element={<Test/>}/>
        <Route exact path='/recipes' element={<RecipesContainer recipes={recipes}/>}/>
      </Routes>
    </div>
  );
}

export default App;
