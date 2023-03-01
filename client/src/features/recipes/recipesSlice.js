import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchRecipes = createAsyncThunk("recipes/fetchRecipes", () => {
  return fetch("/recipes")
  .then(response => response.json())
  .then(recipesArray => recipesArray)
})


const recipesSlice = createSlice({
  name: "recipes",
  initialState: {
    recipes: [],
    isLoading: false
  },
  reducers: {
    // create reducer methods
    recipeAdded(state, action) {
      state.entities.push(action.payload);
    },
    recipeUpdated(state, action) {
        const index = state.recipes.findIndex(recipe => recipe.id === action.payload.id)
        state.recipes[index] = action.payload
    },
    recipeRemoved(state, action){
      const index = state.entities.findIndex((recipe) => recipe.id === action.payload);
      state.entities.splice(index, 1)
    }
  },

  extraReducers: builder => {
    builder.addCase(fetchRecipes.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchRecipes.fulfilled, (state, action) => {
      state.isLoading = false
      state.recipes = action.payload
    })
  }
});

// export the action creators
export const { recipeAdded, recipeRemoved, recipeUpdated } = recipesSlice.actions;

export default recipesSlice.reducer;
