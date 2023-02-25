import { configureStore } from "@reduxjs/toolkit"
import recipeReducer from "./features/recipes/recipesSlice"

const store = configureStore({
  reducer: {
    recipes: recipeReducer,
  }
})

export default store