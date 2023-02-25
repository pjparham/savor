import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"
import './App.css';
import { fetchRecipes } from './features/recipes/recipesSlice';


function App() {
  const dispatch = useDispatch()
  const recipes = useSelector((state) => state.recipes.recipes)

  const [currentUser, setCurrentUser] = useState()

    //auto login user if stored in session
    // useEffect(()=> {
    //   fetch('/auth')
    //   .then(res => {
    //     if(res.ok){
    //       res.json().then(user=> setCurrentUser(user))
    //     }
    //   })
    // }, [])

    //fetches activities and puts them in redux store
    useEffect(() => {
      dispatch(fetchRecipes())
    }, [dispatch])

    console.log(recipes)
    
  return (
    <div className="App">
      <h1>hello world</h1>
    </div>
  );
}

export default App;
