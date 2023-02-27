import { configureStore } from "@reduxjs/toolkit"
import recipeReducer from "./features/recipes/recipesSlice"
import sessionReducer from "./features/user/sessionsSlice"

const store = configureStore({
  reducer: {
    recipes: recipeReducer,
    sessions: sessionReducer,
  }
})

export default store